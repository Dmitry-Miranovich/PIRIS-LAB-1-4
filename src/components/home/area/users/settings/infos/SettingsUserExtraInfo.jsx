import React, {useContext, useEffect, useState} from "react";
import SettingsFieldHeader from "../components/SettingsFieldHeader";
import SettingsNameField from "../components/SettingsNameField";
import SettingsListField from "../components/SettingsListField";
import {cityData} from "../../../../../../objects/citiesData";
import * as userData from "../../../../../../objects/user/userData"
import SettingsCheckBoxField from "../components/SettingsCheckBoxField";
import axios from "axios";
import {conscripted} from "../../../../../../objects/user/userData";
import {Form} from "react-bootstrap";
import MaskedFormControl from "../components/MaskedFormControl";
import {SettingsUserContext} from "../../../../../../objects/contexts/SettingsUserContext";

const SettingsUserExtraInfo =({values, handler})=>{

    const {errors, touched, handleBlur}=useContext(SettingsUserContext)

    const [extraData, setExtraData] = useState({
        cities: [],
        maritalStatus: [],
        disability: [],
        citizenship: []
    })

    useEffect(()=>{
        getExtraData().then(res=>{
            console.log("request complete")
        })
    },[])

    async function getExtraData() {
        await axios.get("http://127.0.0.1:5000/clientData/cities").then(
            (response)=>{
                const data = response.data
                setExtraData(prevState => ({
                    ...prevState,
                    cities: data.map(city=>{
                        return city.name
                    })
                }))
            }
        )
        await axios.get("http://127.0.0.1:5000/clientData/citizenship").then(
            (response)=>{
                const data = response.data
                setExtraData(prevState => ({
                    ...prevState,
                    citizenship: data.map(citizenship=>{
                        return citizenship.name
                    })
                }))
            }
        )
        await axios.get("http://127.0.0.1:5000/clientData/disability").then(
            (response)=>{
                const data = response.data
                setExtraData(prevState => ({
                    ...prevState,
                    disability: data.map(disability=>{
                        return disability.name
                    })
                }))
            }
        )
        await axios.get("http://127.0.0.1:5000/clientData/maritalStatus").then(
            (response)=>{
                const data = response.data
                setExtraData(prevState => ({
                    ...prevState,
                    maritalStatus: data.map(status=>{
                        return status.name
                    })
                }))
            }
        )
    }


    return(
        <div className={"settings-info-box"}>
            <div className={"user-info extra"}>
                <SettingsFieldHeader name={"Extra"}/>
                <Form.Group>
                    <Form.Label>Телефон домашний</Form.Label>
                    <MaskedFormControl
                        mask="+80 (177) 999-999"
                        onChange={handler}
                        value={values.homePhone}
                        onBlur={handleBlur}
                        id={"homePhone"}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Телефон мобильный</Form.Label>
                    <MaskedFormControl
                        mask="+375 (99) 999-9999"
                        onChange={handler}
                        value={values.mobilePhone}
                        onBlur={handleBlur}
                        id={"mobilePhone"}
                        required
                    />
                </Form.Group>
                <SettingsNameField name={"E-mail"}  defaultValue={values.email} handler={handler} handleBlur={handleBlur("email")} id={"email"} isValid={errors.email && touched.email} feedback={errors.email}/>
                <SettingsNameField name={"Место работы"} defaultValue={values.workPlace} handler={handler} handleBlur={handleBlur("workPlace")} id={"workPlace"} isValid={errors.workPlace && touched.workPlace} feedback={errors.workPlace}/>
                <SettingsNameField name={"Должность"} defaultValue={values.workPost} handler={handler} handleBlur={handleBlur("workPost")} id={"workPost"} isValid={errors.workPost && touched.workPost} feedback={errors.workPost}/>
                <SettingsListField name={"Город прописки"} data={extraData.cities} defaultValue={values.city} handler={handler} isValid={errors.city && touched.city} id={"city"} feedback={errors.city}/>
                <SettingsNameField name={"Адрес прописки"}  defaultValue={values.address} handler={handler} handleBlur={handleBlur("address")} id={"address"} isValid={errors.address && touched.address} feedback={errors.address}/>
                <SettingsListField name={"Семейное положение"} defaultValue={values.maritalStatus} handler={handler} isValid={errors.maritalStatus && touched.maritalStatus} id={"maritalStatus"} data={extraData.maritalStatus}/>
                <SettingsListField name={"Гражданство"} defaultValue={values.citizenship} handler={handler} isValid={errors.citizenship && touched.citizenship} id={"citizenship"}  data={extraData.citizenship}/>
                <SettingsCheckBoxField name={"Пенсионер"} labels={userData.retiree} defaultValue={values.retiree} id={"retiree"} onChange={handler} onBlur={handleBlur} isInvalid={errors.retiree && touched.retiree} feedback={errors.retiree}/>
                <SettingsListField name={"Инвалидность"} type={"extra"} defaultValue={values.disability} handler={handler} isValid={errors.disability && touched.disability} id={"disability"} data={extraData.disability}/>
                <SettingsNameField name={"Ежемесячный доход"}  defaultValue={values.monthlyValue} handleBlur={handleBlur} isValid={errors.monthlyValue && touched.monthlyValue} id={"monthlyValue"} handler={handler} feedback={errors.monthlyValue}/>
                <SettingsCheckBoxField name={"Военнообязаный"} defaultValue={values.conscripted} id={"conscripted"} onChange={handler} onBlur={handleBlur} isInvalid={errors.conscripted && touched.conscripted} feedback={errors.conscripted} labels={conscripted}/>
            </div>
        </div>
    )
}

export default SettingsUserExtraInfo

//<SettingsNameField name={"Телефон домашний"} type={"extra"} value={"homePhone"}/>