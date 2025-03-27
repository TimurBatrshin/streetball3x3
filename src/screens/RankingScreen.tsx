import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

interface Player {
  id: string;
  name: string;
  points: number;
}

const RankingScreen: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchPlayers = async () => {
      const querySnapshot = await getDocs(collection(db, 'players'));
      const playersList: Player[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Omit<Player, 'id'> }));
      setPlayers(playersList);
    };
    fetchPlayers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Global Ranking</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.player}>
            <Text>{item.name}</Text>
            <Text>{item.points}</Text>
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
    marginBottom: 20,
  },
  player: {
    marginBottom: 10,
  },
});

export default RankingScreen;