import React from "react"
import SideList from "./worker/sidelist/workerSideList/SideList";
import WorkerHeader from "./worker/header/WorkerHeader";
import {Route, Routes} from "react-router-dom";
import {useNavigate, useParams, useLocation} from "react-router-dom"
import {userIcon} from "../../objects/icons";
import ClientMain from "./client/ClientMain";
import ClientDeposit from "./client/ClientDeposit";
import ClientCredit from "./client/ClientCredit";
import ClientCreditCards from "./client/ClientCreditCards";
import CreditCardForm from "./client/components/creditCard/CreditCardForm";
import ClientCreditAccountForm from "./client/components/creditAccount/ClientCreditAccountForm";
import BoxOffice from "./client/components/boxOffice/BoxOffice";

const UserPage = ()=>{
    const {id} = useParams()
    const names = ["Main", "Deposit accounts", "CreditAccounts", "Credit Cards", "Box Office"]
    const icons = [userIcon,userIcon,userIcon,userIcon, userIcon]
    let absolutePath = "/client"
    const navigate = useNavigate()
    const location = useLocation()
    const switchHandler = (toolID)=>{
        console.log(location, id)
        switch(toolID){
            case 1: {
                navigate(`${absolutePath}/${id}/main`)
                break
            }
            case 2: {
                navigate(`${absolutePath}/${id}/deposit`)
                break
            }
            case 3: {
                navigate(`${absolutePath}/${id}/credit`)
                break
            }
            case 4: {
                navigate(`${absolutePath}/${id}/creditCard`)
                break
            }
            case 5: {
                navigate(`${absolutePath}/${id}/boxOffice`)
                break
            }
        }
    }

    const sideListFooterContext = {
        name: "Закончить сеанс",
        handler: ()=>{
            navigate("/login")
        }
    }

    return(
        <div className={"worker-page"}>
            <SideList context={{
                names: names,
                icons: icons,
                absolute: absolutePath,
                handler: switchHandler,
                footerContext: sideListFooterContext
            }}/>
            <div className={"worker-area"}>
                <WorkerHeader/>
                <Routes>
                    <Route path={"/main"} element={<ClientMain/>}/>
                    <Route path={"/boxOffice"} element={<BoxOffice/>}/>
                    <Route path={"/deposit"} element={<ClientDeposit/>}/>
                    <Route path={"/credit/:creditID/form"} element={<ClientCreditAccountForm/>}/>
                    <Route path={"/credit"} element={<ClientCredit/>}/>
                    <Route path={"/creditCard"} element={<ClientCreditCards/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default UserPage