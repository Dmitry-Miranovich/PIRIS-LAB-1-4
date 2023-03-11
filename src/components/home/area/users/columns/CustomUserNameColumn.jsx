import React from "react"
import {Form} from "react-bootstrap"
const CustomUserNameColumn = ({child,name})=>{
    return(
        <div className={`area-user-column ${child}`}>
            {name}
        </div>
    )
}

export default CustomUserNameColumn