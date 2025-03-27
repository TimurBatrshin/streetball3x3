import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc, getDocs, DocumentData } from 'firebase/firestore';

interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  rules: string;
  prizeFund: string;
  status: string;
}

const OrganizerDashboardScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [rules, setRules] = useState('');
  const [prizeFund, setPrizeFund] = useState('');
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const db = getFirestore();

  const handleCreateTournament = async () => {
    await addDoc(collection(db, 'tournaments'), {
      name,
      date,
      location,
      rules,
      prizeFund,
      status: 'registration'
    });
    fetchTournaments();
  };

  const fetchTournaments = async () => {
    const querySnapshot = await getDocs(collection(db, 'tournaments'));
    const tournamentsList: Tournament[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Tournament;
      tournamentsList.push({ ...data, id: doc.id });
    });
    setTournaments(tournamentsList);
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Tournament</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Date" value={date} onChangeText={setDate} />
      <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="Rules" value={rules} onChangeText={setRules} />
      <TextInput style={styles.input} placeholder="Prize Fund" value={prizeFund} onChangeText={setPrizeFund} />
      <Button title="Create" onPress={handleCreateTournament} />
      <Text style={styles.title}>Your Tournaments</Text>
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tournament}>
            <Text>{item.name}</Text>
            <Text>{item.date}</Text>
            <Text>{item.location}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  tournament: {
    marginBottom: 20,
  },
});

export default OrganizerDashboardScreen;