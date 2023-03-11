import React from "react";
import {Button} from "react-bootstrap";
import axios from "axios";

const SideListFooter = ({context})=>{
    return(
        <div className={"worker-sidelist footer"}>
            <Button variant={"danger"} onClick={context.handler}>
                {context.name}
            </Button>
        </div>
    )
}

export default SideListFooter