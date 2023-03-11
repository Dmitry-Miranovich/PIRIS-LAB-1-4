import React, {useContext} from "react"
import {Form} from "react-bootstrap"
import {UsersContext} from "../../../../../../objects/contexts/UsersContext";
import {SettingsUserContext} from "../../../../../../objects/contexts/SettingsUserContext";

const SettingsListField = ({name, data, defaultValue, handler, isValid, feedback, id})=>{

    const listData = ()=>{
        return data.map((elem, index)=>{
            return <option key={index} value={elem}>{elem}</option>
        })
    }

    // const listOnChangeHandler = (e)=>{
    //     const map = new Map([
    //         ["passport", ()=>{
    //             addPassportData(`${propertyValue}`, e.target.options[e.target.value].text)
    //         }],
    //         ["extra", ()=>{
    //         addExtraData(`${propertyValue}`, e.target.options[e.target.value].text)
    //         }]
    //     ])
    //     map.get(type).apply(null)
    // }

    return(
        <Form.Group className={"settings-field list"}>
            <Form.Label>{name}</Form.Label>
            <Form.Group id={"settings-list-field-main"}>
                <Form.Select id={id} onChange={handler} value={defaultValue} feedback={feedback} isValid={isValid}>
                    {listData()}
                </Form.Select>
            </Form.Group>
        </Form.Group>
    )
}

export default SettingsListField