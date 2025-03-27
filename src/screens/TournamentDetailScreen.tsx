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

const TournamentDetailScreen: React.FC = () => {
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

  return (
    <View style={styles.container}>
      {tournament && (
        <>
          <Text style={styles.text}>{tournament.name}</Text>
          <Text style={styles.text}>{tournament.date}</Text>
          <Text style={styles.text}>{tournament.time}</Text>
          <Text style={styles.text}>{tournament.location}</Text>
          <Text style={styles.text}>{tournament.rules}</Text>
          <Text style={styles.text}>{tournament.participants.join(', ')}</Text>
          <Text style={styles.text}>{tournament.prizeFund}</Text>
          <Text style={styles.text}>{tournament.status}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TournamentDetailScreen;