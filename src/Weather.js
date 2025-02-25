import React, { useState } from 'react';
import './weather.css';

const Weather = () => {
  const [usercity, setusercity] = useState('');
  const [userdata, setdata] = useState(null);
  const [error, setError] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(''); 

  const ucity = (e) => {
    setusercity(e.target.value);
  };

  const searchW = async () => {
    document.querySelector(".data").style.display = 'block';
    const apikey = 'e298442a3b578d0967af9d4057545671';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${usercity}&appid=${apikey}`;

    try {
      const data = await fetch(url).then((response) => response.json());

     
      if (data.cod === '404') {
        setError('City not found');
        setdata(null); 
      } else {
        setdata(data);
        setError('');

       
        setBackgroundImage(getWeatherImage(data.weather[0].description));
      }
    } catch (error) {
      setError('Error fetching weather data');
      setdata(null);  
    }
  };

  const getWeatherImage = (description) => {
    if (description === 'clear sky') return 'https://img.freepik.com/premium-photo/beautiful-airatmosphere-bright-blue-sky-background-abstract-clear-texture-with-white-clouds_29332-3832.jpg?w=1800';
    if (description === 'snow') return 'https://in.pinterest.com/pin/1128996200335927020/';
    if (description === 'light snow') return 'https://i.pinimg.com/474x/75/9e/27/759e27f48efcf993996d355f2cfbf726.jpg';
    if (description === 'scattered clouds') return 'https://i.pinimg.com/474x/b8/a9/36/b8a93617bac840ea6c40228a5426fd2a.jpg';
    if (description === 'light intensity shower rain') return 'https://i.pinimg.com/736x/1c/9b/a4/1c9ba40cd8e10429005842104613d007.jpg';
    if (description === 'haze') return 'https://i.pinimg.com/474x/cf/84/4a/cf844ac68ac45180a3def5e27b264e7c.jpg';
    if (description === 'broken clouds') return 'https://i.pinimg.com/474x/7c/4a/da/7c4adacbc61dff4f4a3f0f04cc6f30b0.jpg';
    if (description === 'few clouds') return 'https://i.pinimg.com/474x/f3/79/d4/f379d408efb7367f39b70b6a370b8953.jpg';
    if (description === 'overcast clouds') return 'https://i.pinimg.com/474x/67/42/27/674227fd8e86b30fb25037ddf9fcf396.jpg';
    if (description === 'smoke') return 'https://i.pinimg.com/474x/d5/a0/c3/d5a0c35f2fd5ecef1e23cbeaf0924d98.jpg';
    if (description === 'moderate rain') return 'https://i.pinimg.com/474x/d9/fe/06/d9fe065cc753bd69e5d605187a253257.jpg';
    if (description === 'light intensity drizzle') return 'https://i.pinimg.com/474x/5f/40/9a/5f409a0fd631fa529d0f47e856a13032.jpg';
    if (description === 'mostly clouds') return 'https://i.pinimg.com/474x/be/94/6f/be946f30b538606632b681fefc357b93.jpg';
    if (description === 'light rain and snow') return 'https://i.pinimg.com/474x/9d/83/7f/9d837ff13c7cfb745a25e52d27f7560a.jpg';
    if (description === 'light rain') return 'https://i.pinimg.com/474x/11/2f/8d/112f8d27878f08b813eb945dfb87f620.jpg';
    return '';
  };

  return (
    <div
      className='app'
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }} 
    >
      <div className="searchbar">
        <input
          type="text"
          value={usercity}
          onChange={ucity}
          placeholder='Enter City name'
        />
        <button onClick={searchW}>Search</button>
      </div>
      <div className="data">
        {error && <p className="error">{error}</p>}

        {userdata && (
          <>
            <h2>{userdata.name}</h2>
            <p>Temperature: {Math.round(userdata.main.temp - 273.15)}°C</p>
            <p>Humidity: {userdata.main.humidity}%</p>
            <p>Wind Speed: {userdata.wind.speed} km/h</p>
            <p>{userdata.weather[0].description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
