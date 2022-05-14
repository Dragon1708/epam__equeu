import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {DataBaseLink} from '../../Host.js'

import CardTicket from '../CardTicket'

import './AdminPanel.scss';

const AdminPanel = () => {

  const [userData, SetUserData] = useState( [])
  const [UserStatistic, SetUserStatistic] = useState({
    waiting:0,
    success:0,
    cancel:0
  })

const updateUserTickets=()=>{
  axios.get(`${DataBaseLink}users`).then(({data}) =>{
   // const waitingUser= data.map((user) => user.status).filter(el => el==="waiting");
   const waitingUser= data.filter(el => el.status==="waiting");
let arr=[]
  for (let i = 0; i < waitingUser.length; i++) {
    arr.push( <li><CardTicket 
      key={waitingUser[i].id} 
      userInfo={waitingUser[i]} 
      index={i}
      updateTickets={updateUserTickets}
      /> </li>)
    
  }
const UpdatedStatistic={
  waiting:waitingUser.length,
  success:data.filter(el => el.status==="success").length,
  cancel:data.filter(el => el.status==="canceled").length
}
    SetUserData(arr)
    SetUserStatistic(UpdatedStatistic)
  })
}
useEffect(()=>{
  updateUserTickets()

},[])


  return (
    <section className="AdminPanel">

      {/* <scroll-container>
 <scroll-page id="1"> <CardTicket/> </scroll-page>
  <scroll-page id="2"><CardTicket/> </scroll-page>
  <scroll-page id="3"><CardTicket/> </scroll-page>
</scroll-container> */}
      <ul className="AdminPanel__list">
   
         {
    
        userData.map(user => user)    
      }
   
      
      </ul>

      <div className="AdminPanel__statistic">
        <div className="AdminPanel__statistic-wrapper">
          <table className="AdminPanel__statistic-table">
            <tbody>
              <tr>
                <td className="Title-font">Заявок у черзі:</td>
                <td>
                  <span className="statistic__waiting Title-font">{UserStatistic.waiting}</span>
                </td>
              </tr>
              <tr>
                <td className="Title-font">Заявок прийнято:</td>
                <td>
                  <span className="statistic__applyed Title-font">{UserStatistic.success}</span>
                </td>
              </tr>
              <tr>
                <td className="Title-font">Заявок відхилено:</td>
                <td>
                  <span className="statistic__cancel Title-font">{UserStatistic.cancel}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

  )

}

export default AdminPanel;