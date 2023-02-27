import axios from "axios"
import { useEffect, useState } from 'react'
import './App.css'
import LocationInfo from "./components/LocationInfo"
import ResidentInfo from "./components/ResidentInfo"
import getRandomLocation from "./utils/getRandomLocation"

function App() {

  const [location, setLocation] = useState()
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  const [hasError, setHasError] = useState(false)
  const [listLocation, setListLocation] = useState()
  const [isShow, setIsShow] = useState(true)
  

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`
    axios.get(url)
    .then(res => {
      setLocation(res.data)
      setHasError(false)
    })
    .catch(err => {
      console.log(err)
      setHasError(true)
})

  },  [numberLocation])

  const handleSubmit = e => {
    e.preventDefault()
    if(e.target.inputLocation.value.trim().length === 0) {
      setNumberLocation(getRandomLocation())
    } else {
    setNumberLocation(e.target.inputLocation.value.trim())
  }
    e.target.inputLocation.value = e.target.inputLocation.value.trim()
  }

  const handleChange = e => {
    const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`
    axios.get(url)
    .then(res => setListLocation(res.data.results))
    .catch(err=> console.log(err))
  }

  const handleFocus = () => setIsShow(true)
  const handleBlur = () => setIsShow(false)
  const handleClickList = () =>  setNumberLocation[loc.id]

  console.log(isShow)

  return (
    <div className="app">
      <h1 className="app__title">Rick y morty</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
          id="inputLocation"
          type="text" 
          onChange={handleChange}
          //onFocus={handleFocus}
          //onBlur={handleBlur}
          />
        <button className="form__btn">Buscar</button>
        </form>
          {
            isShow &&
        <ul>
          {
            listLocation?.map(loc => (
              <li onClick={() => handleClickList(loc.id)} key={loc.id}>{loc.name}</li>
            ))
          }
        </ul>
}

        {
          hasError ?
          <h2 className="app__error">❌ Hey! solo debes buscar del 1 hacia el 126 🤗</h2>
          :
          <>
          <LocationInfo location={location} />
      <div className="residents__container">
        {
          location?.residents.map(url => (
            <ResidentInfo
              key={url}
              url={url}
            /> 
          ))
        }
        </div>
        </>
        }
      
      
    </div>
  )
}

export default App
