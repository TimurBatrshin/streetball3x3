import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../authentication/AuthProvider';
import { db, storage } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileScreen = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [statistics, setStatistics] = useState('');
  const [gameHistory, setGameHistory] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
          setPhoto(data.photo);
          setStatistics(data.statistics);
          setGameHistory(data.gameHistory);
        }
      } catch (error) {
        Alert.alert('Error fetching profile:', error.message);
      }
    };
    fetchProfile();
  }, [user.uid]);

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, { name, photo, statistics, gameHistory });
    } catch (error) {
      Alert.alert('Error saving profile:', error.message);
    }
  };

  const handleUploadPhoto = async (e) => {
    try {
      const file = e.target.files[0];
      const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      setPhoto(photoURL);
    } catch (error) {
      Alert.alert('Error uploading photo:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Имя:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Фото:</Text>
      <input type="file" onChange={handleUploadPhoto} />
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
      <Text style={styles.label}>Статистика:</Text>
      <TextInput style={styles.input} value={statistics} onChangeText={setStatistics} />
      <Text style={styles.label}>История игр:</Text>
      <TextInput style={styles.input} value={gameHistory} onChangeText={setGameHistory} />
      <Button title="Сохранить" onPress={handleSave} />
    </View>
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
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default ProfileScreen;