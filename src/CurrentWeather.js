import React from "react";

const CurrentWeather = ({ weatherData }) => {
    return (
        <div className="current-weather">
            <div className="current-weather-header">
                <p>{new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
                <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            </div>
            <div className="current-weather-body">
                <div className="current-temp">{weatherData.main.temp}°C</div>
                <p>{weatherData.weather[0].description}</p>
            </div>
            <div className="additional-info">
                <p>Feels Like: {weatherData.main.feels_like}°C</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind: {weatherData.wind.speed} m/s</p>
                <p>Population: {weatherData.population || "N/A"}</p>
                <p>UV Index: {weatherData.uvIndex || "N/A"}</p>
            </div>
        </div>
    );
};

export default CurrentWeather;

