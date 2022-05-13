import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import  Amplify from '@aws-amplify/core';
// import  config from './aws-exports';
// import  {DataStore} from '';



import './RegisterForm.scss';
//import awsExports from './aws-exports';


//Amplify.configure(awsExports);
const AWS_API="api755dfac9"
const path='/users'


const RegisterForm = ({setNumPlanet, onAddUser }) => {
    const [InputPhoneClass, SetInputPhoneClass]=useState("RegisterForm__input input-form")
    const [PlanetID, setPlanetID] =setNumPlanet
    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState(0);
  //  const [PlanetID, setPlanetID] = useState(0);
    let navigate = useNavigate();

    const PlanetChange = (e) => {
        setPlanetID(e.target.value)
    }
    const NameChange = (e) => {
        setUserName( e.target.value)
    };
    const PhoneChange = (e) => {
        setUserPhone(e.target.value)
    };


const checkPhoneNumber=(Phone)=>{
if (!Phone) return 0
const PhoneNum=Phone.replace(/[^\d]/g,"")

switch(PhoneNum.length) {
    case 10: if (PhoneNum[0]==0) {
        return  `+38 ${PhoneNum}`;
    } else {
        SetInputPhoneClass(`input-wrong ${InputPhoneClass}`)
        return 0;
    }
  
    case 12: 
    return   PhoneNum;
  
    default:
        SetInputPhoneClass(`input-wrong ${InputPhoneClass}`)
        return 0;
     
  }


}

    const handleSubmit = (e) => {
        e.preventDefault();
      //  onAddUser(NewUser)

const phone=checkPhoneNumber(userPhone)
console.log(phone)
if (phone!=0) {
//    API.get(AWS_API, path+"/"+userName).then((response) => {
//        console.log(response)

//    })
    console.log(userName)
    axios.post('http://localhost:3001/users',{
        Name: userName,
        phone: phone,
        planetID:  PlanetID,
        status: "waiting"
    } ).then(({data})=>{
       console.log(data);
        localStorage.setItem('userID', data.id)
        // let path = `/QueuePanel`;
        navigate(`/QueuePanel`);
   })
    SetInputPhoneClass("RegisterForm__input input-form")
}

    };

    return (
        <div className="RegisterForm__wrapper">
            <h2 className="RegisterForm__title">Електронна черга
                для польоту у космос</h2>
            <form className="RegisterForm" action="submit"
                onSubmit={handleSubmit}>
                <label className="RegisterForm__label" for="name">Імʼя</label>
                <input className="RegisterForm__input input-form"
                type="text" 
                onChange={NameChange}
                id="name" name="name" placeholder="Введіть імʼя" 
                required />
                <label className="RegisterForm__label" for="phone" required>Телефон</label>
                <input className={InputPhoneClass} type="tel" 
                id="phone"
                onChange={PhoneChange}
                    name="phone"
                    placeholder="+38 (_) __ __ __" required />
                <label className="RegisterForm__label" for="select">Планета</label>

                <select className="RegisterForm__input select input-form" name=""
                    id="select" required
                    onChange={PlanetChange}>
                    <option value="0" selected>Венера</option>
                    <option value="1">Земля</option>
                    <option value="2">Марс</option>
                    <option value="3">Меркурій</option>
                    <option value="4">Нептун</option>
                    <option value="5">Уран</option>
                </select>
                <button className="RegisterForm__button green-btn" type="submit">Зареєструватися</button>
            </form>
            <p className="admin-auth secondary-text">Якщо ви<a href="/RegisterAdmin" > адміністратор</a> увійдіть</p>
        </div>
    )

}

export default RegisterForm;