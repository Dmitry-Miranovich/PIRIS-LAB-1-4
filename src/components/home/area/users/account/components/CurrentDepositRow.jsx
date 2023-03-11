import React from "react";
import {Form} from "react-bootstrap";

const CurrentDepositRow = ({data})=>{

    const {depositNumber,depositCode, depositStart, depositEnd, depositAmount} = data

    return(
        <Form.Group className={"storage-deposit-lists fields"}>
            <Form.Group className={"deposit-list current fields number"}>
                {depositNumber}
            </Form.Group>
            <Form.Group className={"deposit-list current fields ID"}>
                {depositCode}
            </Form.Group>
            <Form.Group className={"deposit-list current fields startDate"}>
                {depositStart}
            </Form.Group>
            <Form.Group className={"deposit-list current fields endDate"}>
                {depositEnd}
            </Form.Group>
            <Form.Group className={"deposit-list current fields money"}>
                {depositAmount}
            </Form.Group>
        </Form.Group>
    )
}

export default CurrentDepositRow