import React, {useState} from "react";

const ClientDepositAccountRow = ({context})=>{

    return(
        <div className={"client-deposit-account body"}>
            <div className={"client-deposit-account body number"}>
                <label>
                    {context?.depositNumber}
                </label>
            </div>
            <div className={"client-deposit-account body code"}>
                <label>
                    {context?.depositCode}
                </label>
            </div>
            <div className={"client-deposit-account body type"}>
                <label>
                    {context?.depositType.type}
                </label>
            </div>
            <div className={"client-deposit-account body balance"}>
                <label>
                    {context?.balance}
                </label>
            </div>
            <div className={"client-deposit-account body debit"}>
                <label>
                    {context?.debit}
                </label>
            </div>
            <div className={"client-deposit-account body credit"}>
                <label>
                    {context?.credit}
                </label>
            </div>
        </div>
    )
}

export default ClientDepositAccountRow