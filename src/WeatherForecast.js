import React from "react";

const WeatherForecast = ({ forecastData }) => {
    return (
        <div className="forecast-container">
            <h3>Weather Forecast</h3>
            <div className="forecast-grid">
                {forecastData.map((day, index) => (
                    <div className="forecast-card" key={index}>
                        <p>{day.date}</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                            alt="Weather Icon"
                        />
                        <p>{day.temp}°C </p>
                        <p> {day.temp_min}°C</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;
