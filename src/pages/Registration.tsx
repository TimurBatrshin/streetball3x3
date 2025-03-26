import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const RegistrationScreen = () => {
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState([{ name: '', substitute: false }]);
  const db = getFirestore();

  const handleAddPlayer = () => {
    setPlayers([...players, { name: '', substitute: false }]);
  };

  const handleRegister = async () => {
    await addDoc(collection(db, 'registrations'), { teamName, players });
  };

  return (
    <View>
      <Text>Название команды:</Text>
      <TextInput value={teamName} onChangeText={setTeamName} />
      {players.map((player, index) => (
        <View key={index}>
          <Text>Игрок {index + 1}:</Text>
          <TextInput value={player.name} onChangeText={(name) => {
            const newPlayers = [...players];
            newPlayers[index].name = name;
            setPlayers(newPlayers);
          }} />
          <Text>Запасной:</Text>
          <TextInput value={player.substitute ? 'Да' : 'Нет'} onChangeText={(substitute) => {
            const newPlayers = [...players];
            newPlayers[index].substitute = substitute.toLowerCase() === 'да';
            setPlayers(newPlayers);
          }} />
        </View>
      ))}
      <Button title="Добавить игрока" onPress={handleAddPlayer} />
      <Button title="Зарегистрироваться" onPress={handleRegister} />
    </View>
  );
};

export default RegistrationScreen;