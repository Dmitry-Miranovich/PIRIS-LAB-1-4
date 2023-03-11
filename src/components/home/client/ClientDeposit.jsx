import React, {useEffect, useState} from "react";
import AreaHeader from "../area/users/settings/AreaHeader";
import {Form} from "react-bootstrap";
import ClientCreditAccountHeader from "./components/creditAccount/ClientCreditAccountHeader";
import {useParams} from "react-router-dom";
import ClientDepositAccountHeader from "./components/depositAccount/ClientDepositAccountHeader";
import ClientCreditAccountRow from "./components/creditAccount/ClientCreditAccountRow";
import ClientDepositAccountRow from "./components/depositAccount/ClientDepositAccountRow";
import axios from "axios";

const ClientDeposit = ()=>{

    const {id} = useParams()
    const [depositAccounts, setDepositAccount] = useState({
        currentAccounts:[],
        percentAccounts: []
    })
    const [accountID, setAccountID] = useState("1")

    function showRows(){
        console.log(depositAccounts)
        const map = new Map([
            ["1", () => {
                return depositAccounts.currentAccounts.map((elem, index) => {
                    if(elem){
                        return <ClientDepositAccountRow context={elem} key={index}/>
                    }

                })
            }],
            ["2", () => {
                return depositAccounts.percentAccounts.map((elem, index) => {
                    if(elem){
                        return <ClientDepositAccountRow context={elem} key={index}/>
                    }
                })
            }]
        ])
        return map.get(accountID).call(null)
    }

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/client/${id}/deposit`)
            .then(res=>{
                setDepositAccount(res.data)
            })
    },[])

    return(
        <div className={"worker-area"}>
            <div className={"worker-area-scene client deposit"}>
                <AreaHeader name={'Deposit accounts'}/>
                <Form.Group style={{
                    width: "200px",
                    margin: "5px 0 5px 0",
                }}>
                    <Form.Select onChange={(e)=>{
                        setAccountID(e.target.value)
                        console.log(depositAccounts)
                    }}>
                        <option id={"client-credit-option-1"} value={"1"}>Текущий счет</option>
                        <option id={"client-credit-option-2"} value={"2"}>Процентный счет</option>
                    </Form.Select>
                </Form.Group>
                <ClientDepositAccountHeader/>
            </div>
        </div>
    )
}

export default ClientDeposit