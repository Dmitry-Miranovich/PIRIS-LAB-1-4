import React, {useEffect, useState} from "react";
import AreaHeader from "../area/users/settings/AreaHeader";
import {Form} from "react-bootstrap"
import ClientCreditAccountHeader from "./components/creditAccount/ClientCreditAccountHeader";
import axios from "axios";
import {useParams, useLocation, useNavigate} from "react-router-dom"
import ClientCreditAccountRow from "./components/creditAccount/ClientCreditAccountRow";

const ClientCredit = ()=>{

    const {id} = useParams()
    const [creditAccounts, setCreditAccount] = useState({
        currentAccounts:[],
        percentAccounts: []
    })
    const [accountID, setAccountID] = useState("1")

    function showRows() {
        console.log(creditAccounts)
        const map = new Map([
            ["1", () => {
                return creditAccounts.currentAccounts.map((elem, index) => {
                    if(elem){
                        return <ClientCreditAccountRow context={elem} key={index}/>
                    }

                })
            }],
            ["2", () => {
                return creditAccounts.percentAccounts.map((elem, index) => {
                    if(elem){
                        return <ClientCreditAccountRow context={elem} key={index}/>
                    }
                })
            }]
        ])
        return map.get(accountID).call(null)
    }

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/client/${id}/credit`)
            .then(res=>{
                setCreditAccount(res.data)
            })
    },[])

    return(
        <div className={"worker-area"}>
            <div className={"worker-area-scene client credit"}>
                <AreaHeader name={'Credit accounts'}/>
                <Form.Group style={{
                    width: "200px",
                    margin: "5px 0 5px 0",
                }}>
                    <Form.Select onChange={(e)=>{
                        setAccountID(e.target.value)
                        console.log(creditAccounts)
                    }}>
                        <option id={"client-credit-option-1"} value={"1"}>Текущий счет</option>
                        <option id={"client-credit-option-2"} value={"2"}>Процентный счет</option>
                    </Form.Select>
                </Form.Group>
                <ClientCreditAccountHeader/>
                {showRows()}
            </div>
        </div>
    )
}

export default ClientCredit