// Importing modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // usestate for setting a javascript
  // object for storing and using data
  const [allData, setAllData] = useState([]);
  const [sentence,setSentence] = useState('');

  const [allPrediction, setAllPrediction] = useState([])

  const showAllData = false;


  // check user-input 
  const [value, setValue] = React.useState('');

  const handleChange = (e) => {
    setSentence(e.target.value);
    setValue(e.target.value);
  };

  const handleSubmit= async(e)=> {
    if(sentence.length===0){
      return;
    }
    const tempData = {}
    tempData['sentence'] = sentence

    e.preventDefault()
    try {
      const res = await axios.post('/', tempData)
      // console.log(res.data)
      setAllPrediction(res.data)

      // console.log(allPrediction.length)
     
    } catch (e) {
      console.log(e)
    }
  }

  async function fetchData() {
    // console.log('clicked')
    try {
      const response = await axios.get("/data")
      setAllData(response.data)
      // console.log(response.data)
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
    // console.log(allData) 
  }, []);

  return (
    <div className="App">
      <header className="App-header">
     <h1 className="titleClass">Abuse detection</h1>
        <div>
          <input type="text"  onChange={handleChange} placeholder="Type here ...."></input>
          <button type="submit" disabled={!value} onClick={handleSubmit}>submit</button>
        </div>
        <button  type="submit" onClick={() => fetchData()}>Get Data</button>

            {allPrediction.identity_hate&&
          <div>
            <div className="card">
              <div className="card-image"></div>
              <div className="card-description">
                <p className="text-title">identity_hate</p>
                <p className="text-body">{allPrediction.identity_hate}</p>
              </div>
            </div>
            <h1>identity_hate: {allPrediction.identity_hate}</h1>
            <h1>insult: {allPrediction.insult}</h1>
            <h1>obscene: {allPrediction.obscene}</h1>
            <h1>severe_toxic: {allPrediction.severe_toxic}</h1>
            <h1>threat: {allPrediction.threat}</h1> 
          </div>
            }
           
     
        {
        showAllData && allData.map((data) => {
          return (
            <div style={{ display: "flex", gap: "2rem" }}>
              <p>identity_hate : {data.sentence}</p>
            </div>

          )
        })}       

      </header>
    </div>
  );
}

export default App;
