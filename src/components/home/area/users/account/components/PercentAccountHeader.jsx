import React from "react";
import {Form} from "react-bootstrap";

const PercentAccountHeader =()=>{
    return(
        <Form.Group className={"storage-deposit-lists labels"}>
            <Form.Group className={"deposit-list percent labels number"}>
                Номер счета
            </Form.Group>
            <Form.Group className={"deposit-list percent labels ID"}>
                Код
            </Form.Group>
            <Form.Group className={"deposit-list percent labels startDate"}>
                Начало депозита
            </Form.Group>
            <Form.Group className={"deposit-list percent labels endDate"}>
                Конец депозита
            </Form.Group>
            <Form.Group className={"deposit-list percent labels percentValue"}>
                Процентная ставка
            </Form.Group>
            <Form.Group className={"deposit-list percent labels percentage"}>
                Отчисления
            </Form.Group>
            <Form.Group className={"deposit-list percent labels money"}>
                Сумма
            </Form.Group>
            <Form.Group className={"deposit-list percent labels collectedMoney"}>
                Накопления
            </Form.Group>
            <Form.Group className={"deposit-list percent labels balance"}>
                Сальдо
            </Form.Group>
        </Form.Group>
    )
}

export default PercentAccountHeader