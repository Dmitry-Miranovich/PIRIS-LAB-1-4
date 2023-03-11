import React, {useEffect, useState} from "react";
import axios from "axios";

const BoxOffice = ()=> {
    const [bankData, setBankData] = useState({
        boxOffice: {}
    })

    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/bankAccount")
            .then(response=>{
                const boxOffice = response.data.find(elem=> elem.accountName === "Касса")
                setBankData(prevState => ({
                    ...prevState,
                    boxOffice: boxOffice
                }))
            })
    },[])
    return(
        <div className={"worker-area bankAccount"}>
            <div className={"bank-account-area"}>
                <h4>Касса</h4>
                <label>
                    Название
                </label>
                <p>
                    {bankData?.boxOffice.name}
                </p>
                <label>
                    Номер счета
                </label>
                <p>
                    {bankData?.boxOffice.accountNumber}
                </p>
                <label>
                    Код счета
                </label>
                <p>
                    {bankData?.boxOffice.code}
                </p>
                <label>
                    Баланс
                </label>
                <p>
                    {bankData?.boxOffice.money}
                </p>
                <label>
                    Дебет
                </label>
                <p>
                    {bankData?.boxOffice.debit}
                </p>
                <label>
                    Кредит
                </label>
                <p>
                    {bankData?.boxOffice.credit}
                </p>
                <label>
                    Сальдо
                </label>
                <p>
                    {bankData?.boxOffice.balance}
                </p>
            </div>
        </div>
    )
}

export default BoxOffice