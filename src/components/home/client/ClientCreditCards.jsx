import React, {useEffect, useState} from "react";
import AreaHeader from "../area/users/settings/AreaHeader";
import {Button, Form} from "react-bootstrap"
import {useNavigate, useLocation, useParams} from "react-router-dom"
import CreditCard from "./components/creditCard/CreditCard";
import axios from "axios";

const ClientCreditCards = ()=>{
    const {id} = useParams()

    const location = useLocation()
    const navigate = useNavigate()

    const [creditCard, setCreditCard] = useState()

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/client/${id}/creditCard/form`)
            .then(res=>{
                setCreditCard(res.data[0].creditCard)
            })
    },[])

    return(
        <div className={"worker-area"}>
            <div className={"worker-area-scene client creditCards"}>
                <div className={"client-area-header"}>
                    <h3>
                        Credit card
                    </h3>
                </div>
                {!!creditCard?(
                    <div style={{
                        display: "flex",
                        flexGrow: "1",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}>
                        <CreditCard context={creditCard}/>
                    </div>
                ):(
                    <div/>
                )}
            </div>
        </div>
    )
}

export default ClientCreditCards

// <Button type={"success"} onClick={()=>{
//     let path = location.pathname
//     navigate(`${path}/form`)
// }}>
// Add card
// </Button>