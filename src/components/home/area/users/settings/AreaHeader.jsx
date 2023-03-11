import React from "react";
import {CloseButton} from "react-bootstrap";
import {useNavigate, useLocation} from "react-router-dom"

const AreaHeader = ({name})=>{
    const navigate = useNavigate()
    const location = useLocation()
    const closeOnClickHandler = ()=>{
        let pathElements = location.pathname.split("/")
        pathElements.pop()
        const newPath = pathElements.join("/")
        navigate(newPath)
    }
    return(
        <div className={"area-settings-header"}>
            {name}
            <div className={"area-settings-header-content"}>
                <CloseButton onClick={closeOnClickHandler}/>
            </div>
        </div>

    )
}

export default AreaHeader