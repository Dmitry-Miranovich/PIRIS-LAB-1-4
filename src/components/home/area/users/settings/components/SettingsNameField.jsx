import React, {useContext, useEffect} from "react";
import AreaSettingsHeader from "../AreaHeader";
import {Form} from "react-bootstrap";
import "../../../../../../style/workerStyle.css"
import {SettingsUserContext} from "../../../../../../objects/contexts/SettingsUserContext";

const SettingsNameField = ({name ,defaultValue,handler, id, isValid, feedback, handleBlur})=>{

    //const {addUserProperty, addPassportData,addAddressData, addUserBirthDate, addExtraData} = useContext(SettingsUserContext)

    /**
     *
     * @param {Event} e
     */
    // const onChangeHandler = (e)=>{
    //     switch(type){
    //         case "FCs":{
    //             addUserProperty(`${value}`,e.target.value)
    //             break
    //         }
    //         case "passport":{
    //             addPassportData(`${value}`,e.target.value)
    //             break
    //         }
    //         case "address":{
    //             addAddressData(`${value}`,e.target.value)
    //             break
    //         }
    //         case "birthDate":{
    //             addUserBirthDate(`${value}`, e.target.value)
    //             break
    //         }
    //         case "extra":{
    //             addExtraData(`${value}`, e.target.value)
    //             break
    //         }
    //     }
    // }



    return(
        <Form.Group className={"settings-field name"}>
            <Form.Label>{name}</Form.Label>
            <Form.Control type={"input"} value={defaultValue} onChange={handler} id={id}
            isInvalid={isValid} onBlur={handleBlur}/>
            <Form.Control.Feedback type={"invalid"}>
                {feedback}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default SettingsNameField