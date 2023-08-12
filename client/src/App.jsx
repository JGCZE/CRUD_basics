import { useState } from 'react'
import './App.css'
import Axios from 'axios'

import React from 'react'

const App = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState('')
  const [position, setPosition] = useState('')
  const [wage, setWage] = useState(0)
  
  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      console.log('Success')
    })
  }

  return (
    <div className='App'>
      <div className='information'>
        <label>Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)}/>

        <label>Age:</label>
        <input type="number" onChange={(e) => setAge(e.target.value)}/>

        <label>Country:</label>
        <input type="text" onChange={(e) => setCountry(e.target.value)}/>

        <label>Position:</label>
        <input type="text" onChange={(e) => setPosition(e.target.value)}/>

        <label>Wage:</label>
        <input type="number" onChange={(e) => setWage(e.target.value)}/>
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      

      <div>
        <button>Show Employees</button>
      </div>
    </div>
  ) 
}

export default App