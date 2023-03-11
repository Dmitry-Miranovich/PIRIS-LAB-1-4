import React from "react";
import {Form} from "react-bootstrap";

const DepositRow = ({data, accountID})=>{

    const {depositNumber, depositCode, depositAmount,depositStart,depositEnd, depositPercentAmount, depositPercent} = data

    return(
        <Form.Group className={"storage-deposit-lists fields"}>
            <Form.Group className={"deposit-list fields number"}>
                {depositNumber}
            </Form.Group>
            <Form.Group className={"deposit-list fields ID"}>
                {depositCode}
            </Form.Group>
            <Form.Group className={"deposit-list fields startDate"}>
                {depositStart}
            </Form.Group>
            <Form.Group className={"deposit-list fields endDate"}>
                {depositEnd}
            </Form.Group>
            <Form.Group className={"deposit-list fields percent"}>
                {`${depositPercent}%`}
            </Form.Group>
            <Form.Group className={"deposit-list fields money"}>
                {accountID==="Текущий счет"?depositAmount:depositPercentAmount}
            </Form.Group>
        </Form.Group>
    )
}

export default DepositRow