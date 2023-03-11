import React, {useEffect, useState} from "react";
import {ListGroup, Button} from "react-bootstrap";
import SideListTool from "./SideListTool";
import {userIcon, warningIcon, dashBoardIcon} from "../../../../../objects/icons";
import {ToolContext} from "../../../../../objects/contexts/ToolContext";
import workerService from "../../../../../services/WorkerHeaderService";
import {useNavigate, useLocation, useMatch, Routes, Route} from "react-router-dom"
import SideList from "./SideList";

const SideListBody = ({context})=>{
    const [tool, setTool] = useState({
        id: 1,
        name: context.names[0]
    })
    const navigate = useNavigate()
    const location = useLocation()
    const changeTool = (_id, _name)=>{
        setTool(prevState => ({
            ...prevState,
            id: _id,
            name: _name
        }))
    }
    function showTools(){
        return context.names.map((name, index)=>{
            return <SideListTool name={name} id={index+1} icon={context.icons[index]} key={index}/>
        })
    }
    useEffect(()=>{
       workerService.setTitle(tool.name)
        context.handler(tool.id)

    },[tool])

    return(
        <ToolContext.Provider value={{tool:{id: tool.id, name: tool.name},func: changeTool}}>
            <ListGroup variant={"flush"} className={"worker-sidelist-body"}>
                {showTools()}
            </ListGroup>
        </ToolContext.Provider>

    )
}

export default SideListBody