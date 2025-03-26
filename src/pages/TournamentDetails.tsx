import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const TournamentDetailsScreen = () => {
  const route = useRoute();
  const [tournament, setTournament] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchTournament = async () => {
      const docRef = doc(db, 'tournaments', route.params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTournament(docSnap.data());
      }
    };
    fetchTournament();
  }, [route.params.id]);

  if (!tournament) {
    return <Text>Загрузка...</Text>;
  }

  return (
    <View>
      <Text>Название: {tournament.name}</Text>
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

export default TournamentDetailsScreen;