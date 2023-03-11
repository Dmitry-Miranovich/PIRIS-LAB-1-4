import React from "react";
import {Form} from "react-bootstrap";

const CurrentAccountHeader = ()=>{
    return(
        <Form.Group className={"storage-deposit-lists labels"}>
            <Form.Group className={"deposit-list current labels number"}>
                Номер счета
            </Form.Group>
            <Form.Group className={"deposit-list current labels ID"}>
                Код
            </Form.Group>
            <Form.Group className={"deposit-list current labels startDate"}>
                Начало депозита
            </Form.Group>
            <Form.Group className={"deposit-list current labels endDate"}>
                Конец депозита
            </Form.Group>
            <Form.Group className={"deposit-list current labels money"}>
                Сумма
            </Form.Group>
        </Form.Group>
    )
}

export default CurrentAccountHeader