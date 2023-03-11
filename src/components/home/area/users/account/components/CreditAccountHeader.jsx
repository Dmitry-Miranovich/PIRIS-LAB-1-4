import React from "react";
import {Form} from "react-bootstrap";

const CreditAccountHeader = ()=>{
    return(
        <Form.Group className={"storage-credit-lists labels"}>
            <Form.Group className={"credit-list labels number"}>
                Номер счета
            </Form.Group>
            <Form.Group className={"credit-list labels ID"}>
                Код
            </Form.Group>
            <Form.Group className={"credit-list labels type"}>
                Тип
            </Form.Group>
            <Form.Group className={"credit-list labels startDate"}>
                Начало кредита
            </Form.Group>
            <Form.Group className={"credit-list labels endDate"}>
                Конец кредита
            </Form.Group>
            <Form.Group className={"credit-list labels percent"}>
                Процент
            </Form.Group>
            <Form.Group className={"credit-list labels money"}>
                Сумма
            </Form.Group>
            <Form.Group className={"credit-list labels debit"}>
                Дебит
            </Form.Group>
            <Form.Group className={"credit-list labels credit"}>
                Кредит
            </Form.Group>
            <Form.Group className={"credit-list labels balance"}>
                Сальдо
            </Form.Group>
        </Form.Group>
    )
}

export default CreditAccountHeader