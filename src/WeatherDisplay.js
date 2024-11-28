import React from "react";

const WeatherDisplay = ({ weatherData }) => {
    return (
        <div>
            <div className="weather-details">
                <h2>{weatherData.name}</h2> 
                <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                />
                <p>{weatherData.weather[0].description}</p> 
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Feels Like: {weatherData.main.feels_like}°C</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
            <div className="forecast-container">
            <h3>Weather Forecast</h3>
                {forecastData.map((day, index) => (
            <div className="forecast-day" key={index}>
            <p>{day.date}</p>
            <p>{day.temp}°C</p>
        </div>
    ))}
            </div>
        </div>
    );
};

export default WeatherDisplay;



