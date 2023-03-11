import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import "../../../../../style/workerStyle.css"
import SettingsUserPrivateInfo from "./infos/SettingsUserPrivateInfo";
import SettingsUserPassportInfo from "./infos/SettingUserPassportInfo";
import {SettingsUserContext} from "../../../../../objects/contexts/SettingsUserContext";
import User from "../../../../../objects/User";
import Passport from "../../../../../objects/user/Passport";
import Extra from "../../../../../objects/user/Extra";
import SettingsUserExtraInfo from "./infos/SettingsUserExtraInfo";
import AreaSettingsFooter from "./AreaSettingsFooter";
import {Form,Button} from "react-bootstrap"
import {schema} from "../../../../../objects/schemas/userSchema";
import {useFormik} from "formik";
import axios from "axios";
import AreaHeader from "./AreaHeader";
import {useNavigate, useLocation} from "react-router-dom"

const AreaSettings = ()=>{

    const [user] = useState({
        privateData: new User(),
        passportData: new Passport(),
        extraData: new Extra()
    })

    const history = useNavigate()
    const location = useLocation()

    const [updateTrigger, setUpdateTrigger] = useState(true)
    

    const {values, errors, touched, handleBlur, handleChange, handleSubmit}=useFormik({
        initialValues:{
            firstName: "",
            lastName: "",
            middleName: "",
            sex: "",
            birthDay: "",
            birthMonth: "",
            birthYear: "",
            birthDate: "",
            passportSeries: "",
            passportID: "",
            issuePlace: "",
            passportNumber: "",
            birthPlace: "",
            registrationDay: "",
            registrationMonth: "",
            registrationYear: "",
            registrationDate:"",
            registrationCity: "",
            registrationAddress: "",
            homePhone: "",
            mobilePhone: "",
            email: "",
            workPlace: "",
            workPost: "",
            city: "",
            address: "",
            maritalStatus: "",
            citizenship: "",
            disability: "",
            retiree: "",
            monthlyValue: "",
            conscripted: ""
        },
        validationSchema:schema,
        onSubmit:(values)=>{
            //date validation
            //todo Check for the correct dates
            const {birthDay, birthMonth, birthYear, registrationDay,registrationMonth,registrationYear} = values
            values.birthDate = new Date(`${birthYear}-${birthMonth}-${birthDay}`)
            values.registrationDate = new Date(`${registrationYear}-${registrationMonth}-${registrationDay}`)
            console.log(values)
            const user = {
                FCs: {
                    name: values.firstName,
                    surname: values.lastName,
                    middleName: values.middleName,
                },
                sex: values.sex,
                birthDate: values.birthDate,
                passport:{
                    passportSeries: values.passportSeries,
                    passportID: values.passportID,
                    issuePlace: values.issuePlace,
                    passportNumber: values.passportNumber,
                    birthPlace: values.birthPlace,
                    registrationDate: values.registrationDate,
                    registrationCity: values.registrationCity,
                    registrationAddress: values.registrationAddress,
                },
                extra:{
                    homePhone: values.homePhone,
                    mobilePhone: values.mobilePhone,
                    email: values.email,
                    workPlace: values.workPlace,
                    workPost: values.workPost,
                    city: values.city,
                    address: values.address,
                    maritalStatus: values.maritalStatus,
                    citizenship: values.citizenship,
                    disability: values.disability,
                    retiree: values.retiree,
                    monthlyValue: values.monthlyValue,
                    conscripted: values.conscripted
                }
            }
            axios.post("http://127.0.0.1:5000/home/clients", user)
                .then(response=>{
                    alert("Client succesfully created")
                }).catch(err=>{
                    alert(`${err.response.data.message}\n Code: ${err.response.status}`)
            })
        }
    })
//Client validation failed: FCs.surname: Path `FCs.surname` is required.
    useMemo(()=>{
        console.log(errors)
    },[])


    return(
            <SettingsUserContext.Provider value={{touched, errors, handleBlur}}>
                <Form className={"area-settings"} noValidate onSubmit={handleSubmit}>
                    <AreaHeader name={"Settings"}/>
                    <div className={"settings-scene"}>
                        <SettingsUserPrivateInfo values={values} handler={handleChange}/>
                        <SettingsUserPassportInfo values={values} handler={handleChange}/>
                        <SettingsUserExtraInfo values={values} handler={handleChange}/>
                    </div>
                    <AreaSettingsFooter/>
                </Form>
            </SettingsUserContext.Provider>
    )
}

export default AreaSettings