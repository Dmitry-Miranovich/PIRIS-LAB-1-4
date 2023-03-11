import React from "react";

const ClientDepositAccountHeader = ()=>{
    return(
        <div className={"client-deposit-account header"}>
            <div className={"client-deposit-account header number"}>
                <label>
                    Номер
                </label>
            </div>
            <div className={"client-deposit-account header code"}>
                <label>
                    Код
                </label>
            </div>
            <div className={"client-deposit-account header type"}>
                <label>
                    Тип
                </label>
            </div>
            <div className={"client-deposit-account header balance"}>
                <label>
                    Сальдо
                </label>
            </div>
            <div className={"client-deposit-account header debit"}>
                <label>
                    Дебет
                </label>
            </div>
            <div className={"client-deposit-account header credit"}>
                <label>
                    Кредит
                </label>
            </div>
        </div>
    )
}

export default ClientDepositAccountHeader