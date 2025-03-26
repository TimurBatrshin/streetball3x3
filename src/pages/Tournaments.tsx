import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const TournamentsScreen = () => {
  const [tournaments, setTournaments] = useState([]);
  const [filter, setFilter] = useState('');
  const db = getFirestore();

  useEffect(() => {
    const fetchTournaments = async () => {
      let q = query(collection(db, 'tournaments'));
      if (filter) {
        q = query(q, where('level', '==', filter));
      }
      const querySnapshot = await getDocs(q);
      const tournamentsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTournaments(tournamentsList);
    };
    fetchTournaments();
  }, [filter]);

  return (
    <View>
      <TextInput placeholder="Фильтр по уровню" value={filter} onChangeText={setFilter} />
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.date}</Text>
            <Text>{item.location}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TournamentsScreen;