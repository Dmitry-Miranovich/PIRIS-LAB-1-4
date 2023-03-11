import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom"

const ClientMain = ()=>{

    const [client, setClient] = useState({})

    const {id} = useParams()

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/client/${id}`)
            .then(res=>{
                setClient(res.data)
            })
    },[])

    return(
        <div className={"worker-area"}>
            <div className={"worker-area-scene client main"}>
                <div className={"client-main private"}>
                    <div>
                        <label>
                            Имя
                        </label>
                        <p>
                            {client?.FCs?.name}
                        </p>
                    </div>
                    <div>
                        <label>
                            Фамилия
                        </label>
                        <p>
                            {client?.FCs?.surname}
                        </p>
                    </div>
                    <div>
                        <label>
                            Отчетсво
                        </label>
                        <p>
                            {client?.FCs?.middleName}
                        </p>
                    </div>
                    <div>
                        <label>
                            Дата рождения
                        </label>
                        <p>
                            {client?.birthDate}
                        </p>
                    </div>
                    <div>
                        <label>
                            Пол
                        </label>
                        <p>
                            {client?.sex}
                        </p>
                    </div>
                </div>
                <div style={{
                    flexGrow: "1",
                    display: "flex",
                    flexDirection: "column",
                    margin : "5px"
                }}>
                    <div className={"client-main passport"}>
                        <div className={"client-main passport first"}>
                            <div>
                                <label>
                                    Серия паспорта
                                </label>
                                <p>
                                    {client?.passport?.passportSeries}
                                </p>
                            </div>
                            <div>
                                <label>
                                    Номер паспорта
                                </label>
                                <p>
                                    {client?.passport?.passportID}
                                </p>
                            </div>
                            <div>
                                <label>
                                    Идентификационный номер
                                </label>
                                <p>
                                    {client?.passport?.passportNumber}
                                </p>
                            </div>
                            <div>
                                <label>
                                    Место выдачи
                                </label>
                                <p>
                                    {client?.passport?.issuePlace}
                                </p>
                            </div>
                        </div>
                        <div className={"client-main passport second"}>
                            <div>
                                <label>
                                    Город фактического проживания
                                </label>
                                <p>
                                    {client?.passport?.registrationCity}
                                </p>
                            </div>
                            <div>
                                <label>
                                    Адрес фактического проживания
                                </label>
                                <p>
                                    {client?.passport?.registrationAddress}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={"client-main extra"}>
                        <div className={"client-main extra first"}>
                            <div>
                                <label>
                                    Email
                                </label>
                                <p>
                                    {client?.extra?.email}
                                </p>
                            </div>
                            <div>
                                <label>
                                    Город прописки
                                </label>
                                <p>
                                    {client?.extra?.city}
                                </p>
                            </div>
                            <div>
                                <label>
                                    Адрес прописки
                                </label>
                                <p>
                                    {client?.extra?.address}
                                </p>
                            </div>
                        </div>
                        <div className={"client-main extra second"}>
                            <div>
                                <label>
                                    Семейное положение
                                </label>
                                <p>
                                    {client?.extra?.maritalStatus}
                                </p>
                            </div>
                            <div>
                                <label>
                                    Гражданство
                                </label>
                                <p>
                                    {client?.extra?.citizenship}
                                </p>
                            </div>
                            <div>
                                <label>
                                    Инвалидность
                                </label>
                                <p>
                                    {client?.extra?.disability}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientMain