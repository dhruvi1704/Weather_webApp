import React, { useState, useEffect } from "react";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";
import "./WeatherApp.css";

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [city, setCity] = useState("Mumbai");

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
            );
            const data = await response.json();
            setWeatherData(data);

            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
            );
            const forecast = await forecastResponse.json();
            const dailyData = forecast.list.filter((item) =>
                item.dt_txt.includes("12:00:00")
            );
            setForecastData(
                dailyData.map((day) => ({
                    date: new Date(day.dt * 1000).toLocaleDateString("en-US", {
                        weekday: "short",
                    }),
                    icon: day.weather[0].icon,
                    temp: Math.round(day.main.temp),
                    temp_min: Math.round(day.main.temp_min),
                }))
            );
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    return (
        <div className="weather-app">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <button type="submit">Search</button>
            </form>
            {weatherData && <CurrentWeather weatherData={weatherData} />}
            {forecastData.length > 0 && <WeatherForecast forecastData={forecastData} />}
        </div>
    );
};

export default WeatherApp;
