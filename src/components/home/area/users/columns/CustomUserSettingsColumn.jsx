import React from "react"
import {Form} from "react-bootstrap"
import {settingsIcon} from "../../../../../objects/icons";
import {useLocation, useNavigate} from "react-router-dom"

const CustomUserSettingsColumn = ({child, value})=>{

    const navigate = useNavigate()
    const location = useLocation()

    return(
        <div className={`area-user-column ${child}`} onClick={()=>{
            navigate(`${location.pathname}/${value._id}`)
        }}>
            {settingsIcon}
        </div>
    )
}

export default CustomUserSettingsColumn