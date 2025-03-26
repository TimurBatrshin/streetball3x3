import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const TournamentDetailScreen = () => {
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

  return (
    <View>
      {tournament && (
        <>
          <Text>{tournament.name}</Text>
          <Text>{tournament.date}</Text>
          <Text>{tournament.time}</Text>
          <Text>{tournament.location}</Text>
          <Text>{tournament.rules}</Text>
          <Text>{tournament.participants.join(', ')}</Text>
          <Text>{tournament.prizeFund}</Text>
          <Text>{tournament.status}</Text>
        </>
      )}
    </View>
  );
};

export default TournamentDetailScreen;