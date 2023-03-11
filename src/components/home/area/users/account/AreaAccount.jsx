import React, {useEffect, useState} from "react";
import AreaHeader from "../settings/AreaHeader";
import {useParams, useNavigate, useLocation} from "react-router-dom"
import {Form, Button} from "react-bootstrap";
import axios from "axios";
const AreaAccount =()=>{

    const {id}=useParams()
    const [user,setUser]=useState({})
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/home/clients/${id}`)
            .then(res=>{
                setUser(res.data)
            })
    },[])
    return(
        <div className={"worker-area account"}>
            <AreaHeader name={"Account"}/>
            <p>
                {user?.FCs?.name}
            </p>
            <p>
                {user?.FCs?.surname}
            </p>
            <p>
                {user?.FCs?.middleName}
            </p>
            <Button variant={"success"} onClick={()=>{
                navigate(`${location.pathname}/deposit`)
            }}>
                Оформить депозитный вклад
            </Button>
            <Button variant={"success"} onClick={()=>{
                navigate(`${location.pathname}/deposit/account`)
            }}>
                Депозитные счета
            </Button>
            <Button variant={"success"} onClick={()=>{
                navigate(`${location.pathname}/credit`)
            }}>
                Оформить кредитный счет
            </Button>
            <Button variant={"success"} onClick={()=>{
                navigate(`${location.pathname}/credit/account`)
            }}>
                Кредитные счета
            </Button>
            <Button variant={"success"} onClick={()=>{
                navigate(`${location.pathname}/creditCard`)
            }}>
                Добавить кредитную карту
            </Button>
        </div>
    )
}

export default AreaAccount