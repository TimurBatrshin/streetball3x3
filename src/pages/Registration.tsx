import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const RegistrationScreen = () => {
  console.log(`RegistrationScreen.tsx`);
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState([{ name: '', substitute: false }]);
  const db = getFirestore();

  const handleAddPlayer = () => {
    if (players.length < 4) {
      setPlayers([...players, { name: '', substitute: false }]);
    } else {
      Alert.alert('Максимум 4 игрока (3 основных и 1 запасной)');
    }
  };

  const handleRegister = async () => {
    if (teamName.trim() === '') {
      Alert.alert('Пожалуйста, введите название команды');
      return;
    }
    for (const player of players) {
      if (player.name.trim() === '') {
        Alert.alert('Пожалуйста, введите имена всех игроков');
        return;
      }
    }
    await addDoc(collection(db, 'registrations'), { teamName, players });
    Alert.alert('Регистрация успешно завершена');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Название команды:</Text>
      <TextInput style={styles.input} value={teamName} onChangeText={setTeamName} />
      {players.map((player, index) => (
        <View key={index}>
          <Text style={styles.label}>Игрок {index + 1}:</Text>
          <TextInput
            style={styles.input}
            value={player.name}
            onChangeText={(name) => {
              const newPlayers = [...players];
              newPlayers[index].name = name;
              setPlayers(newPlayers);
            }}
          />
          <Text style={styles.label}>Запасной:</Text>
          <TextInput
            style={styles.input}
            value={player.substitute ? 'Да' : 'Нет'}
            onChangeText={(substitute) => {
              const newPlayers = [...players];
              newPlayers[index].substitute = substitute.toLowerCase() === 'да';
              setPlayers(newPlayers);
            }}
          />
        </View>
      ))}
      <Button title="Добавить игрока" onPress={handleAddPlayer} />
      <Button title="Зарегистрироваться" onPress={handleRegister} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default RegistrationScreen;