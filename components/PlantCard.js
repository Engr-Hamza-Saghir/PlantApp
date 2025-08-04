import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function PlantCard({ name, type, image, sunlight, water, humidity, ph }) {
  const calculateHealthScore = () => {
    const sunlightScore = Math.min(sunlight, 100);
    const waterScore = Math.min(water, 100);
    const humidityScore = Math.min(humidity, 100);
    let phScore = 100 - Math.abs(ph - 6.5) * 20;
    phScore = Math.max(0, Math.min(phScore, 100));    const average = (sunlightScore + waterScore + humidityScore + phScore) / 4;
    return Math.round(average);
  };

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.type}>{type}</Text>

        <View style={styles.vitalsRow}>
          <Vital icon="sunny" label="Sunlight" value={`${sunlight}%`} color="#f1c40f" />
          <Vital icon="water" label="Water" value={`${water}%`} color="#3498db" />
        </View>
        <View style={styles.vitalsRow}>
          <Vital icon="cloud" label="Humidity" value={`${humidity}%`} color="#2ecc71" />
          <Vital icon="flask" label="pH" value={ph} color="#9b59b6" />
        </View>
      </View>

      <View style={styles.chart}>
        <AnimatedCircularProgress
          size={70}
          width={6}
          fill={calculateHealthScore()}
          tintColor="#00e0ff"
          backgroundColor="#2c3e50">
          {(fill) => (
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              {Math.round(fill)}%
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
}

const Vital = ({ icon, label, value, color }) => (
  <View style={styles.vital}>
    <Ionicons name={icon} size={16} color={color} style={{ marginBottom: 2 }} />
    <Text style={styles.vitalLabel}>{label}</Text>
    <Text style={styles.vitalValue}>{value}</Text>
  </View>
);

// General Info: shadoweffect and shadowOpacity are not working in android without elevation, only working in IOS

const styles = StyleSheet.create({
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
  image: {
    width: 80,
    height: 150,
    borderRadius: 10,
    marginRight: 16,
    borderWidth: 0,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  type: {
    fontSize: 13,
    color: '#ccc',
    marginBottom: 6,
  },
  vitalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  vital: {
    alignItems: 'flex-start',
    width: '45%',
  },
  vitalLabel: {
    fontSize: 11,
    color: '#bbb',
  },
  vitalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  chart: {
    marginLeft: 10,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
