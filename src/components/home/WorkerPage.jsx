import React from "react"
import SideList from "./worker/sidelist/workerSideList/SideList";
import WorkerHeader from "./worker/header/WorkerHeader";
import WorkerArea from "./area/WorkerArea";
import {Routes,Route} from "react-router-dom"
import AreaSettings from "./area/users/settings/AreaSettings";
import AreaAccount from "./area/users/account/AreaAccount";
import DepositPage from "./area/users/account/pages/DepositPage";
import DepositAccountPage from "./area/users/account/pages/DepositAccountPage";
import BankAccountPage from "./area/users/account/pages/BankAccountPage";
import CreditPage from "./area/users/account/pages/CreditPage";
import CreditAccountPage from "./area/users/account/pages/CreditAccountPage";
import {dashBoardIcon, userIcon, warningIcon} from "../../objects/icons";
import {useNavigate} from "react-router-dom"
import ClientCreditAccountForm from "./client/components/creditAccount/ClientCreditAccountForm";
import CreditCardForm from "./client/components/creditCard/CreditCardForm";
import axios from "axios";

const WorkerPage = ()=>{

    const toolsNames = ["Customer Service", "Bank Account", "Third"]
    const icons = [userIcon, warningIcon, dashBoardIcon]
    const absolutePath= "/home"
    const navigate =useNavigate()
    const switchHandler = (id)=>{
        switch (id) {
            case 1:{
                navigate(`${absolutePath}/clients`)
                break
            }
            case 2:{
                navigate(`${absolutePath}/bankAccount`)
                break
            }
            case 3:{
                navigate(`${absolutePath}/third`)
                break
            }
        }
    }

    const sideListFooterContext = {
        name: "Закончить рабочий месяц",
        handler: ()=>{
            axios.put("http://127.0.0.1:5000/home/clients",{})
                .then(response=>{
                    alert(`Data was updated successfully \n Code ${response.status}`)
                })
                .catch(error=>{
                    alert(`Some errors have been occurred \n${error.response.status}`)
                    console.log(error)
                })
        }
    }

    return(
        <div className={"worker-page"}>
            <SideList context={{
                names: toolsNames,
                icons: icons,
                absolute: absolutePath,
                handler: switchHandler,
                footerContext: sideListFooterContext
            }}/>
            <div className={"worker-area"}>
                <WorkerHeader/>
                <Routes>
                    <Route path={"bankAccount/*"} element={<BankAccountPage/>}/>
                    <Route path={"clients/:id/creditCard"} element={<CreditCardForm/>}/>
                    <Route path={"clients/:id/credit/account"} element={<CreditAccountPage/>}/>
                    <Route path={"clients/:id/credit/*"} element={<CreditPage/>}/>
                    <Route path={"clients/:id/deposit/account"} element={<DepositAccountPage/>}/>
                    <Route path={"clients/:id/deposit/*"} element={<DepositPage/>}/>
                    <Route path={"clients/:id"} element={<AreaAccount/>}/>
                    <Route path={"clients/settings"} element={<AreaSettings/>}/>
                    <Route path={"clients/*"} element={<WorkerArea/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default WorkerPage