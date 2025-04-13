
export const getWeatherCategory = async (): Promise<string | null> => {
    const apiKey = "570bae24a7756b3c51c8d9fe3d592436"; // Replace this
  
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported");
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`; // for checking change lat, lon = 71.7069, 42.6043
            const response = await fetch(url);
            const data = await response.json();
  
            if (!response.ok) {
              reject(data.message || "Weather fetch failed");
              return;
            }
  
            const weatherMain = data.weather[0].main.toLowerCase();
            const temp = data.main.temp;
  
            let category = "";
  
            if (["rain", "drizzle", "thunderstorm"].includes(weatherMain)) {
              category = "rainy";
            } else if (temp < 10) {
              category = "cold";
            } else if (temp >= 30) {
              category = "hot";
            } else {
              category = "sunny";
            }
  
            resolve(category);
          } catch (err) {
            reject("Failed to fetch weather");
          }
        },
        (error) => {
          reject("Location permission denied");
        }
      );
    });
  };
  