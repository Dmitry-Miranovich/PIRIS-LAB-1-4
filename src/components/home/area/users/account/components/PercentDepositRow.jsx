import React from "react";
import {Form} from "react-bootstrap";

const PercentDepositRow = ({data})=>{
    const {depositNumber,depositCode,depositStart,depositEnd,depositPercentage,
        depositAmount,percentage, balance, collectedMoney} = data
    return(
        <Form.Group className={"storage-deposit-lists fields"}>
            <Form.Group className={"deposit-list percent fields number"}>
                {depositNumber}
            </Form.Group>
            <Form.Group className={"deposit-list percent fields ID"}>
                {depositCode}
            </Form.Group>
            <Form.Group className={"deposit-list percent fields startDate"}>
                {depositStart}
            </Form.Group>
            <Form.Group className={"deposit-list percent fields endDate"}>
                {depositEnd}
            </Form.Group>
            <Form.Group className={"deposit-list percent fields percentValue"}>
                {`${depositPercentage}%`}
            </Form.Group>
            <Form.Group className={"deposit-list percent fields percentage"}>
                {percentage}
            </Form.Group>
            <Form.Group className={"deposit-list percent fields money"}>
                {depositAmount}
            </Form.Group>
            <Form.Group className={"deposit-list percent fields collectedMoney"}>
                {collectedMoney}
            </Form.Group>
            <Form.Group className={"deposit-list percent fields balance"}>
                {balance}
            </Form.Group>
        </Form.Group>
    )
}

export default PercentDepositRow