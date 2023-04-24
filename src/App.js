// Importing modules
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import axios from "axios";
import "./App.css";

function App() {

  // usestate for setting a javascript
  // object for storing and using data
  const [allData, setAllData] = useState([]);
  const [sentence, setSentence] = useState('');

  const [allPrediction, setAllPrediction] = useState([])

  const showAllData = false;


  // check user-input 
  const [value, setValue] = React.useState('');

  const handleChange = (e) => {
    setSentence(e.target.value);
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (sentence.length === 0) {
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


  const cardData = [
    {
      color: "cyan",
      model: "Hate",
      prediction: allPrediction.identity_hate,
    },
    {
      color: "red",
      model: "Threat",
      prediction: allPrediction.threat,
    },
    {
      color: "pink",
      model: "Obscene",
      prediction: allPrediction.obscene,
    },
    {
      color: "blue",
      model: "Toxic",
      prediction: allPrediction.severe_toxic,
    },
    {
      color: "orange",
      model: "Insult",
      prediction: allPrediction.insult,
    },
  ]

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <div className="inputGroup userInput">
            <input type="text" required="" autoComplete="off" onChange={handleChange} placeholder="Type here ...."></input>
            <button type="submit" disabled={!value} onClick={handleSubmit}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="24" height="24"
                viewBox="0 0 24 24">
                <path d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"></path>
              </svg>
            </button>
          </div>
        </form>

        {allPrediction.identity_hate &&
          <div>
            <div class="container">
              {
                cardData.map(i => (
                  <Card
                    color={i.color}
                    model={i.model}
                    prediction={i.prediction} />
                ))
              }
            </div>
          </div>
        }

        {
          showAllData &&
          <div>
            <button type="submit" onClick={() => fetchData()}>Get Data</button>
            {
              allData.map((data) => {
                return (
                  <div style={{ display: "flex", gap: "2rem" }}>
                    <p>identity_hate : {data.sentence}</p>
                  </div>
                )
              })}
          </div>
        }

      </header>
    </div>
  );
}

export default App;
