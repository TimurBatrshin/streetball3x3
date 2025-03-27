import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { collection, getDocs, DocumentData } from 'firebase/firestore';

interface Participant {
  id: string;
  name: string;
  status: string;
}

type RouteParams = {
  params: {
    id: string;
  };
};

const ManageParticipantsScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const [participants, setParticipants] = useState<Participant[]>([]);
  
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, `tournaments/${route.params.id}/participants`));
        const participantsList: Participant[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Participant;
          participantsList.push({ ...data, id: doc.id });
        });
        setParticipants(participantsList);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    if (route.params?.id) {
      fetchParticipants();
    }
  }, [route.params?.id]);

  return (
    <View>
      <Text>Participants</Text>
      <FlatList
        data={participants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ManageParticipantsScreen;