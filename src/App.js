import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import BarchartIntensity from './BarchartIntensity';
import BarchartLikeliwood from './BarchartLikeliwood';
import BarchartRelevance from './BarchartRelevance';
import BarchartByYear from './BarchartByYear';
import BarchartByCountry from './BarchartByCountry';
import BarchartByTopic from './BarchartByTopic';
import BarchartByRegion from './BarchartByRegion';

const App = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // for filters  
  const [activeComponent, setActiveComponent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getData');
        setData(response.data);
        setOriginalData(response.data);
        console.log("data  retrived")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      // all distinct citys

      const citys = [...new Set(data.map((d) => d.city))];
      console.log(citys);

    };

    fetchData();
  }, []);

  useEffect(() => {
    // Set a default chart when data is available
    if (data.length >= 0) {
      setActiveComponent(<BarchartIntensity data={data} />);
    }
  }, [data]);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const selectfilters = async () => {
    <BarchartIntensity data={[]} />
    const endYear = document.getElementById('endYearSelect').value;
    const topics = document.getElementById('topicsSelect').value;
    const categories = document.getElementById('categoriesSelect').value;
    const regions = document.getElementById('regionsSelect').value;
    const country = document.getElementById('countrySelect').value;

    console.log(endYear, topics, categories, regions, country);
    let currdata=await originalData;
    console.log(currdata);
    if(endYear !==""){
      setData(currdata.filter((d) => d.end_year === endYear));
      
    }
    if(topics !==""){
      setData(currdata.filter((d) => d.topic === topics));
    }
    
    if(categories!==""){
      setData(currdata.filter((d) => d.sector === categories));
    }

    if(regions!==""){
      setData(currdata.filter((d) => d.region === regions)); 
    }

    if(country!==""){
      setData(currdata.filter((d) => d.country === country));
    }
    console.log(await data);
    
  }
  return (
    <div className='container'>
      <div className='sidebar'>
        <h3>Click to view </h3>
        <button onClick={() => handleButtonClick(<BarchartIntensity data={data} />)}>Intensity</button>
        <button onClick={() => handleButtonClick(<BarchartLikeliwood data={data} />)}>Likeliwood</button>
        <button onClick={() => handleButtonClick(<BarchartRelevance data={data} />)}>Relevance</button>
        <button onClick={() => handleButtonClick(<BarchartByYear data={data} />)}>Year</button>
        <button onClick={() => handleButtonClick(<BarchartByCountry data={data} />)}>Country</button>
        <button onClick={() => handleButtonClick(<BarchartByTopic data={data} />)}>Topic</button>
        <button onClick={() => handleButtonClick(<BarchartByRegion data={data} />)}>Region</button>
      </div>
      <div className='main'>
        <div className='dash'><h1>DashBoard</h1></div>
        <div className='charts'>
          {activeComponent && <div className="chart-container">{activeComponent}</div>}
        </div>
      </div>
      <div className='filters'>
        <h3>Filters</h3>
        <select name="endYear" id="endYearSelect">
          <option value="">Select Year</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2030">2030</option>
          <option value="2034">2034</option>
          <option value="2035">2035</option>
          <option value="2036">2036</option>
          <option value="2040">2040</option>
          <option value="2041">2041</option>
          <option value="2046">2046</option>
          <option value="2050">2050</option>
          <option value="2055">2055</option>
          <option value="2060">2060</option>
          <option value="2126">2126</option>
          <option value="2200">2200</option>
        </select>

        <select name="topics" id="topicsSelect">
          <option value="">Select Topic</option>
          <option value="gas">Gas</option>
          <option value="oil">Oil</option>
          <option value="consumption">Consumption</option>
          <option value="market">Market</option>
          <option value="gdp">GDP</option>
          <option value="war">War</option>
          <option value="production">Production</option>
          <option value="export">Export</option>
          <option value="biofuel">Biofuel</option>
          <option value="policy">Policy</option>
          <option value="economy">Economy</option>
          <option value="strategy">Strategy</option>
          <option value="robot">Robot</option>
          <option value="growth">Growth</option>
          <option value="economic">Economic</option>
          <option value="energy">Energy</option>
          <option value="food">Food</option>
          <option value="administration">Administration</option>
          <option value="unemployment">Unemployment</option>
          <option value="trade">Trade</option>
          <option value="demand">Demand</option>
          <option value="economicgrowth">Economic Growth</option>
          <option value="industry">Industry</option>
          <option value="capital">Capital</option>
          <option value="worker">Worker</option>
          <option value="tension">Tension</option>
          <option value="terrorism">Terrorism</option>
          <option value="transport">Transport</option>
          <option value="peakoil">Peak Oil</option>
          <option value="vehicle">Vehicle</option>
          <option value="tourist">Tourist</option>
          <option value="artificialintelligence">Artificial Intelligence</option>
          <option value="climate">Climate</option>
          <option value="power">Power</option>
          <option value="crisis">Crisis</option>
          <option value="ice">Ice</option>
          <option value="population">Population</option>
          <option value="politics">Politics</option>
          <option value="business">Business</option>
          <option value="work">Work</option>
          <option value="coal">Coal</option>
          <option value="gamification">Gamification</option>
          <option value="finance">Finance</option>
          <option value="interestrate">Interest Rate</option>
          <option value="risk">Risk</option>
          <option value="inflation">Inflation</option>
          <option value="asylum">Asylum</option>
          <option value="resource">Resource</option>
          <option value="plastic">Plastic</option>
          <option value="electricity">Electricity</option>
          <option value="bank">Bank</option>
          <option value="gasoline">Gasoline</option>
          <option value="car">Car</option>
          <option value="money">Money</option>
          <option value="technology">Technology</option>
          <option value="aquaculture">Aquaculture</option>
          <option value="city">City</option>
          <option value="investment">Investment</option>
          <option value="revenue">Revenue</option>
          <option value="emission">Emission</option>
          <option value="climatechange">Climate Change</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="government">Government</option>
          <option value="security">Security</option>
          <option value="software">Software</option>
          <option value="building">Building</option>
          <option value="transportation">Transportation</option>
          <option value="wealth">Wealth</option>
          <option value="clothing">Clothing</option>
          <option value="shortage">Shortage</option>
          <option value="debt">Debt</option>
          <option value="agriculture">Agriculture</option>
          <option value="tax">Tax</option>
          <option value="carbon">Carbon</option>
          <option value="brexit">Brexit</option>
          <option value="workforce">Workforce</option>
          <option value="change">Change</option>
          <option value="automaker">Automaker</option>
        </select>
        <select name="categories" id="categoriesSelect">
          <option value="">Select Sector</option>
          <option value="Energy">Energy</option>
          <option value="Environment">Environment</option>
          <option value="Government">Government</option>
          <option value="Aerospace & defence">Aerospace & Defence</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Retail">Retail</option>
          <option value="Financial services">Financial Services</option>
          <option value="Support services">Support Services</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Food & agriculture">Food & Agriculture</option>
          <option value="Automotive">Automotive</option>
          <option value="Tourism & hospitality">Tourism & Hospitality</option>
          <option value="Construction">Construction</option>
          <option value="Security">Security</option>
          <option value="Transport">Transport</option>
        </select>
        <select name="regions" id="regionsSelect">
          <option value="">Select Region</option>
          <option value="Northern America">Northern America</option>
          <option value="Central America">Central America</option>
          <option value="Western Africa">Western Africa</option>
          <option value="Western Asia">Western Asia</option>
          <option value="Eastern Europe">Eastern Europe</option>
          <option value="Central Africa">Central Africa</option>
          <option value="Northern Africa">Northern Africa</option>
          <option value="Southern Africa">Southern Africa</option>
          <option value="Southern Asia">Southern Asia</option>
          <option value="Central Asia">Central Asia</option>
          <option value="Eastern Asia">Eastern Asia</option>
          <option value="South America">South America</option>
          <option value="South-Eastern Asia">South-Eastern Asia</option>
          <option value="Eastern Africa">Eastern Africa</option>
          <option value="Europe">Europe</option>
          <option value="Western Europe">Western Europe</option>
          <option value="Northern Europe">Northern Europe</option>
          <option value="Southern Europe">Southern Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
        </select>
        <select name="country" id="countrySelect">
          <option value="">Select Country</option>
          <option value="USA">United States of America</option>
          <option value="Mexico">Mexico</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Lebanon">Lebanon</option>
          <option value="Russia">Russia</option>
          <option value="SaudiArabia">Saudi Arabia</option>
          <option value="Angola">Angola</option>
          <option value="Egypt">Egypt</option>
          <option value="SouthAfrica">South Africa</option>
          <option value="India">India</option>
          <option value="Ukraine">Ukraine</option>
          <option value="Azerbaijan">Azerbaijan</option>
          <option value="China">China</option>
          <option value="Colombia">Colombia</option>
          <option value="Niger">Niger</option>
          <option value="Libya">Libya</option>
          <option value="Brazil">Brazil</option>
          <option value="Mali">Mali</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Iraq">Iraq</option>
          <option value="Iran">Iran</option>
          <option value="SouthSudan">South Sudan</option>
          <option value="Venezuela">Venezuela</option>
          <option value="BurkinaFaso">Burkina Faso</option>
          <option value="Germany">Germany</option>
          <option value="UnitedKingdom">United Kingdom</option>
          <option value="Kuwait">Kuwait</option>
          <option value="Canada">Canada</option>
          <option value="Argentina">Argentina</option>
          <option value="Japan">Japan</option>
          <option value="Austria">Austria</option>
          <option value="Spain">Spain</option>
          <option value="Estonia">Estonia</option>
          <option value="Hungary">Hungary</option>
          <option value="Australia">Australia</option>
          <option value="Morocco">Morocco</option>
          <option value="Greece">Greece</option>
          <option value="Qatar">Qatar</option>
          <option value="Oman">Oman</option>
          <option value="Liberia">Liberia</option>
          <option value="Denmark">Denmark</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Jordan">Jordan</option>
          <option value="Syria">Syria</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="Norway">Norway</option>
          <option value="Ghana">Ghana</option>
        </select>
        <button onClick={selectfilters}>Apply</button>
      </div>
    </div>
  );
};

export default App;
