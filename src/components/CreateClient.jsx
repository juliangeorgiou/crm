import React, {useState, useEffect} from 'react';
import { postData } from '../service/api';

export default function CreateClient({onCreate}){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [notes, setNotes] = useState("")
    const [savedNotification, setSavedNotification] = useState("")

    function handleNameChange(event){
        setName(event.target.value)
    }

    function handleEmailChange(event){
        setEmail(event.target.value)
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
        setPhone("")
        setNotes("")
        //CLIENT SAVED NOTIFICATION
        setSavedNotification("Client saved.")
        setTimeout(() => {
            setSavedNotification("")
        }, 2000)
    }   

    return (
        <div>
            <input placeholder='John Doe' value={name} onChange={handleNameChange}/>
            <input placeholder='john@doe.com' value={email} onChange={handleEmailChange}/>
            <input placeholder='555 12345' value={phone} onChange={handlePhoneChange}/>
            <input placeholder='some notes on client here' value={notes} onChange={handleNotesChange}/>
            <button onClick={handleSave}>Save</button>
            <p style={{color: "green", display:"inline"}}>{savedNotification}</p>
        </div>
    )
}