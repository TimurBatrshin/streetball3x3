import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

interface AdPackage {
  id: string;
  name: string;
  description: string;
  price: string;
}

const SponsorSectionScreen: React.FC = () => {
  const [banner, setBanner] = useState('');
  const [adPackages, setAdPackages] = useState<AdPackage[]>([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchAdPackages = async () => {
      const querySnapshot = await getDocs(collection(db, 'adPackages'));
      const packagesList: AdPackage[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data() as Omit<AdPackage, 'id'>
      }));
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
          <View style={styles.package}>
            <Text>{item.name}</Text>
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
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  package: {
    marginBottom: 10,
  },
});

export default SponsorSectionScreen;