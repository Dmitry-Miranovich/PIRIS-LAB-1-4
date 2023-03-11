import React, {useContext, useEffect} from "react"
import WorkerAreaUser from "./WorkerAreaUser";
import {Container} from "react-bootstrap";
import {UsersContext} from "../../../../objects/contexts/UsersContext";
import "../../../../style/workerStyle.css"

const WorkerUserList = ()=>{

    const users = useContext(UsersContext)

    useEffect(()=>{

    },[])

    function userList(){
        const {users: data} = users

        return data.map((user,key)=>{
            const {FCs, birthData, sex, passport} = user
            return <WorkerAreaUser userName={`${FCs?.name} ${FCs?.surname} ${FCs?.middleName}`} user={user} key={key}/>
        })
    }

    return(
        <div className={"worker-area-user-list"}>
            {userList()}
        </div>
    )
}

export default WorkerUserList