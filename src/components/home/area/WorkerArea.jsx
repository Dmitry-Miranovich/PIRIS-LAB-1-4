import React, {useEffect, useState} from "react"
import WorkerAreaHeader from "./WorkerAreaHeader";
import WorkerUserList from "./users/WorkerUserList";
import axios from "axios";
import {UsersContext} from "../../../objects/contexts/UsersContext"
import {useNavigate, Routes, Route} from "react-router-dom"
import AreaSettings from "./users/settings/AreaSettings";
const WorkerArea = ()=>{

    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const url = "http://127.0.0.1:5000/home/clients"
        axios.get(url)
            .then(response=>{
                console.log(response)
                setUsers(response.data)
            }).catch(error=>{
                console.log(`Users cannot be founded. \n Following error: ${error}`)
        })
    },[])

    return(
        <UsersContext.Provider value={{
            users: users
        }}>
            <div className={"worker-area-scene"}>
                <WorkerAreaHeader/>
                <WorkerUserList/>
            </div>
        </UsersContext.Provider>
    )
}

export default WorkerArea
// <Routes>
// <Route path={'settings'} element={<AreaSettings/>}/>
// </Routes>