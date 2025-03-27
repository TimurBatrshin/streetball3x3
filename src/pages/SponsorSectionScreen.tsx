import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const SponsorSectionScreen = () => {
  const [banner, setBanner] = useState('');
  const [adPackages, setAdPackages] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchAdPackages = async () => {
      const querySnapshot = await getDocs(collection(db, 'adPackages'));
      const packagesList = querySnapshot.docs.map((doc) => doc.data());
      setAdPackages(packagesList);
    };
    fetchAdPackages();
  }, []);

  const handlePlaceBanner = async () => {
    await addDoc(collection(db, 'banners'), { banner });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Разместить баннер</Text>
      <TextInput
        style={styles.input}
        placeholder="URL баннера"
        value={banner}
        onChangeText={setBanner}
      />
      <Button title="Разместить" onPress={handlePlaceBanner} />
      <Text style={styles.title}>Рекламные пакеты</Text>
      <FlatList
        data={adPackages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price}</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
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

export default SponsorSectionScreen;