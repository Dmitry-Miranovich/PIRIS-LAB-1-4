import React, {useEffect} from "react"
import SideListHeader from "./SideListHeader";
import "../../../../../style/workerStyle.css"
import SideListBody from "./SideListBody";
import {Button} from "react-bootstrap";
import SideListFooter from "./SideListFooter";

const SideList = ({context})=>{
    return(
        <div className={"worker-sidelist"}>
            <SideListHeader/>
            <SideListBody context={context}/>
            <SideListFooter context={context.footerContext}/>
        </div>
    )
}

export default SideList