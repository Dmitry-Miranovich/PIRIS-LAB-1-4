import React from "react"
import {Form} from "react-bootstrap";

const CreditCard = ({context})=>{
    return(
        <div className={"client-area-body"}>
            <div className={"credit-card front"}>
                <div className={"credit-card-body"}>
                    <Form.Group className={"credit-card-field holder"}>
                        <Form.Control value={context.owner} placeholder={"Holder"} readOnly/>
                    </Form.Group>
                    <Form.Group className={"credit-card-field number"}>
                        <Form.Control value={context.number} placeholder={"Number of card"} readOnly/>
                    </Form.Group>
                    <Form.Label>
                        Valid THRU
                    </Form.Label>
                </div>
                <div className={"credit-card-footer"}>
                    <Form.Group className={"credit-card-field date month"}>
                        <Form.Control placeholder={"MM"} value={context.date.month} readOnly/>
                    </Form.Group>
                    <p>
                        /
                    </p>
                    <Form.Group className={"credit-card-field date year"}>
                        <Form.Control placeholder={"YY"} value={context.date.year} readOnly/>
                    </Form.Group>
                </div>
            </div>
            <div className={"credit-card back"}>
                <div className={"back-stripe"}>
                </div>
                <Form.Group className={"credit-card-code"}>
                    <Form.Control placeholder={"CVC"} type={"password"} value={context.code} maxLength={3} readOnly/>
                </Form.Group>
            </div>
            <div className={"credit-card-balance"}>
                <h3>
                    Card info
                </h3>
                <Form.Group className={"balance-info"}>
                    <Form.Group className={"balance-info-field"}>
                        <Form.Label>
                            Баланс
                        </Form.Label>
                        <Form.Control value={context.balance} readOnly/>
                    </Form.Group>
                    <Form.Group className={"balance-info-field"}>
                        <Form.Label>
                            Полученные средства
                        </Form.Label>
                        <Form.Control value={context.debit} readOnly/>
                    </Form.Group>
                    <Form.Group className={"balance-info-field"}>
                        <Form.Label>
                            Переведенные средства
                        </Form.Label>
                        <Form.Control value={context.credit} readOnly/>
                    </Form.Group>
                </Form.Group>
            </div>
        </div>
    )
}

export default CreditCard

