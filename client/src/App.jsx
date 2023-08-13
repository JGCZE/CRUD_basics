import { useState } from 'react'
import './App.css'
import Axios from 'axios'

import React from 'react'
import { set } from 'date-fns'

const App = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState('')
  const [position, setPosition] = useState('')
  const [wage, setWage] = useState(0)
  const [employeeList, setEmployeeList] = useState([])
  const [newWage, setNewWage] = useState(0)
  
  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage
        }
      ])
    })
  }

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data)
    })
  }

  
  const updateEmpWage = (id) => {
    Axios.put('http://localhost:3001/update', {
      id: id,
      wage: newWage
    }).then((response) => {
      setEmployeeList(
        employeeList.map(val => {
          const {id, name, age, country, position, wage} = val
          return val.id === id ? {id, name, age, country, position, wage: newWage} : val
        })
        )
      })
    }
    
    const deleteEmp = (id) => {
      Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
        setEmployeeList(
          employeeList.filter((val) => {
            return val.id !== id
          })
        )
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

      <div className='employees'>
        <button onClick={getEmployees}>Show Employees</button>

        {employeeList.map( (val, key) => {
          const {id, name, age, country, position, wage} = val
          return (
            <div key={key} className='employee'>
              <div>
                <h3>Name: {name}</h3>
                  <h3>Age: {age}</h3>
                  <h3>Country: {country}</h3>
                  <h3>Position: {position}</h3>
                  <h3>Salery: {wage}</h3> 
              </div>

              <div className=''>
                <input type="text" placeholder='20000...' onChange={(e) => setNewWage(e.target.value)}/>
                <button onClick={() => updateEmpWage(id)}>Update</button>
                <button onClick={() => deleteEmp(id)}>Delete</button>
              </div>        
            </div>
          )
        })}
      </div>
    </div>
  ) 
}

export default App