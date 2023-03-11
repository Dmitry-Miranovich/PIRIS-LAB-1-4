import React, {useEffect, useState} from "react"
import AreaHeader from "../../settings/AreaHeader";
import {Form} from "react-bootstrap";
import {useParams} from "react-router-dom"
import axios from "axios";
import DepositRow from "../components/DepositRow";
import CurrentAccountHeader from "../components/CurrentAccountHeader";
import PercentAccountHeader from "../components/PercentAccountHeader";
import PercentDepositRow from "../components/PercentDepositRow";
import CurrentDepositRow from "../components/CurrentDepositRow";

const DepositAccountPage =()=>{

    const [accountID, setAccountID] = useState("1")
    const [accounts, setAccounts] = useState({
        currentAccounts:[],
        percentAccounts: []
    })
    const {id} = useParams()
    function f1(){
        return accounts?.percentAccounts.map((accounts, index)=>{
            return <PercentDepositRow data={accounts} key={index}/>
        })
    }
    function f2(){
        return accounts?.currentAccounts.map((accounts, index)=>{
            return <CurrentDepositRow data={accounts} key={index}/>
        })
    }
    const accountHeaders = new Map([
        ["1", <Form.Group>
            <CurrentAccountHeader/>
            {f2()}
        </Form.Group> ],
        ["2",<Form.Group>
            <PercentAccountHeader/>
            {f1()}
            </Form.Group>
        ]
    ])

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/home/clients/${id}/accounts`)
            .then(response=>{
                setAccounts(prevState => ({
                    ...prevState,
                    currentAccounts:response.data.message.currentAccounts,
                    percentAccounts: response.data.message.percentAccounts
                }))
                console.log(response)
            })
    },[])


    return(
        <div className={"worker-area account storage"}>
            <AreaHeader name={"Deposit accounts"}/>
            <Form.Group className={"storage-filter"}>
                <Form.Select onChange={(e)=>{
                    setAccountID(e.target.value)
                    console.log(e.target.value)
                }}>
                    <option id={'deposit-filted-1'} value={1}>
                        Текущий счет
                    </option>
                    <option id={'deposit-filted-2'} value={2}>
                        Процентный счет
                    </option>
                </Form.Select>
            </Form.Group>
            {accountHeaders.get(accountID)}
        </div>
    )
}

export default DepositAccountPage