import React, {useContext} from "react"
import {Form} from "react-bootstrap"
import {SettingsUserContext} from "../../../../../../objects/contexts/SettingsUserContext";

const SettingsDateField = ({name, changeHandler, values, id, context})=>{

    const {touched, errors, handleBlur} = useContext(context)
    return(
        <Form.Group className={"settings-field date"}>
            <Form.Label>{name}</Form.Label>
            <div className={"settings-field date scene"}>
                <div className={"settings-field date scene box"}>
                    <Form.Label>DD</Form.Label>
                    <Form.Control type={"input"} id={`${id}Day`} onChange={changeHandler} values={values[`${id}Day`]}
                                  isInvalid={errors[`${id}Day`] && touched[`${id}Day`]} onBlur={handleBlur}/>
                </div>
                <div className={"settings-field date scene box"}>
                    <Form.Label>MM</Form.Label>
                    <Form.Control type={"input"} id={`${id}Month`} onChange={changeHandler} values={values[`${id}Month`]}
                                  isInvalid={errors[`${id}Month`] && touched[`${id}Month`]} onBlur={handleBlur}/>
                </div>
                <Form.Group className={"settings-field date scene box"}>
                    <Form.Label>YY</Form.Label>
                    <Form.Control type={"input"} id={`${id}Year`} onChange={changeHandler} value={values[`${id}Year`]}
                                  isInvalid={errors[`${id}Year`] && touched[`${id}Year`]} onBlur={handleBlur}/>

                </Form.Group>
            </div>
            <Form.Control.Feedback type={"invalid"}>
                {errors[`${id}Date`]}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default SettingsDateField