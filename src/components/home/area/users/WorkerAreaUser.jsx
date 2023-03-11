import React from "react"
import "../../../../style/workerStyle.css"
import {Row, Col, Form} from "react-bootstrap";
import CustomRadioUserColumn from "./columns/CustomRadioUserColumn";
import CustomUserNameColumn from "./columns/CustomUserNameColumn";
import CustomUserPlaceHolder from "./columns/CustomUserPlaceHolder";
import CustomUserDateColumn from "./columns/CustomUserDateColumn";
import CustomUserSettingsColumn from "./columns/CustomUserSettingsColumn";

const WorkerAreaUser = ({userName, user})=>{
    return(
            <div className={"worker-area-user"}>
                <CustomRadioUserColumn child={"first"}/>
                <CustomUserNameColumn child={"second"} name={`${user.FCs?.name} ${user.FCs?.surname} ${user.FCs?.middleName}`}/>
                <CustomUserDateColumn child={"third"}/>
                <CustomUserPlaceHolder child={"forth"}/>
                <CustomUserSettingsColumn child={"fifth"} value={user}/>
            </div>
    )
}

export default WorkerAreaUser

/*
<Col className={"area-user-column first"} >
                    <Form.Check type={"radio"} className={"area-user-column-radio"}/>
                </Col>
                <Col className={"area-user-column second"}>
                    2
                </Col>
                <Col className={"area-user-column"}>
                    3
                </Col>
                <Col className={"area-user-column"}>
                    4
                </Col>
                <Col className={"area-user-column"}>
                    5
                </Col>
 */