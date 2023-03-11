import React, {useContext, useEffect, useState} from "react";
import SettingsNameField from "../components/SettingsNameField";
import SettingsFieldHeader from "../components/SettingsFieldHeader";
import {Form} from "react-bootstrap"
import {SettingsUserContext} from "../../../../../../objects/contexts/SettingsUserContext";
import {sex} from "../../../../../../objects/user/userData";
import axios from "axios";
import SettingsCheckBoxField from "../components/SettingsCheckBoxField";
import SettingsDateField from "../components/SettingsDateField";
import MaskedFormControl from "../components/MaskedFormControl";


const SettingsUserPrivateInfo =({values,handler})=>{

    const {touched, errors, handleBlur} = useContext(SettingsUserContext)

    return(
        <div className={"settings-info-box"}>
            <div className={"user-info private"}>
                <SettingsFieldHeader name={"Private info"}/>
                <div className={"user-private-info first"}>
                    <SettingsNameField  name= "Имя" defaultValue={values.firstName} handler={handler} id={"firstName"} isValid={(errors.firstName && touched.firstName)} feedback={errors.firstName} handleBlur={handleBlur("firstName")}/>
                    <SettingsNameField defaultValue={values.lastName} name={"Фамилия"} handler={handler} id={"lastName"} isValid={errors.lastName && touched.lastName } feedback={errors.lastName} handleBlur={handleBlur("lastName")}/>
                    <SettingsNameField name={"Middle name"} defaultValue={values.middleName} handler={handler} id={"middleName"} isValid={errors.middleName && touched.middleName} feedback={errors.middleName} handleBlur={handleBlur("middleName")}/>
                    <SettingsCheckBoxField name={"Пол"} id={"sex"} defaultValue={values.sex} onChange={handler} onBlur={handleBlur} feedback={errors.sex} isInvalid={errors.sex && touched.sex} labels={sex}/>
                    <SettingsDateField name={"Дата рождения"} changeHandler={handler} id={"birth"} values={values} context={SettingsUserContext}/>

                </div>
            </div>
        </div>
    )
}

export default SettingsUserPrivateInfo

// <Form.Check type={"radio"} inline={true} label={"male"} name={"group1"} id={"user-sex-1"} value={"male"} onChange={fun}/>
// <Form.Check type={"radio"} inline={true} label={"female"} name={"group1"} id={"user-sex-2"} value={"female"} onChange={fun}/>
// <div className={"user-private-info-date"}>
//     <SettingsNameField defaultValue={values.birthDay} name={"DD"} id={"birthDay"} handler={handler} isValid={errors.birthDay}/>
// <SettingsNameField defaultValue={values.birthMonth} name={"MM"} id={"birthMonth"} handler={handler} isValid={!!errors.birthMonth}/>
// <SettingsNameField defaultValue={values.birthYear} name={"YY"} id={"birthYear"} handler={handler} isValid={errors.birthYear}/>
// </div>