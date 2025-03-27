import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, DocumentData } from 'firebase/firestore';

interface Sponsor {
  id: string;
  name: string;
  description: string;
  price: number;
}

const SponsorSectionScreen: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'sponsors'));
        const sponsorList: Sponsor[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Sponsor;
          sponsorList.push({ ...data, id: doc.id });
        });
        setSponsors(sponsorList);
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={sponsors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: 'grey',
  },
});

export default SponsorSectionScreen;