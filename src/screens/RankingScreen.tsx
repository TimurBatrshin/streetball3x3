import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const RankingScreen = () => {
  const [players, setPlayers] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchPlayers = async () => {
      const querySnapshot = await getDocs(collection(db, 'players'));
      const playersList = querySnapshot.docs.map(doc => doc.data());
      setPlayers(playersList);
    };
    fetchPlayers();
  }, []);

  return (
    <View>
      <Text>Global Ranking</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.points}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default RankingScreen;