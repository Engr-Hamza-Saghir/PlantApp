import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPlantScreen from '../screens/AddPlantScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Add Plant" component={AddPlantScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
