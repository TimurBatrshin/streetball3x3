import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const TournamentBracketScreen = () => {
  const route = useRoute();
  const [matches, setMatches] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchMatches = async () => {
      const q = query(collection(db, 'matches'), where('tournamentId', '==', route.params.id));
      const querySnapshot = await getDocs(q);
      const matchesList = querySnapshot.docs.map(doc => doc.data());
      setMatches(matchesList);
    };
    fetchMatches();
  }, [route.params.id]);

  return (
    <View>
      {matches.map((match, index) => (
        <View key={index}>
          <Text>{match.team1} vs {match.team2}</Text>
          <Text>{match.score1} - {match.score2}</Text>
        </View>
      ))}
    </View>
  );
};

export default TournamentBracketScreen;