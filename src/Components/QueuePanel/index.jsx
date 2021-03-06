import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {DataBaseLink} from '../../Host.js'

import DB from '../../Assets/db.json'

import './QueuePanel.scss';

const QueuePanel = () => {
   let navigate = useNavigate();
   
    const isLogin=localStorage.getItem('userID') ? true : false;

    function updatePosition(){
        
        axios.get(`${DataBaseLink}users`).then(({data}) =>{
   
    const NUms=localStorage.getItem('userID')
    const DBuser=data.filter(el => el.id==NUms)
    
    if (DBuser[0].status!=="waiting") {
  
       navigate(`/QueueResultPanel`);  
    } else{
        const waitingUser=data.filter(el => el.status==="waiting");
        for (let i = 0; i < waitingUser.length; i++) {
                    if (waitingUser[i].id==NUms) {
                        console.log( waitingUser.slice(0,i).length/waitingUser.length)
                        setProgressVal(100-((waitingUser.slice(0,i).length/waitingUser.length)*100))
                   //    console.log(waitingUser, "==i==", i)
                        setQueuePosition(i+1)
                }
    }
}
        })
  
    }
    const [userData, setUserData] = useState(DB.users[0]);
    const [queuePosition, setQueuePosition] = useState(0);
    const [ProgressVal, setProgressVal] = useState(100);

    useEffect(() => {
        if (isLogin) {
      
            axios.get(`${DataBaseLink}users`).then(({data}) =>{
              //  const aa=data.filter(el=>  el.id==localStorage.getItem('userID'))[0]
                setUserData(data.filter(el=>  el.id==localStorage.getItem('userID'))[0])
               // console.log(DB.Planets[userData.planetID].PlanetImage)
             })
             updatePosition()
         }
      },[]);
//  setInterval(()=> {
//       console.log(queuePosition)
//       updatePosition()
//     }, 5000)


     return (
         
         <section className="QueuePanel">
            {isLogin ? <div className="QueuePanel__wrapper">
                <h1 className="QueuePanel__title Title-font">?????????????? ???? ????????????????????!</h1>
                 <div className="QueuePanel__container">
                     <label for="file" className="QueuePanel__queue-info Title-font">
                     ???????? ?????????????? ?? ??????????:<span>{queuePosition}</span>
                     </label>
                     <progress id="file" max="100" value={ProgressVal}> 70% </progress>
                     <div className="QueuePanel__data-wrapper">
                         <div className="data-wrapper__planet">
                             <h2 className="data-wrapper__title Title-font">???????????? ??????????????:</h2>
                             <img className="data-wrapper__img" src={DB.Planets[userData.planetID].PlanetImage} />
                             <div className="data-wrapper__planet-info">
                                 <label className="data-wrapper__label label-text">
                                     ??????????????
                                 </label>
                                 <h3 className="data-wrapper__planet-name Title-font">{DB.Planets[userData.planetID].name}</h3>
                             </div>
                         </div>
     
                         <div className="data-wrapper__user-info">
                             <h2 className="data-wrapper__user-title Title-font">???????? ??????????:</h2>
                             <label className="data-wrapper__label label-text" for="name">????????</label>
                             <h3 className="data-wrapper__name Title-font">{userData.Name}</h3>
                             <label className="data-wrapper__label label-text" for="phone" required>??????????????</label>
                             <h3 className="data-wrapper__phone Title-font">{userData.phone}</h3>
     
                         </div>
                     </div>
                 </div>
             </div> : <h1 className="QueuePanel__title Title-font">?????????? ????????????????????...</h1>}
         </section>
     
     )
 
 }
 
 export default QueuePanel;