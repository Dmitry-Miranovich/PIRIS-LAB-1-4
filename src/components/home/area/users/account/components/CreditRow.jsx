import React from "react";
import {Form} from "react-bootstrap";

const CreditRow = ({data})=>{
    return(
        <Form.Group className={"storage-credit-lists fields"}>
            <Form.Group className={"credit-list field number"}>
                {data.creditNumber}
            </Form.Group>
            <Form.Group className={"credit-list field ID"}>
                {data.creditCode}
            </Form.Group>
            <Form.Group className={"credit-list field type"}>
                {data.creditType.type}
            </Form.Group>
            <Form.Group className={"credit-list field startDate"}>
                {new Date(data.startDate).toDateString()}
            </Form.Group>
            <Form.Group className={"credit-list field endDate"}>
                {new Date(data.endDate).toDateString()}
            </Form.Group>
            <Form.Group className={"credit-list field percent"}>
                {data.creditPercent}
            </Form.Group>
            <Form.Group className={"credit-list field money"}>
                {data.creditAmount}
            </Form.Group>
            <Form.Group className={"credit-list field debit"}>
                {data.debit}
            </Form.Group>
            <Form.Group className={"credit-list field credit"}>
                {data.credit}
            </Form.Group>
            <Form.Group className={"credit-list field balance"}>
                {data.balance}
            </Form.Group>
        </Form.Group>
    )
}

export default CreditRow