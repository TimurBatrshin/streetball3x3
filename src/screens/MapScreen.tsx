import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

interface Tournament {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  name: string;
  date: string;
}

const MapScreen: React.FC = () => {
  const [tournaments, setTournaments] = React.useState<Tournament[]>([]);
  const db = getFirestore();

  React.useEffect(() => {
    const fetchTournaments = async () => {
      const querySnapshot = await getDocs(collection(db, 'tournaments'));
      const tournamentsList = querySnapshot.docs.map(doc => doc.data() as Tournament);
      setTournaments(tournamentsList);
    };
    fetchTournaments();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {tournaments.map((tournament) => (
          <Marker
            key={tournament.id}
            coordinate={{ latitude: tournament.location.lat, longitude: tournament.location.lng }}
            title={tournament.name}
            description={tournament.date}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;