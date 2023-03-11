import React, {useState} from "react";
import AreaHeader from "../../../area/users/settings/AreaHeader";
import AreaSettingsFooter from "../../../area/users/settings/AreaSettingsFooter";
import SettingsNameField from "../../../area/users/settings/components/SettingsNameField";
import {Button, CloseButton, Form} from "react-bootstrap";
import {useFormik} from "formik";
import {creditCardSchema} from "../../../../../objects/schemas/creditCardSchema";
import axios from "axios";
import {useParams, useLocation, useNavigate} from "react-router-dom"

const CreditCardForm = ()=>{

    const {id} = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues:{
            number: "",
            owner: "",
            code: "",
            month: "",
            year: "",
            password: ""
        },
        validationSchema: creditCardSchema,
        onSubmit:()=>{
            axios.post(`http://127.0.0.1:5000/client/${id}/creditCard/form`, {
                number: values.number,
                owner: values.owner,
                code: values.code,
                date:{
                    month: values.month,
                    year: values.year
                },
                password: values.password

            }).then(response=>{
                let path = location.pathname.split("/")
                path.pop()
                path = path.join("/")
                navigate(path)
            })
        }
    })



    return(
        <div className={"worker-area"}>
            <div className={"credit-card-form"}>

                <Form className={"credit-card-validate-form"} onSubmit={handleSubmit} style={{
                    flexGrow: "1"
                }}>
                    <div className={"credit-card-form-header"}>
                        <h3>
                            Create credit card
                        </h3>
                        <CloseButton onClick={()=>{
                            let path = location.pathname.split("/")
                            path.pop()
                            path = path.join("/")
                            navigate(`${path}`)
                        }}/>
                    </div>
                    <Form.Group className={"credit-card-form-body"}>
                        <Form.Group className={"form-body number"}>
                            <Form.Label>
                                Номер карты
                            </Form.Label>
                            <Form.Control type={"text"} maxLength={16} value={values.number} name={"number"} onChange={handleChange} isInvalid={errors.number && touched.number} onBlur={handleBlur}/>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.number}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"form-body owner"} >
                            <Form.Label>
                                Владелец
                            </Form.Label>
                            <Form.Control type={"text"} maxLength={100} value={values.owner} name={"owner"} onChange={handleChange} isInvalid={errors.owner && touched.owner} onBlur={handleBlur}/>
                        </Form.Group>
                        <Form.Group className={"form-body code"}>
                            <Form.Label>
                                CVC
                            </Form.Label>
                            <Form.Control type={"text"} maxLength={3} value={values.code} name={"code"} onChange={handleChange} isInvalid={errors.code && touched.code} onBlur={handleBlur}/>
                        </Form.Group>
                        <Form.Group className={"form-body password"}>
                            <Form.Label>
                                Пароль
                            </Form.Label>
                            <Form.Control type={"password"} maxLength={4} value={values.password} name={"password"} onChange={handleChange} isInvalid={errors.password && touched.password} onBlur={handleBlur}/>
                        </Form.Group>
                        <Form.Label>
                            Срок действия
                        </Form.Label>
                        <Form.Group className={"form-body date"}>
                            <Form.Group className={"form-body date month"}>
                                <Form.Control placeholder={"MM"} maxLength={2} value={values.month} name={"month"} onChange={handleChange} isInvalid={errors.month && touched.month} onBlur={handleBlur}/>
                            </Form.Group>
                            <p>
                                /
                            </p>
                            <Form.Group className={"form-body date year"} >
                                <Form.Control placeholder={"YY"} maxLength={2} value={values.year} name={"year"} onChange={handleChange} isInvalid={errors.year && touched.year} onBlur={handleBlur}/>
                            </Form.Group>
                        </Form.Group>
                    </Form.Group>
                    <Form.Group className={"credit-card-form-footer"}>
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

export default CreditCardForm