import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { generateRandomPlant } from '../utils/mockData';

export default function AddPlantScreen() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [savedPlants, setSavedPlants] = useState([]); //  Store generated plants
  
  const navigation = useNavigation(); 

const savebutton_onClick = async () => {
  if (!name || !type) {
    Alert.alert('Missing Info', 'Please enter both name and type.');
    return;
  }

  const newPlant = generateRandomPlant(name, type);

  try {
    const response = await fetch(
      'https://688875bdadf0e59551ba0844.mockapi.io/mockapiio/plantapp/plants',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlant),
      }
    );

    if (response.ok) {
      Alert.alert('Success', 'Your plant has been added.');
      setName('');
      setType('');
    } else {
      Alert.alert('Error', 'Failed to add plant.');
    }
  } catch (error) {
    console.error('POST failed:', error);
    Alert.alert('Error', 'May be Network issue ho.');
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/plants/howea.png')} style={styles.cardImage} />
        <View style={styles.cardInfo}>
          <TextInput
            style={styles.cardInput}
            placeholder="Plant Name"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.cardInput}
            placeholder="Type (Indoor / Outdoor)"
            placeholderTextColor="#ccc"
            value={type}
            onChangeText={setType}
          />
          <TouchableOpacity style={styles.cardButton} onPress={savebutton_onClick}>
            <Text style={styles.cardButtonText}>Save Plant</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eafaf1',
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1b4d3e',
    borderTopLeftRadius: 45,
    borderBottomLeftRadius: 45,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: 14,
    marginLeft: 29,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 16,
    resizeMode: 'contain',
  },
  cardInfo: {
    flex: 1,
  },
  cardInput: {
    backgroundColor: '#145c4a',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    marginBottom: 12,
  },
  cardButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
