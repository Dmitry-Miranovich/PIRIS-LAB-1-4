import React from "react"
import {Button} from "react-bootstrap"
import {addClientIcon} from "../../../objects/icons";
import {useNavigate, useLocation} from "react-router-dom"

const WorkerAreaHeader = ()=>{

    const navigate = useNavigate()
    const location = useLocation()
    const onClickHandle = ()=>{
        navigate(`${location.pathname}/settings`)
    }

    return(
        <div className={"worker-area-user-header"}>
            <Button variant={"success"} onClick={onClickHandle}>
                {addClientIcon}
                Add client
            </Button>
        </div>
    )
}

export default WorkerAreaHeader