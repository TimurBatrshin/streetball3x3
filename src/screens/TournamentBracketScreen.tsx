import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

interface Match {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
}

type RouteParams = {
  params: {
    id: string;
  };
};

const TournamentBracketScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const [matches, setMatches] = useState<Match[]>([]);
  const db = getFirestore();

  useEffect(() => {
    if (!route.params?.id) return;

    const fetchMatches = async () => {
      const q = query(collection(db, 'matches'), where('tournamentId', '==', route.params.id));
      const querySnapshot = await getDocs(q);
      const matchesList: Match[] = querySnapshot.docs.map((doc) => doc.data() as Match);
      setMatches(matchesList);
    };
    fetchMatches();
  }, [route.params?.id]);

  return (
    <View style={styles.container}>
      {matches.map((match, index) => (
        <View style={styles.match} key={index}>
          <Text>{match.team1} vs {match.team2}</Text>
          <Text>{match.score1} - {match.score2}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  match: {
    marginBottom: 10,
  },
});

export default TournamentBracketScreen;