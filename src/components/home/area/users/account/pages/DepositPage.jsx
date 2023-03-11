import React, {useEffect, useState} from "react"
import {Form} from "react-bootstrap"
import SettingsListField from "../../settings/components/SettingsListField";
import WorkerAreaHeader from "../../../WorkerAreaHeader";
import AreaHeader from "../../settings/AreaHeader";
import SettingsNameField from "../../settings/components/SettingsNameField";
import SettingsDateField from "../../settings/components/SettingsDateField";
import {useFormik} from "formik";
import axios from "axios";
import {useParams} from "react-router-dom"
import {depositSchema} from "../../../../../../objects/schemas/depositSchema";
import AreaSettingsFooter from "../../settings/AreaSettingsFooter";
import {DepositContext} from "../../../../../../objects/contexts/DepositContext";
import {useLocation, useNavigate} from "react-router-dom"

const DepositPage = ()=>{

    const {id} = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const {values, errors, handleSubmit, handleBlur, handleChange, touched} = useFormik({
        initialValues:{
            depositType: "",
            currency:"",
            depositNumber: "",
            depositDay: "",
            depositMonth: "",
            depositYear: "",
            depositDate:"",
            depositTerm: "",
            depositAmount: "",
            depositPercent: "",
        }
        ,validationSchema: depositSchema,
        onSubmit: ()=>{
            const {depositDay, depositMonth, depositYear} = values
            values.depositDate = new Date(`${depositYear}-${depositMonth}-${depositDay}`)
            let endDate = new Date(`${depositYear}-${depositMonth}-${depositDay}`)
            let endMonth = endDate.getMonth() + parseInt(values.depositTerm)
            endDate.setMonth(endMonth)
            const percentage =parseInt((parseInt(values.depositAmount) * (parseInt(values.depositPercent)/ 100))/ parseInt(values.depositTerm))
            const schema = {
                depositNumber: values.depositNumber,
                currency: depositData.currency.find(elem=>elem.code === values.currency),
                depositType: depositData.depositTypes.find(elem=>elem.type === values.depositType),
                depositStart: values.depositDate,
                depositEnd: endDate,
                depositPercent: values.depositPercent,
                depositAmount: values.depositAmount,
                percentage:percentage
            }
            axios.post(`http://127.0.0.1:5000/home/clients/${id}/deposit`, schema)
                .then(response=>{
                    console.log(response)
                    alert("Депозит добавлен")
                    const curr_path = location.pathname.split("/")
                    curr_path.pop()
                    navigate(curr_path.join("/"))
                })
        }
    })
    const [depositData, setDepositData]= useState({
        depositTypes: [],
        currency: []
    })

    async function getDepositValues(){
        await axios.get(`http://127.0.0.1:5000/bankData/depositType`)
            .then(response=>{
                const {depositTypes, currency} = response.data
                console.log(depositTypes)
                setDepositData(prevState => ({
                    ...prevState,
                    depositTypes: depositTypes,
                    currency: currency
                }))
            }).catch(error=>{
                alert(`Cannot find required data. Code ${error.status}`)
            })
    }

    useEffect(()=>{
        getDepositValues()
            .then(res=>{
                console.log("Deposit data downloaded")
            })
    }, [])



    return(
        <Form className={"worker-area account deposit"} onSubmit={handleSubmit} noValidate>
            <DepositContext.Provider value={{touched, errors, handleBlur}}>
                <AreaHeader name={"Deposit form"}/>
                <Form.Group style={{padding: "5px"}}>
                    <SettingsListField name={"Вид депозита"} data={depositData?.depositTypes.map(elem=>{
                        return elem.type
                    })} defaultValue={values.depositType} id={"depositType"} handler={handleChange}
                                       isValid={errors.depositType && touched.depositType} feedback={errors.depositTypes} />
                    <SettingsListField name={"Валюта"} data={depositData?.currency.map(elem=>{
                        return elem.code
                    })} defaultValue={values.currency} id={"currency"} handler={handleChange}
                                       isValid={errors.currency && touched.currency} feedback={errors.currency} />
                    <SettingsNameField name={"Номер договора"} defaultValue={values.depositNumber} handler={handleChange}
                                       isValid={errors.depositNumber && touched.depositNumber} handleBlur={handleBlur} feedback={errors.depositNumber}
                                       id={"depositNumber"}/>
                    <SettingsDateField name={"Дата начала договора"} values={""} changeHandler={handleChange} id={"deposit"} context={DepositContext}/>
                    <SettingsNameField name={"Срок договора"} defaultValue={values.depositTerm} id={"depositTerm"}
                                       handler={handleChange} isValid={errors.depositTerm && touched.depositTerm} handleBlur={handleBlur} feedback={errors.depositTerm}/>
                    <SettingsNameField name={"Сумма вклада"} defaultValue={values.depositAmount} id={"depositAmount"}
                                       handler={handleChange} handleBlur={handleBlur} isValid={errors.depositAmount && touched.depositAmount}
                                       feedback={errors.depositAmount}/>
                    <SettingsNameField name={"Процент по вклада"} defaultValue={values.depositPercent} id={"depositPercent"}
                                       handler={handleChange} handleBlur={handleBlur} isValid={errors.depositPercent && touched.depositPercent}
                                       feedback={errors.depositPercent}/>
                </Form.Group>
                <AreaSettingsFooter/>
            </DepositContext.Provider>
        </Form>
    )
}

export default DepositPage