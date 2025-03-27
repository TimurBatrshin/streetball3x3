import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
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
      const participantsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
    <View style={styles.container}>
      <Text style={styles.title}>Управление участниками</Text>
      <FlatList
        data={participants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.status}</Text>
            <Button title="Одобрить" onPress={() => handleApprove(item.id)} />
            <Button title="Отклонить" onPress={() => handleReject(item.id)} />
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ManageParticipantsScreen;