import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {DataBaseLink} from '../../Host.js'

import './RegisterAdmin.scss';

const RegisterAdmin = () => {
    const [isRegister, SetIsRegister] = useState(true)
    const [isRegistered, SetIsRegistered] = useState(false)
    const [InputPhoneClass, SetInputPhoneClass]=useState("RegisterAdmin__input input-form")
    const [AdminName, setAdminName] = useState("");
    const [AdminPhone, setAdminPhone] = useState(0);

  const navigate = useNavigate();

  const loginPanel=()=>{
SetIsRegister(!isRegister)
SetIsRegistered(false)
  }

  const CheckRegister=(data)=>{
      let register=false
    data.forEach((el)=>{
        if (el.name==AdminName) {
           const phone= checkPhoneNumber(AdminPhone)
 
            if (el.phone==phone) {
            //  console.log(el.name,"==",AdminName,"||||", el.phone,"==",phone)
                register= true
            }
        }
      
    })
    console.log(register)
    return register
  }

    const handleSubmit = (e) => {
        e.preventDefault();

        const phone=checkPhoneNumber(AdminPhone)

        if (phone!=0) {
            axios.get(`${DataBaseLink}administrators`).then(({data}) =>{
        if (isRegister) {
            if (!CheckRegister(data)) {
                axios.post(`${DataBaseLink}administrators`,{
                name: AdminName,
                phone:phone
            } ).then(({data})=>{
                console.log(data);
            
           //    let path = `/AdminPanel`;
             navigate(`/AdminPanel`);
            })
            } else {
                SetIsRegistered(true)
            }
        } else {
            if (CheckRegister(data)) {
                navigate(`/AdminPanel`);
            } else{

            }
        }
          
                })
            SetInputPhoneClass("RegisterAdmin__input input-form")
        }
        
    }

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
        
    return (
        <div className="RegisterAdmin">
            <div className="RegisterAdmin__container">
                <h1 className="RegisterAdmin__title Title-font">
                    {isRegister ? "?????????????????????????????? ???? ??????????????????????????" :
                        "???????????? ???? ??????????????????????????"}
                </h1>
                <p className="RegisterAdmin__sub-title secondary-text">{isRegister ? "?????? ???????????????????????????" : "?????????? ?????????????????"}
                    <button onClick={loginPanel}>{isRegister ? "????????????????" : "????????????????????????????"}</button>
                </p>
           {   isRegistered ?  <p className="RegisterAdmin__sub-title error-text">?????? ??????????????????????????</p> : <p></p>}
                <form className="RegisterAdmin__form" onSubmit={handleSubmit}>
                    <label className="RegisterAdmin__label label-text" for="name">????????</label>
                    <input className="RegisterAdmin__input input-form" type="text" 
                       onChange={(e)=>setAdminName( e.target.value)}
                    id="name" 
                    name="name" 
                    placeholder="?????????????? ????????" required />
                    <label className="RegisterAdmin__label label-text" for="phone" required>??????????????</label>
                    <input className={InputPhoneClass} type="tel" 
                      onChange={(e)=>  setAdminPhone(e.target.value)}
                    id="phone"
                        name="phone"
                        placeholder="+38 (_) __ __ __" required />
                    <button class="RegisterAdmin__button green-btn">{isRegister ? "??????????????????????????????" : "????????????"}</button>
                </form>
            </div>
        </div>
    )

}

export default RegisterAdmin;