import React from "react";

const ClientCreditAccountHeader = ()=>{
    return(
        <div className={"client-credit-account header"}>
            <div className={"client-credit-account header number"}>
                <label>
                    Номер
                </label>
            </div>
            <div className={"client-credit-account header code"}>
                <label>
                    Код
                </label>
            </div>
            <div className={"client-credit-account header type"}>
                <label>
                    Тип
                </label>
            </div>
            <div className={"client-credit-account header balance"}>
                <label>
                    Сальдо
                </label>
            </div>
            <div className={"client-credit-account header debit"}>
                <label>
                    Дебет
                </label>
            </div>
            <div className={"client-credit-account header credit"}>
                <label>
                    Кредит
                </label>
            </div>
            <div className={"client-credit-account header settings"}>
            </div>
        </div>
    )
}

export default ClientCreditAccountHeader