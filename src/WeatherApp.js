import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherDisplay from "./WeatherDisplay"; 
import "./WeatherApp.css";
import weatherDataSample from "./weather_api_output.json";

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null); 
    const [city, setCity] = useState("Toronto"); 

    const fetchWeatherData = async () => {
        try {
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
            );
            const weather = await weatherResponse.json();
            setWeatherData(weather);

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

    const getBackgroundColor = () => {
        if (!weatherData) return "#ffffff"; 
        const condition = weatherData.weather[0].main;
        if (condition === "Rain") return "#a4c5f9"; 
        if (condition === "Clear") return "#ffea85"; 
        if (condition === "Clouds") return "#d3d3d3"; 
        return "#ffffff"; 
    };

    const getBackgroundImage = () => {
        if (!weatherData) return "url('/images/default.jpg')"; 

        switch (weatherData.weather[0].main) {
            case "Clear":
                return "url('/images/pexels-alexander-f-ungerer-157458816-29560273.jpg')";
            case "Rain":
                return "url('/images/pexels-chetanvlad-1529360.jpg')";
            case "Clouds":
                return "url('/images/pexels-alexander-f-ungerer-157458816-29560273.jpg')";
            default:
                return "url('/images/pexels-alexander-f-ungerer-157458816-29560273.jpg')";
        }
    };

    return (
        <div
        style={{
            backgroundImage: getBackgroundImage(),
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            padding: "20px",
            color: "white",
        }}
    >

        <div className="Weather-app">
            {/* Form for city input */}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city name"
                />
                <button type="submit">Search</button>
            </form>

            {/* Pass weather data to child component */}
            {weatherData && <WeatherDisplay weatherData={weatherData} />}
        </div>
        </div>
    );
};

export default WeatherApp;
