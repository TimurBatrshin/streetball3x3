import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { useAuth } from '../authentication/AuthProvider';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileScreen = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [statistics, setStatistics] = useState('');
  const [gameHistory, setGameHistory] = useState('');
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setPhoto(data.photo);
        setStatistics(data.statistics);
        setGameHistory(data.gameHistory);
      }
    };
    fetchProfile();
  }, [user.uid]);

  const handleSave = async () => {
    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, { name, photo, statistics, gameHistory });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);
    setPhoto(photoURL);
  };

  return (
    <View>
      <Text>Имя:</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Фото:</Text>
      <input type="file" onChange={handleUploadPhoto} />
      {photo && <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />}
      <Text>Статистика:</Text>
      <TextInput value={statistics} onChangeText={setStatistics} />
      <Text>История игр:</Text>
      <TextInput value={gameHistory} onChangeText={setGameHistory} />
      <Button title="Сохранить" onPress={handleSave} />
    </View>
  );
};

export default ProfileScreen;