import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const TournamentListScreen = () => {
  const [tournaments, setTournaments] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const db = getFirestore();

  useEffect(() => {
    const fetchTournaments = async () => {
      let q = collection(db, 'tournaments');
      if (filterDate) {
        q = query(q, where('date', '==', filterDate));
      }
      if (filterLocation) {
        q = query(q, where('location', '==', filterLocation));
      }
      if (filterLevel) {
        q = query(q, where('level', '==', filterLevel));
      }
      const querySnapshot = await getDocs(q);
      const tournamentsList = querySnapshot.docs.map(doc => doc.data());
      setTournaments(tournamentsList);
    };
    fetchTournaments();
  }, [filterDate, filterLocation, filterLevel]);

  return (
    <View>
      <Text>Filter by Date:</Text>
      <TextInput value={filterDate} onChangeText={setFilterDate} />
      <Text>Filter by Location:</Text>
      <TextInput value={filterLocation} onChangeText={setFilterLocation} />
      <Text>Filter by Level:</Text>
      <TextInput value={filterLevel} onChangeText={setFilterLevel} />
      <Button title="Apply Filters" onPress={() => {}} />
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
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

export default TournamentListScreen;