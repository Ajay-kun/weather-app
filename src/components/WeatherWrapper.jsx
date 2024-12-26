import React, { useState, useEffect, useRef } from "react";
import search from '../assets/images/search.png';
import clear from '../assets/images/clear.png';
import humidity from '../assets/images/humidity.png';
import wind from '../assets/images/wind.png';
import cloud from '../assets/images/clouds.png';
import drizzle from '../assets/images/drizzle.png';
import rain from '../assets/images/rain.png';
import snow from '../assets/images/snow.png';

import './WeatherWrapper.css';

function WeatherWrapper() {
    const inputRef = useRef();
    const [weatherr, setWeather] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const climate = async (city) => {
        if (city === "") {
            alert("Please enter a city.");
            return;
        }
        document.getElementById('winput').value = "";
        const images = {
            "01d": clear,
            "01n": clear,
            "02d": cloud,
            "02n": cloud,
            "03d": cloud,
            "03n": cloud,
            "04d": drizzle,
            "04n": drizzle,
            "09d": rain,
            "09n": rain,
            "10d": rain,
            "10n": rain,
            "13d": snow,
            "13n": snow
        };

        try {
            const KEY = "c4abb2192a8b2604d3dad41b2e178200";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`;
            const res = await fetch(url);
            const data = await res.json();

            const icon = images[data.weather[0].icon] || clear;
            setWeather({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                climateImg: icon,
            });
            setShowDetails(true);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        climate('Nellore');
    }, []);

    return (
        <div className='Weather'>
            <div className='WeatherWrapper'>
                <input 
                    type="text" 
                    ref={inputRef} 
                    placeholder="Enter City..." 
                    id="winput" 
                />
                <img 
                    src={search} 
                    alt="search-icon" 
                    id='searchIcon' 
                    onClick={() => climate(inputRef.current.value)} 
                />
            </div>
            {showDetails && (
                <>
                    <div className='BaseData'>
                        <img src={weatherr.climateImg} alt="weather-icon" id='weatherIcon' />
                        <p className='temp'>{weatherr.temp}°C</p>
                        <p className='city'>{weatherr.location}</p>
                    </div>
                    <div className='ExtraData'>
                        <div className='col'>
                            <img className='hum' src={humidity} alt="Humidity Icon" />
                            <div className='details'>
                                <p className='humtag' id='det'>Humidity</p>
                                <p id='det'>{weatherr.humidity}%</p>
                            </div>
                        </div>
                        <div className='col'>
                            <img className='wind' src={wind} alt="Wind Icon" />
                            <div className='details'>
                                <p className='wintag' id='det'>Wind</p>
                                <p id='det'>{weatherr.wind} Kmph</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default WeatherWrapper;
