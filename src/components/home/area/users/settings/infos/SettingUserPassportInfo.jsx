import React, {useContext, useEffect, useState} from "react";
import SettingsFieldHeader from "../components/SettingsFieldHeader";
import SettingsNameField from "../components/SettingsNameField";
import SettingsListField from "../components/SettingsListField";
import {cityData} from "../../../../../../objects/citiesData";
import axios from "axios";
import {SettingsUserContext} from "../../../../../../objects/contexts/SettingsUserContext";
import SettingsDateField from "../components/SettingsDateField";

const SettingsUserPassportInfo =({values,handler})=>{

    const [cities, setCities] = useState([])

    const {touched, errors, handleBlur} = useContext(SettingsUserContext)

    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/clientData/cities").then(
            (response)=>{
                const data = response.data
                setCities(data.map((city)=>{
                    return city.name
                }))
            }
        )
    },[])

    //todo add registrationDate
    return(
        <div className={"settings-info-box"}>
            <div className={"user-info passport"}>
                <SettingsFieldHeader name={"Passport"} />
                <SettingsNameField name={"Серия паспорта"} handler={handler} defaultValue={values.passportSeries} id={"passportSeries"} isValid={errors.passportSeries && touched.passportSeries} feedback={errors.passportSeries} handleBlur={handleBlur}/>
                <SettingsNameField name={"Номер паспорта"} handler={handler} defaultValue={values.passportID} id={"passportID"} isValid={errors.passportID && touched.passportID} feedback={errors.passportID}/>
                <SettingsNameField name={"Кем выдан"} handler={handler} defaultValue={values.issuePlace} id={"issuePlace"} isValid={errors.issuePlace && touched.issuePlace} feedback={errors.issuePlace}/>
                <SettingsNameField name={"Идентификационный номер"}  handler={handler} defaultValue={values.passportNumber} id={"passportNumber"} isValid={errors.passportNumber && touched.passportNumber} feedback={errors.passportNumber}/>
                <SettingsNameField name={"Место рождения"} defaultValue={values.birthPlace} id={"birthPlace"} isValid={errors.birthPlace && touched.birthPlace} feedback={errors.birthPlace} handler={handler}/>
                <SettingsDateField changeHandler={handler} name={"Дата регистрации"} id={"registration"} values={values} context={SettingsUserContext}/>
                <SettingsListField name={"Город фактического проживания"} defaultValue={values.registrationCity} data={cities} handler={handler} isValid={errors.registrationCity && touched.registrationCity} id={"registrationCity"}/>
                <SettingsNameField name={"Адрес фактического проживания "} handler={handler} defaultValue={values.registrationAddress} id={"registrationAddress"} isValid={errors.registrationAddress && touched.registrationAddress} feedback={errors.registrationAddress}/>
            </div>
        </div>
    )
}

export default SettingsUserPassportInfo