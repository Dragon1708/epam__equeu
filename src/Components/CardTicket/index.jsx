import React from 'react'
import axios from 'axios';

import DB from '../../Assets/db.json'

import './CardTicket.scss';

const CardTicket = ({userInfo,updateTickets, index})=>{
       const {id,Name, phone, planetID}=userInfo

     const isActive=index===0 ? true : false;
//console.log(id)
const accepted=()=>{
if (isActive) {
    // axios.post('http://localhost:3001/users',{
    //     Name: Name,
    //     phone: phone,
    //     planetID: planetID,
    //     status: "success"
    // } ).then(()=>{
    //     axios.delete(`http://localhost:3001/users/`+id).then(()=>{
    //     updateTickets()
    // })
    // })
    axios.delete(`http://localhost:3001/users/`+id).then(()=>{
        axios.post('http://localhost:3001/users',{
                id:id,
                Name: Name,
                phone: phone,
                planetID: planetID,
                status: "success"
            }).then(()=>{
                updateTickets()
               
            }

            )
        })

}
}

const canceled=()=>{
    if (isActive) {
        axios.delete(`http://localhost:3001/users/`+id).then(()=>{
            axios.post('http://localhost:3001/users',{
                    id:id,
                    Name: Name,
                    phone: phone,
                    planetID: planetID,
                    status: "canceled"
                }).then(()=>{
                    updateTickets()
                }
    
                )
            })
    }
    }

    return (
        <div className="CardTicket">
            <div className="CardTicket__sidebar">
                <div className="CardTicket__img-container">
                    <img className="CardTicket__planet-img" src={DB.Planets[planetID].PlanetImage} />
                </div>
                <div className="CardTicket__sidebar-container">
                    <label className="CardTicket__planet-label secondary-text ">Planet</label>
                    <h2 className="CardTicket__planet-name Title-font">{DB.Planets[planetID].name}</h2>
                </div>
            </div>
            <div className="CardTicket__content">
                <label className="CardTicket__name-label secondary-text ">Name</label>
                <h2 className="CardTicket__name Title-font">{Name}</h2>
                <label className="CardTicket__phone-label secondary-text ">Tel</label>
                <h2 className="CardTicket__phone Title-font">{phone}</h2>
              {isActive ?  <div className="CardTicket__toggle">
                    <button onClick={accepted} className="CardTicket__toggle-success green-btn">Принять заявку</button>
                    <button  onClick={canceled}  className="CardTicket__toggle-cancel green-btn">Отменить заявку</button>
                </div> : <div></div> }
            </div>
        </div>
    )
}

export default CardTicket;