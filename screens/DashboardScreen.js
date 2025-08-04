import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PlantCard from '../components/PlantCard';

//for image
import monsteraImg from '../assets/plants/howea.png';

export default function DashboardScreen() {

  console.log(" DashboardScreen rendered");

  const [plants, setPlants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

 const loadPlants = async () => {
  try {
    const response = await fetch('https://688875bdadf0e59551ba0844.mockapi.io/mockapiio/plantapp/plants');
    const data = await response.json();

    const plantsWithImage = data.map(plant => ({
      ...plant,
      image: monsteraImg  // same image fpr every plant
    }));

    setPlants(plantsWithImage);
    console.log('Loaded plants with fixed image:', plantsWithImage);
  } catch (error) {
    console.error('Error fetching plants:', error);
  }
};


//when app is intialiazed, load plants bs phir ni call hoga
useEffect(() => {
  loadPlants();
}, []);

//for backl from AddPlantScreen to DashboardScreen to refresh the plant list
useFocusEffect(
  useCallback(() => {
    console.log('DashboardScreen focused, loading plants');
    loadPlants();
  }, [])
);

//for phone  jb my isko pull kr ky refresh krta as in facebook
const onRefresh = useCallback(() => { //callback is use to avaoid recreating function on every render
  setRefreshing(true);
  loadPlants();
  setTimeout(() => setRefreshing(false), 1000);
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Plants</Text>
      <FlatList //usin' FlatList(recyclerview in anndroid) for scrolling and performance (old schrollView was creating issue on long longer data also memory issues)
        data={plants}
        keyExtractor={(item, index) => item.name + index} //get the unique key for each item 
        renderItem={({ item }) => <PlantCard {...item} />} // wat to showin the flatlist 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      {/* Add Plant Floating Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add Plant')}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4fef7',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#34C759',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
});
