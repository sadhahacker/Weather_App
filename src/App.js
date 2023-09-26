import React, {useState} from "react";
import axios from "axios";
import "./style.css";


function App() {
  const [data, setData] = useState({
    celcius: 10,
    name: "Chennai",
    humidity: 10,
    speed: 2,
    image: '/Images/clouds.png'
  });
  const [name,setName] = useState('');
  const handleClick = () => {
    if(name !== ""){
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=32dee628953e5dec1f1161ce797306a5&units=metric`;
       axios.get(apiUrl)
      .then((res) => {
        let imagePath = '';
        if(res.data.weather[0].main == "Clouds"){
          console.log("hi")
          imagePath = "/Images/clouds.png"
        }
        else if(res.data.weather[0].main == "Clear"){
          imagePath = "/Images/clear.png"
        }
        else if(res.data.weather[0].main == "Rain"){
          imagePath = "/Images/rain.png"
        }
        else if(res.data.weather[0].main == "Drizzle"){
          imagePath = "/Images/drizzle.png"
        }
        else if(res.data.weather[0].main == "Mist"){
          imagePath = "/Images/mist.png"
        }
        else {
          imagePath = "/Images/clouds.png"
        }
        setData({
          ...data,
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          image: imagePath
        });
      })
      .catch((err) => console.log(err));
    }
  }
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input type="text" placeholder="Enter the city" onChange={e => setName(e.target.value)}/>
          <button>
            <img src="/Images/search.png" onClick={handleClick}/>
          </button>
        </div>
        <div className="winfo">
          <img src={data.image} alt="CloudImage" className="icon" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/Images/humidity.png" alt="humidity" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/Images/wind.png" alt="wind" />
              <div className="wind">
                <p>{Math.round(data.speed)} Km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
