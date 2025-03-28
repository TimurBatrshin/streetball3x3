import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
}

const TournamentsScreen: React.FC = () => {
  console.log(`Tournaments.tsx`);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filter, setFilter] = useState('');
  const db = getFirestore();
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    const fetchTournaments = async () => {
      let q = query(collection(db, 'tournaments'));
      if (filter) {
        q = query(q, where('level', '==', filter));
      }
      const querySnapshot = await getDocs(q);
      const tournamentsList: Tournament[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Tournament));
      setTournaments(tournamentsList);
    };
    fetchTournaments();
  }, [filter]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Фильтр по уровню"
        value={filter}
        onChangeText={setFilter}
      />
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('TournamentDetails', { id: item.id })}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
              <Text>{item.date}</Text>
              <Text>{item.location}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TournamentsScreen;