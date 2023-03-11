import React, {useContext, useState} from "react";
import {Form} from "react-bootstrap"
import {SettingsUserContext} from "../../../../../../objects/contexts/SettingsUserContext";

const SettingsCheckBoxField = ({name, labels, id, onChange, onBlur, isInvalid, feedback, defaultValue})=>{

    //const {addExtraData,addUserProperty}= useContext(SettingsUserContext)

    const [checkBoxIndex, setCheckBoxIndex] = useState(-1)

    // function checkBoxOnChangeHandler(e){
    //     console.log(checkBoxIndex)
    //     const map = new Map([
    //         ["private", ()=>{
    //             addUserProperty(`${propertyValue}`, e.target.value)
    //         }],
    //         ["extra", ()=>{
    //         addExtraData(`${propertyValue}`, e.target.value)
    //         }]
    //     ])
    //     map.get(group).apply(null)
    //     setCheckBoxIndex(e.target.value)
    // }

    return(
        <div className={"settings-field checkbox"}>
            <p>
                {name}
            </p>
            {labels.map((label, index)=>{
                return <Form.Check type={"radio"}  inline={true} label={label} key={index}
                 id={id} value={label} onChange={onChange} feedback={feedback} isInvalid={isInvalid}
                checked={defaultValue === label} onBlur={onBlur}/>
            })}
        </div>
    )
}

export default SettingsCheckBoxField