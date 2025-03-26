import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const ManageParticipantsScreen = () => {
  const route = useRoute();
  const [participants, setParticipants] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchParticipants = async () => {
      const q = query(collection(db, 'participants'), where('tournamentId', '==', route.params.id));
      const querySnapshot = await getDocs(q);
      const participantsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setParticipants(participantsList);
    };
    fetchParticipants();
  }, [route.params.id]);

  const handleApprove = async (participantId) => {
    const docRef = doc(db, 'participants', participantId);
    await updateDoc(docRef, { status: 'approved' });
  };

  const handleReject = async (participantId) => {
    const docRef = doc(db, 'participants', participantId);
    await updateDoc(docRef, { status: 'rejected' });
  };

  return (
    <View>
      <Text>Manage Participants</Text>
      <FlatList
        data={participants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.status}</Text>
            <Button title="Approve" onPress={() => handleApprove(item.id)} />
            <Button title="Reject" onPress={() => handleReject(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ManageParticipantsScreen;