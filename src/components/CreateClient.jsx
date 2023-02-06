import React, {useState, useEffect} from 'react';
import { postData } from '../service/api';
import styled from "styled-components";

const InputForm = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 2em
`

const NotesStyle = styled.div`
  flex-direction: column;
  display: flex;
  align-items: stretch;
`
const InputBox = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  padding-bottom: 2em
  `

export default function CreateClient({onCreate}){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [notes, setNotes] = useState("")
    const [savedNotification, setSavedNotification] = useState("")

    function handleNameChange(event){
        setName(event.target.value)
    }

    function handleEmailChange(event){
        setEmail(event.target.value)
    }

    function handleAddressChange(event){
        setAddress(event.target.value)
    }

    function handlePhoneChange(event){
        setPhone(event.target.value)
    }

    function handleNotesChange(event){
        setNotes(event.target.value)
    }

    async function handleSave(event){
        try {
            await postData("client", {
                name: name,
                email: email,
                address: address,
                phone: phone,
                notes: notes
            })
        }catch(error){
            setSavedNotification("Client not saved: " + error.message)
            setTimeout(() => {
                setSavedNotification("")
            }, 5000)
            return
        }
        //REFRESH CLIENT TABLE
        onCreate()
        //CLEAR INPUTBOXES
        setName("")
        setEmail("")
        setAddress("")
        setPhone("")
        setNotes("")
        //CLIENT SAVED NOTIFICATION
        setSavedNotification("Client saved.")
        setTimeout(() => {
            setSavedNotification("")
        }, 2000)
    }   

    return (
        <InputBox>
            <h2>Create client</h2>
            <InputForm>
                <div>
                    <h4>Full name</h4>
                    <input placeholder='John Doe' value={name} onChange={handleNameChange}/>
                    <h4>Email</h4>
                    <input placeholder='john@doe.com' value={email} onChange={handleEmailChange}/>
                    <h4>Billing address</h4>
                    <input placeholder='123 Walnut Street, San Jose, CA' value={address} onChange={handleAddressChange}/>
                    <h4>Phone</h4>
                    <input placeholder='555 12345' value={phone} onChange={handlePhoneChange}/>
                </div>
                <div>
                    <h4>Notes</h4>
                    <NotesStyle>
                        <input style={{height: "11em"}} placeholder='some notes on client here' value={notes} onChange={handleNotesChange}/>
                    </NotesStyle>
                    <div style={{gap: "20px"}}>
                        <button onClick={handleSave}>Save</button>
                        <p style={{color: "green", display:"inline"}}>{savedNotification}</p>
                    </div>
                </div>
            </InputForm>
        </InputBox>
    )
}