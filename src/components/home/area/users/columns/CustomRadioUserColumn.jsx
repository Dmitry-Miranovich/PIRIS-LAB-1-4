import React from "react"
import {Form} from "react-bootstrap"
const CustomRadioUserColumn = ({child})=>{
    return(
        <div className={`area-user-column ${child}`}>
            <Form.Check type={"checkbox"}/>
        </div>
    )
}

export default CustomRadioUserColumn