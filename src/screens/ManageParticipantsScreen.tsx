import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

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
        if (route.params?.id) {
          const querySnapshot = await getDocs(collection(db, `tournaments/${route.params.id}/participants`));
          const participantsList: Participant[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as Participant;
            participantsList.push({ ...data, id: doc.id });
          });
          setParticipants(participantsList);
        }
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchParticipants();
  }, [route.params?.id]);

  const handleRemoveParticipant = async (participantId: string) => {
    try {
      if (route.params?.id) {
        await deleteDoc(doc(db, `tournaments/${route.params.id}/participants`, participantId));
        setParticipants((prevParticipants) =>
          prevParticipants.filter((participant) => participant.id !== participantId)
        );
      }
    } catch (error) {
      console.error('Error removing participant:', error);
    }
  };

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
            <Button title="Remove" onPress={() => handleRemoveParticipant(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ManageParticipantsScreen;