import React, {useEffect, useState} from "react";
import AreaHeader from "../../settings/AreaHeader";
import {Form} from "react-bootstrap";
import axios from "axios";
import {useParams} from "react-router-dom"
import CreditAccountHeader from "../components/CreditAccountHeader";
import CreditPage from "./CreditPage";
import CreditRow from "../components/CreditRow";

const CreditAccountPage = ()=>{

    const [accountID, setAccountID] = useState("Текущий счет")
    const {id} = useParams()
    const [accounts, setAccounts] = useState([])


    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/home/clients/${id}/credit`)
            .then(response=>{
                setAccounts(response.data)
                console.log(response.data)
            })
    },[])

    function getRows(){
        return accounts.map((elem, index)=>{
            if(elem.accountName === accountID)
            return <CreditRow data={elem} key={index}/>
        })
    }

    return(
        <div className={"worker-area account storage"}>
            <AreaHeader name={"Credit accounts"}/>
            <Form.Group className={"storage-filter"}>
                <Form.Select onChange={(e)=>{
                    setAccountID(e.target.options[e.target.selectedIndex].text)
                }}>
                    <option id={'credit-field-1'} value={1}>
                        Текущий счет
                    </option>
                    <option id={'credit-field-2'} value={2}>
                        Процентный счет
                    </option>
                </Form.Select>
            </Form.Group>
            <CreditAccountHeader/>
            {getRows()}
        </div>
    )
}

export default CreditAccountPage