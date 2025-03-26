import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const OrganizerDashboardScreen = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [rules, setRules] = useState('');
  const [prizeFund, setPrizeFund] = useState('');
  const db = getFirestore();

  const handleCreateTournament = async () => {
    await addDoc(collection(db, 'tournaments'), {
      name,
      date,
      location,
      rules,
      prizeFund,
      status: 'registration'
    });
  };

  return (
    <View>
      <Text>Create Tournament</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Date" value={date} onChangeText={setDate} />
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} />
      <TextInput placeholder="Rules" value={rules} onChangeText={setRules} />
      <TextInput placeholder="Prize Fund" value={prizeFund} onChangeText={setPrizeFund} />
      <Button title="Create" onPress={handleCreateTournament} />
      <Text>Your Tournaments</Text>
      <FlatList
        data={[]}  // Fetch and display the organizer's tournaments
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.date}</Text>
            <Text>{item.location}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default OrganizerDashboardScreen;