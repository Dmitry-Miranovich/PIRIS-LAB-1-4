import React, {useState} from "react";
import "../../style/loginStyle.css"
import {Form, Button} from "react-bootstrap";
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom"

const LoginPage = ()=>{

    const [user, setUser] = useState({
        number: "",
        password: ""
    })

    const location = useLocation()
    const navigate = useNavigate()

    const numberOnChangeHandler = (e)=>{
        setUser(prevState => ({
            ...prevState,
            number: e.target.value
        }))
    }
    const passwordOnChangeHandler = (e)=>{
        setUser(prevState => ({
            ...prevState,
            password: e.target.value
        }))
    }

    return(
        <div className={"login-page"}>
                <Form className={"login-page main"} onSubmit={()=>{

                }}>
                    <Form.Group className={"login-page main header"}>
                        <Form.Label>
                            Login
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className={"login-page main body"}>
                        <Form.Label>
                            Credit card number
                        </Form.Label>
                        <Form.Control value={user.number} type={"text"} name={"number"} onChange={numberOnChangeHandler}/>
                        <Form.Label>
                            Passport
                        </Form.Label>
                        <Form.Control value={user.passport} type={"password"} name={"password"} onChange={passwordOnChangeHandler}/>
                    </Form.Group>
                    <Form.Group className={"login-page main footer"}>
                        <Button onClick = {()=>{
                            axios.post("http://127.0.0.1:5000/login", {number: user.number,
                            password: user.password})
                                .then(res=>{
                                    console.log(res)
                                    let path = location.pathname.split("/")
                                    path.pop()
                                    path = path.join("/")
                                    navigate(`${path}/client/${res.data[0]._id}`)
                                })
                        }}>
                            Log in
                        </Button>
                    </Form.Group>
                </Form>
        </div>
    )
}

export default LoginPage