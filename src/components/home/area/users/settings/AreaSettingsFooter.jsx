import React, {useContext} from "react";
import {Button, Form} from "react-bootstrap"
import axios from "axios";
import {SettingsUserContext} from "../../../../../objects/contexts/SettingsUserContext";

const AreaSettingsFooter = ()=>{

    //const {client} = useContext(SettingsUserContext)

    // function submitClientHandler(e){
    //     console.log(client)
    //     // axios.post("http://127.0.0.1:5000/clients", {}).then(
    //     //     (response)=>{
    //     //
    //     //     }
    //     // )
    // }

    return(
        <Form.Group className={"area-settings-footer"}>
            <Button type={"submit"} variant={"success"}>
                Submit
            </Button>
            <Button type={"submit"} variant={"danger"}>
                Decline
            </Button>
        </Form.Group>
    )
}

export default AreaSettingsFooter