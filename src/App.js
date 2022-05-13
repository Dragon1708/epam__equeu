import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link }
 from "react-router-dom";
 import { Amplify } from 'aws-amplify';
 import awsExports from './aws-exports';


import {venus,earth,mars,mercury, neptune,uranus} from './Components/PlanetImages.js'

// import {venus, earth, mars, mercury, neptune, uranus} 
// from './Components/Planetimages.js';

import './App.scss';

import Header from './Components/Header'
import RegisterForm from './Components/RegisterUser'
import Footer from './Components/Footer'
import AdminPanel from './Components/AdminPanel'
import RegisterAdmin from './Components/RegisterAdmin'
import QueuePanel from './Components/QueuePanel'
import QueueResultPanel from './Components/QueuePanel/QueueResultPanel.jsx'


import DB from './Assets/db.json'
Amplify.configure(awsExports);

function App() {

const [PlanetID, setPlanetID] = useState(0);

  return (
   
    <div className="App">
<Header/>

<Routes>
  <Route path="/" element={
     <section className="RegisterForm__section">
     <img className="RegisterForm__img" src={DB.Planets[PlanetID].PlanetImage}/>
    <RegisterForm setNumPlanet={[PlanetID, setPlanetID]} /> 
    </section>
  }/>
    <Route path="/AdminPanel"  element={<AdminPanel />}/>
    <Route path="/RegisterAdmin"  element={<RegisterAdmin />}/>
    <Route path="/QueuePanel"  element={<QueuePanel />}/> 
    <Route path="/QueueResultPanel"  element={<QueueResultPanel />}/> 
 </Routes>

<Footer/>
    </div>

  );
}

export default App;
