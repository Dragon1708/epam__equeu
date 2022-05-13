import React, {useState, useEffect} from 'react'
 import axios from 'axios';
 import {DataBaseLink} from '../../Host.js'

import DB from '../../Assets/db.json'

import Rocket from '../../Assets/images/Rocket.svg';
import RocketCancel from '../../Assets/images/RocketCancel.svg';
import './QueueResultPanel.scss';

const QueueResultPanel = () => {
    const [status, setStatus] = useState(DB.users[0].status);
    useEffect(() => {
            axios.get(`${DataBaseLink}users`).then(({data}) =>{
                setStatus(data.filter(el=>el.id==localStorage.getItem('userID'))[0].status)
             })
      },[]);
//const status=DB.users.filter(el=>el.id==localStorage.getItem('userID'))[0].status
let isSuccess=false
if (status==="success") {
    isSuccess=true
}
    return (
        <section className="QueueResultPanel">
            <div className="QueueResultPanel__container">
               {isSuccess ? <div className="QueueResultPanel__wrapper">
                    <img className="QueueResultPanel__img" src={Rocket} />
                    <h1 className="QueueResultPanel__title Title-font">Ваша заявка прийнята!</h1>
                    <p className="QueueResultPanel__sub-title secondary-text">Наш менеджер з вами зв’яжеться у найближчий час для уточнення всіх деталей </p>
                    <a href="#" className="QueueResultPanel__btn green-btn">Повернутися на головну</a>
                </div> : 
                <div className="QueueResultPanel__wrapper">
                    <img className="QueueResultPanel__img" src={RocketCancel} />
                    <h1 className="QueueResultPanel__title Title-font">Ваша заявка відхилена..</h1>
                    <p className="QueueResultPanel__sub-title secondary-text">Наш менеджер з вами зв’яжеться у найближчий час для уточнення всіх деталей </p>
                    <a href="/" className="QueueResultPanel__btn green-btn">Повернутися на головну</a>
                </div> }
            </div>
        </section>

    )

}

export default QueueResultPanel;