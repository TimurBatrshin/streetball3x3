import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const SponsorSectionScreen = () => {
  const [banner, setBanner] = useState('');
  const [adPackages, setAdPackages] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchAdPackages = async () => {
      const querySnapshot = await getDocs(collection(db, 'adPackages'));
      const packagesList = querySnapshot.docs.map(doc => doc.data());
      setAdPackages(packagesList);
    };
    fetchAdPackages();
  }, []);

  const handlePlaceBanner = async () => {
    await addDoc(collection(db, 'banners'), { banner });
  };

  return (
    <View>
      <Text>Place Banner</Text>
      <TextInput placeholder="Banner URL" value={banner} onChangeText={setBanner} />
      <Button title="Place" onPress={handlePlaceBanner} />
      <Text>Advertising Packages</Text>
      <FlatList
        data={adPackages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SponsorSectionScreen;