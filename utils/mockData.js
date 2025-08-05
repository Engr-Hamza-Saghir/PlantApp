export function generateRandomPlant(name, type) {
  return {
    name,
    type,
    sunlight: Math.floor(Math.random() * 100),
    water: Math.floor(Math.random() * 100),
    humidity: Math.floor(Math.random() * 100),
    ph: (Math.random() * (7 - 4) + 4).toFixed(1),
  };
    console.log(" DashboardScreen rendered"+ph);

}
