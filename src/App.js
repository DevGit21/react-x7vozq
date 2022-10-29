import React from 'react';
import { useEffect, useState,useRef  } from "react";
import './style.css';

function App() {
  const imageURL = 'https://utopiamusic.com/logo.png';
  const [jsonData, setData] = useState([]);
  const [continentList, setContinentData] = useState([]);
  const [countryList, setcountryData] = useState([]);
  const componentRef = useRef(null); // for get div element
  const fetchData = () => {
    fetch(`https://api.countries.code-test.utopiamusic.com/all`)
      .then((response) => response.json())
      .then((actualData) => {
        setData(actualData);
        // get all continents
        const key = 'continent';
        const arrayOfcontinents = [...new Map(actualData.map(item =>
          [item[key], item])).values()];  
          setContinentData(arrayOfcontinents);
        })
        .catch((err) => {
          console.log(err.message);
        });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showContryList = (continent,e) => {
    Array.from(e.target.parentElement.children).forEach(function(item,i) {
      item.className = ""; //remove active class from othere element
    });
    e.target.classList.add('active');     

    //get country list by continent
    const filtered = jsonData.filter(data => {
      return data.continent === continent;
    });
    setcountryData(filtered);
    componentRef.current.scrollTo(0, 0);    
  };

  const highlightCountry = (e) => {    
    Array.from(e.target.parentElement.children).forEach(function(item,i) {
      item.className = ""; //remove active class from othere element
    });
    e.target.classList.add('active');    
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={imageURL} className="Utopia-logo" alt="logo" />
      </header>
      <div className="content">
        <div className="continent-name">
          {continentList.map(value => {
            return (
              <a key={value.continent} onClick={(e) => showContryList(value.continent,e)}>
                {value.continent}
              </a>
            );
          })}
        </div>
        <div className="country-list" ref={componentRef}>
          {countryList.map(country => {
            return (
                <a key={country.alpha2Code} onClick={ (e) => highlightCountry(e) }>{country.name}</a>              
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
