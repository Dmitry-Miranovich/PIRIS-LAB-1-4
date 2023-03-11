import React, {useContext} from "react"
import {ListGroup} from "react-bootstrap";
import {ToolContext} from "../../../../../objects/contexts/ToolContext";

const SideListTool = ({icon, name, id})=>{

    const {tool, func} = useContext(ToolContext)

    return(
            <ListGroup.Item className={"worker-sidelist-tool"} active={tool.id === id}
            onClick={()=>{
                func.call(null, id, name)
            }}>
                {icon}
                {name}
            </ListGroup.Item>
    )
}


export default SideListTool