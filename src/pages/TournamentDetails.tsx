import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

interface Tournament {
  name: string;
  date: string;
  time: string;
  location: string;
  rules: string;
  participants: string[];
  prizeFund: string;
  status: string;
}

type RouteParams = {
  params: {
    id: string;
  };
};

const TournamentDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const db = getFirestore();

  useEffect(() => {
    if (!route.params?.id) return;

    const fetchTournament = async () => {
      const docRef = doc(db, 'tournaments', route.params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTournament(docSnap.data() as Tournament);
      }
    };
    fetchTournament();
  }, [route.params?.id]);

  if (!tournament) {
    return <Text>Загрузка...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Название: {tournament.name}</Text>
      <Text>Дата: {tournament.date}</Text>
      <Text>Время: {tournament.time}</Text>
      <Text>Место: {tournament.location}</Text>
      <Text>Правила: {tournament.rules}</Text>
      <Text>Участники: {tournament.participants.join(', ')}</Text>
      <Text>Призовой фонд: {tournament.prizeFund}</Text>
      <Text>Статус: {tournament.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TournamentDetailsScreen;