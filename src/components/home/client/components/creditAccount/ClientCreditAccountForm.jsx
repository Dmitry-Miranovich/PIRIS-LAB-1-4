import React, {useEffect, useState} from "react"
import AreaHeader from "../../../area/users/settings/AreaHeader";
import {Form, Button, CloseButton} from "react-bootstrap";
import AreaSettingsFooter from "../../../area/users/settings/AreaSettingsFooter";
import {useLocation, useNavigate, useParams} from "react-router-dom"
import * as yup from "yup"
import axios from "axios";

const ClientCreditAccountForm = ()=>{

    const location = useLocation()
    const navigate = useNavigate()
    const {creditID, id} = useParams()

    const [cardData, setCardData]= useState({
        card: "undef",
        sum: "",
        password: ""
    })

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/client/${id}/creditCard/form`)
            .then(res=>{
                setCardData(prevState => ({
                    ...prevState,
                    card: res.data[0].creditCard
                }))
            })
    },[])

    const sumOnChangeHandler = (e)=>{
        setCardData(prevState => ({
            ...prevState,
            sum: e.target.value
        }))
    }

    const passwordOnChangeHandler = (e)=>{
        setCardData(prevState => ({
            ...prevState,
            password: e.target.value
        }))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post(`http://127.0.0.1:5000/client/${id}/credit/${creditID}/form`, cardData)
            .then(res=>{
                alert(res.data.message)
                let path = location.pathname.split("/")
                path.pop()
                path = path.join("/")
                navigate(`${path}`)
            }).catch(err=>{
                console.log(err)
                alert(err.response.data.message)
        })
    }

    return(
        <div className={"worker-area"}>
            <div className={"client-credit-account-form"}>
                <Form style={{
                    flexGrow: "1",
                    padding: "10px"
                }} onSubmit={handleSubmit}>
                    <div className={"client-credit-account-form-header"}>
                        <h3>
                            Снять деньги
                        </h3>
                        <CloseButton onClick={()=>{
                            let path = location.pathname.split("/")
                            path.pop()
                            path = path.join("/")
                            navigate(`${path}`)
                        }}/>
                    </div>
                    <Form.Group  className={"client-credit-account-form-body"}>
                        <Form.Group className={"client-credit-account-form-body-fields"}>
                            <Form.Label>
                                Карта
                            </Form.Label>
                            <Form.Control defaultValue={cardData?.card?.number} readOnly/>
                        </Form.Group>
                        <Form.Group className={"client-credit-account-form-body-fields"}>
                            <Form.Label>
                                Сумма
                            </Form.Label>
                            <Form.Control value={cardData.sum} onChange={sumOnChangeHandler}/>
                        </Form.Group>
                        <Form.Group className={"client-credit-account-form-body-fields"}>
                            <Form.Label>
                                Пароль
                            </Form.Label>
                            <Form.Control type={'password'} value={cardData.password} onChange={passwordOnChangeHandler}/>
                        </Form.Group>
                    </Form.Group>
                    <Form.Group className={"client-credit-account-form-footer"}>
                        <Button type={"submit"} variant={"success"}>
                            Submit
                        </Button>
                        <Button variant={"danger"}>
                            Decline
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default ClientCreditAccountForm