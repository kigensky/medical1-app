//import logo from './logo.svg';
import './App.css';



import React, { useState } from "react"
import axios from "axios"

function App() {
  const [session, setSession] = useState(null)

  const [searchInput, setSearchInput] = useState("mary")
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [patientVisits, setPatientVisits] = useState()
  const [patientVitals, setPatientVitals] = useState()

  const [showVisits, setShowVisits] = useState(false)
  const [showVitals, setShowVitals] = useState(false)

  axios.interceptors.request.use(
    (config) => {
      config.headers["Authorization "] = "Basic YWRtaW46QWRtaW4xMjM="
      config.headers["Cookie"] = "JSESSIONID=2D158E83ACFB788998C7DB495F07C1B9"
      config.headers["Content-Type"] = "application/json"
      config.headers["Accept"] = "application/json"
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const fetchSession = () => {
    let url = "/openmrs/ws/rest/v1/session"
    setIsLoading(true)
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        setSession(result)
        console.log(result)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const fetchPatientVisits = (patientId) => {
    console.log(patientId)
    let url = `/openmrs/ws/rest/v1/visit?patient=${patientId}`
    setIsLoading(true)
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        setPatientVisits(result.results)
        console.log(result.results)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const searchPatiens = async () => {
    setIsLoading(true)
    let url = `/openmrs/ws/rest/v1/patient?q=${searchInput}&v=default&limit=1`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      setSearchResults(data.results)
      setIsLoading(false)
    }
  }

  const fetchPatientVitals = (patientId) => {
    console.log(patientId)
    let url = `/openmrs/ws/rest/v1/obs?patient=${patientId}&v=full`
    setIsLoading(true)
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        setPatientVitals(result.results)
        console.log(result.results)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const handleSearch = () => {
    if (searchInput.length > 0) {
      searchPatiens()
    } else {
      setSearchResults([])
      console.log("please enter a search term")
    }
  }

  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handleLogin = () => {
    fetchSession()
  }

  const handleShowVisits = (id) => {
    fetchPatientVisits(id)
    setShowVisits(true)
  }

  const handleShowVitals = (id) => {
    fetchPatientVitals(id)
    setShowVitals(true)
  }

  if (!session) {
    return <button onClick={handleLogin}>login</button>
  }
 console.log({ searchResults })
   console.log({ patientVisits })
   console.log({ patientVitals })
  console.log({ patientVitals })

  return (
    <div className="App">
      <input type="text" value={searchInput} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
      {isLoading ? <p>loading...</p> : null}

      {searchResults &&
        searchResults.map(
          (patient) =>
            patient.person.display.toLowerCase().includes(searchInput) && (
              <div key={patient.uuid}>
                <p>{patient.person.display}</p>
                <p>
                  DoB :{new Date(patient.person.birthdate).toLocaleDateString()}
                </p>
                <p>
                  Grnder : {patient.person.gender === "F" ? "Female" : "Male"}
                </p>
                <button onClick={() => handleShowVisits(patient.uuid)}>
                  View Visits
                </button>
                {patientVisits && (
                  <div>
                    <p>Visits</p>
                    {patientVisits.map((visit) => (
                      <div key={visit.uuid}>
                        <p>{visit.display}</p>
                      </div>
                    ))}

                    <button onClick={() => handleShowVitals(patient.uuid)}>
                      View Vitals
                    </button>
                    {patientVitals && (
                      <div>
                        <p>Vitals</p>
                        <ol>
                          {patientVitals
                            .sort(
                              (a, b) =>
                                new Date(b.obsDatetime) -
                                new Date(a.obsDatetime)
                            )
                            .map((vital) => (
                              <li key={vital.uuid}>
                                {vital.display +
                                  " - " +
                                  new Date(
                                    vital.obsDatetime
                                  ).toLocaleDateString("en-US")}
                              </li>
                            ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
        )}
    </div>
  )
}

export default App;
