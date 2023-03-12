import React, {useState} from "react";
import {settingsIcon} from "../../../../../objects/icons";
import {Dropdown} from "react-bootstrap"
import {useLocation, useParams} from "react-router-dom"

const ClientCreditAccountRow = ({context})=>{

    const [showDropdown, setShowDropdown] = useState(false);

    console.log(context)
    const location = useLocation()

    return(
    <div className={"client-credit-account body"}>
        <div className={"client-credit-account body number"}>
            <label>
                {context?.creditNumber}
            </label>
        </div>
        <div className={"client-credit-account body code"}>
            <label>
                {context?.creditCode}
            </label>
        </div>
        <div className={"client-credit-account body type"}>
            <label>
                {context?.creditType.type}
            </label>
        </div>
        <div className={"client-credit-account body balance"}>
            <label>
                {context?.balance}
            </label>
        </div>
        <div className={"client-credit-account body debit"}>
            <label>
                {context?.debit}
            </label>
        </div>
        <div className={"client-credit-account body credit"}>
            <label>
                {context?.credit}
            </label>
        </div>
        <div className={"client-credit-account body settings"}>
            <Dropdown show={showDropdown} onClose={()=>{setShowDropdown(false)}}>
                <div onClick={()=>{
                    setShowDropdown(!showDropdown)
                }}>
                    {settingsIcon}
                </div>
                <Dropdown.Menu className={"credit-account-settings"}>
                    <Dropdown.Item href={`${location.pathname}/${context?._id}/form`}>Снять средства</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
    )
}

export default ClientCreditAccountRow