import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {useFormik} from "formik";
import {CreditContext} from "../../../../../../objects/contexts/CreditContext";
import AreaHeader from "../../settings/AreaHeader";
import {creditSchema} from "../../../../../../objects/schemas/creditSchema";
import SettingsListField from "../../settings/components/SettingsListField";
import SettingsNameField from "../../settings/components/SettingsNameField";
import SettingsDateField from "../../settings/components/SettingsDateField";
import AreaSettingsFooter from "../../settings/AreaSettingsFooter";
import {useParams, useLocation, useNavigate} from "react-router-dom"
import axios from "axios";


const CreditPage = ()=>{
    const {id} = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const {values, errors, touched, handleSubmit, handleChange, handleBlur} = useFormik({
        validationSchema: creditSchema,
        initialValues:{
            creditType:"",
            currency: "",
            creditNumber:"",
            creditDay:"",
            creditMonth:"",
            creditYear: "",
            creditDate: "",
            creditAmount: "",
            creditTerm: "",
            creditPercent: "",
        },
        onSubmit:()=>{
            const {creditDay, creditMonth, creditYear} = values
            values.creditDate = new Date(`${creditYear}-${creditMonth}-${creditDay}`)
            let endDate = new Date(`${creditYear}-${creditMonth}-${creditDay}`)
            let endMonth = endDate.getMonth() + parseInt(values.creditTerm)
            endDate.setMonth(endMonth)
            const schema = {
                creditNumber: values.creditNumber,
                currency: creditData.currency.find(elem=>elem.code === values.currency),
                creditType: creditData.creditTypes.find(elem=>elem.type === values.creditType),
                creditStart: values.creditDate,
                creditEnd: endDate,
                creditPercent: values.creditPercent,
                creditAmount: values.creditAmount,
            }
            axios.post(`http://127.0.0.1:5000/home/clients/${id}/credit`, schema)
                .then(response=>{
                    console.log(response)
                    alert("Кредит оформлен")
                    const curr_path = location.pathname.split("/")
                    curr_path.pop()
                    navigate(curr_path.join("/"))
                })
        }
    })
    const [creditData, setCreditDataData]= useState({
        creditTypes: [],
        currency: []
    })

    async function getCreditValues(){
        await axios.get(`http://127.0.0.1:5000/bankData/creditType`)
            .then(response=>{
                const {creditTypes, currency} = response.data
                console.log(creditTypes)
                setCreditDataData(prevState => ({
                    ...prevState,
                    creditTypes: creditTypes,
                    currency: currency
                }))
            }).catch(error=>{
                alert(`Cannot find required data. Code ${error.status}`)
            })
    }

    useEffect(()=>{
        getCreditValues()
            .then(res=>{
                console.log("Deposit data downloaded")
            })
    }, [])
    return(
        <CreditContext.Provider value={{touched, errors, handleBlur}}>
            <Form className={"worker-area account credit"} onSubmit={handleSubmit} noValidate>
                <AreaHeader name={"Credit form"}/>
                <Form.Group style={{padding: "5px"}}>
                    <SettingsListField name={"Вид кредита"} data={creditData?.creditTypes.map(elem=>{
                        return elem.type
                    })} defaultValue={values.depositType} id={"creditType"} handler={handleChange}
                                       isValid={errors.creditType && touched.creditType} feedback={errors.creditType} />
                    <SettingsListField name={"Валюта"} data={creditData?.currency.map(elem=>{
                        return elem.code
                    })} defaultValue={values.currency} id={"currency"} handler={handleChange}
                                       isValid={errors.currency && touched.currency} feedback={errors.currency} />
                    <SettingsNameField name={"Номер договора"} defaultValue={values.depositNumber} handler={handleChange}
                                       isValid={errors.creditNumber && touched.creditNumber} handleBlur={handleBlur} feedback={errors.creditNumber}
                                       id={"creditNumber"}/>
                    <SettingsDateField name={"Дата начала договора"} values={values} changeHandler={handleChange} id={"credit"} context={CreditContext}/>
                    <SettingsNameField name={"Срок договора"} defaultValue={values.creditTerm} id={"creditTerm"}
                                       handler={handleChange} isValid={errors.creditTerm && touched.creditTerm} handleBlur={handleBlur} feedback={errors.creditTerm}/>
                    <SettingsNameField name={"Сумма кредита"} defaultValue={values.creditAmount} id={"creditAmount"}
                                       handler={handleChange} handleBlur={handleBlur} isValid={errors.creditAmount && touched.creditAmount}
                                       feedback={errors.creditAmount}/>
                    <SettingsNameField name={"Процент по кредиту"} defaultValue={values.creditPercent} id={"creditPercent"}
                                       handler={handleChange} handleBlur={handleBlur} isValid={errors.creditPercent && touched.creditPercent}
                                       feedback={errors.creditPercent}/>
                </Form.Group>
                <AreaSettingsFooter/>
            </Form>
        </CreditContext.Provider>
    )
}

export default CreditPage