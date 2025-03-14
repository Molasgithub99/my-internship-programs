import { useEffect, useState, useRef } from 'react'
import './Weather.css' //importing the css file
import search_icon from '../assets/search.png' //importing the search icon from assets folder
import clear_icon from '../assets/clear.png' //importing the clear image from assets folder
import cloud_icon from '../assets/cloud.png' //importing the cloudy image from assets folder
import rain_icon from '../assets/rain.png' //importing the rain image from assets folder
import snow_icon from '../assets/snow.png' //importing the snow image from assets folder
import drizzle_icon from '../assets/drizzle.png' //importing the drizzle image from assets folder
import humidity_icon from '../assets/humidity.png' //importing the humidity image from assets folder
import wind_icon from '../assets/wind.png' // importing the wind image from assets folder    

const Weather = () => {

    const inputRef = useRef()
    const[weatherData, setWeatherData] = useState(false);

    // const VITE_APP_ID = 'bc5f6c36ccbff3ea07e14fb743c195f6'

    const allIcons = {
        "01d" : clear_icon,
        "01n" : clear_icon,
        "02d" : cloud_icon,
        "02n" : cloud_icon,
        "03d" : cloud_icon,
        "03n" : cloud_icon,
        "04d" : drizzle_icon,
        "04n" : drizzle_icon,
        "09d" : rain_icon,
        "09n" : rain_icon,
        "10d" : rain_icon,
        "10n" : rain_icon,
        "13d" : snow_icon,
        "13n" : snow_icon,
    }
    
    const search = async (city) =>{
        if(city === ""){
            alert("Enter city name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        }catch(error){
            setWeatherData(false);
            console.log("Error in fetching weather data", error);
        }       
    }


    useEffect(() => {
        search("Gambia")
    }, [])


  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' />
            <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)}/>
        </div>
        {weatherData? <> 
            <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>
        
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>

            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </> : <> </>}
    </div>
  )
}


export default Weather


// npm run dev 
// Open your browser and go to http://localhost:3000/ to see the weather app.