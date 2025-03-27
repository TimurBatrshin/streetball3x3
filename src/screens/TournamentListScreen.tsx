import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, getDocs, CollectionReference } from 'firebase/firestore';

interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  level: string;
}

const TournamentListScreen: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const db = getFirestore();

  useEffect(() => {
    const fetchTournaments = async () => {
      let q: CollectionReference = collection(db, 'tournaments');
      if (filterDate) {
        q = query(q, where('date', '==', filterDate)) as CollectionReference;
      }
      if (filterLocation) {
        q = query(q, where('location', '==', filterLocation)) as CollectionReference;
      }
      if (filterLevel) {
        q = query(q, where('level', '==', filterLevel)) as CollectionReference;
      }
      const querySnapshot = await getDocs(q);
      const tournamentsList: Tournament[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tournament));
      setTournaments(tournamentsList);
    };
    fetchTournaments();
  }, [filterDate, filterLocation, filterLevel]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Date:</Text>
      <TextInput style={styles.input} value={filterDate} onChangeText={setFilterDate} />
      <Text style={styles.title}>Filter by Location:</Text>
      <TextInput style={styles.input} value={filterLocation} onChangeText={setFilterLocation} />
      <Text style={styles.title}>Filter by Level:</Text>
      <TextInput style={styles.input} value={filterLevel} onChangeText={setFilterLevel} />
      <Button title="Apply Filters" onPress={() => {}} />
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tournament}>
            <Text>{item.name}</Text>
            <Text>{item.date}</Text>
            <Text>{item.location}</Text>
            <Text>{item.level}</Text>
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
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  tournament: {
    marginBottom: 10,
  },
});

export default TournamentListScreen;