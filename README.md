# Plant Monitoring App

This is a simple plant monitoring app built using React Native and Expo. It allows you to view a list of plants with details like sunlight, humidity, pH, and water levels. You can also add new plants to the list.

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/Engr-Hamza-Saghir/PlantApp.git
   cd plant-monitoring-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the Expo development server:
   ```
   npx expo start

   for mobile install (i ran it on Samsung S10 Android)
   =>install expo go from playstore
   =>Open nd Scan QR code from terminal shown in VS Code
   ```

## Project Structure

```
plant-monitoring-app/

=> components/
      => PlantCard.js
=> screens/
      => DashboardScreen.js
      => AddPlantScreen.js
=> navigation/
      => StackNavigator.js
=> utils/
      => mockData.js
=> assets/
      => plants/ (local images i used )
=> App.js
=> package.json
=> README.md
```

## Mock API

The app uses [mockapi.io](https://mockapi.io/projects/688875bdadf0e59551ba0845) for GET and POST operations.

## Component Structure

- **PlantCard**: Reusable component to display each plant.
- **DashboardScreen**: Main screen to view plant cards.
- **AddPlantScreen**: A screen to add a new plant.
- **StackNavigator**: Manages screen navigation.

## Features

- View list of plants, will get only data without picture, added picture after getting by using .Map and then desplay.
- Add new plant with name and type by user itself.
- Randomly generated data for pH, water, humidity, sunlight (creating them by using Math.random() ).
- Web and mobile support (via Expo).