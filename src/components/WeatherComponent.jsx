import React, { useEffect, useRef, useState } from 'react'
import { convertToPascalCase, formatDate, getCurrTime } from './common/CommonFunction';
import weather_icon from '../assets/images/weather_Icon2.svg'

function WeatherComponent() {

    const [city, setCity] = useState({})
    const [closestData, setClosestData] = useState({})
    const [temp , setTemp] = useState('')
    const dataRef = useRef(null)
    const cityRef = useRef(null)


    useEffect(() => {
        getCurrentLocation()
    }, []);

    useEffect(() => {
console.log("city",city)
    }, [city])

    function getCurrentLocation() {
        let latitude;
        let longitude;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    latitude = position.coords.latitude
                    longitude = position.coords.longitude
                    getWeatherApi(latitude, longitude)
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }

    }

    function getWeatherApi(lat, long) {
        const apiKey = '5fb3fe51d3a3d94093516c2adcc69421';

          fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
              }
              return response.json();
            })
            .then(json => {
                setCity(json.city); // Set city information
                cityRef.current = json.city
                dataRef.current = json.list;
                getTodaylatestData(json.list)

              })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
       
    }

    function getTodaylatestData(list) {
        console.log('list',list)
        let todayDate = formatDate()
        

        let totDetails = list && list.length ?list.filter((item) => item.dt_txt.split(' ')[0] === todayDate.toString()):[]
        let currTime = parseInt(getCurrTime());

        let closestData = null;
        let minDifference = Infinity;
        
        totDetails.forEach(item => {
            let difference = Math.abs(parseInt(item.dt_txt.split(' ')[1]) - currTime);
        
            if (difference < minDifference) {
                minDifference = difference;
                closestData = item;
            }
        });
        setClosestData(closestData)
        setTemp((closestData?.main.temp)-273.15)
        
    }


    return (
        <div className='weather-container'>
            <img src={weather_icon}/>
            {Object.keys(closestData).length  ?
                <div className="weather-data">
                    <h2>{cityRef.current?.name}</h2>
                    <div className="temp">{(Math.round(temp))}  °C</div>
                    <div className="rain-desc">{convertToPascalCase(closestData?.weather[0].description)}</div>
                     <p>Humidity:  {closestData?.main?.humidity}%</p>
                </div> : null
            }
             
        </div>
    )
}

export default WeatherComponent
