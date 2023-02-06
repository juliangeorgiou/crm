import React, {useState, useEffect} from "react";
import { postData, fetchData } from "../service/api";

import styled from "styled-components";

const InputForm = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 2em
`

const InputBox = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  padding-bottom: 2em
  `

  const NotesStyle = styled.div`
  flex-direction: column;
  display: flex;
  align-items: stretch;
`

//{props} are for modifying how the component behaves; props is like a button that can make magic changes
export default function CreateOrder({onCreate, clientID: providedClientID}){
    const [clientID, setClientID] = useState(providedClientID)
    const [selectedProducts, setSelectedProducts] = useState([])
    const [dueDate, setDueDate] = useState("")
    const [orderNotes, setOrderNotes] = useState("")
    const [savedNotification, setSavedNotification] = useState("")

    const [clients, setClients] = useState(undefined)
    const [products, setProducts] = useState(undefined)
    //we dont need refreshtable but we need useEffect, research how to do that
    useEffect(() => {
        fetchData("client").then((fetchedClients) => {
            setClients(fetchedClients)
        }, (reason) => console.log(reason + " Error while retrieving clients."))
        fetchData("product").then((fetchedProducts) => {
            setProducts(fetchedProducts)
        }, (reason) => console.log(reason + " Error while retrieving products."))
    }, [])
        
    function handleClientIdChange(event){
        setClientID(event.target.value)
    }

    function handleProductsChange(event){
        setSelectedProducts(event.target.value)
    }

    function handleDueDateChange(event){
        setDueDate(event.target.value)
    }

    function handleOrderNotesChange(event){
        setOrderNotes(event.target.value)
    }

    async function handleSave(event){
        try {
            await postData("order", {
                clientID,
                dueDate,
                orderNotes
            })
            //TODO: add a second post data for adding product to the order 
            
        }catch(error){
            setSavedNotification("Order not saved: " + error.message)
            setTimeout(() => {
                setSavedNotification("")
            }, 5000)
            return
        }
        //Refresh order table
        onCreate()
        //clear inputboxes
        if (providedClientID === undefined){
            setClientID("")
        }
        setDueDate("")
        setOrderNotes("")
        //Order saved notification
        setSavedNotification("Order saved.")
        setTimeout(() => {
            setSavedNotification("")
        }, 2000)
    }

    return (
        <InputBox>
            <h2>Create order</h2>
            <InputForm>
                <div>
                <h4>Client</h4>
                    { providedClientID === undefined 
                    ? <select disabled={clients === undefined} onChange={handleClientIdChange}>
                        
                        <option>Choose client</option>
                        { (clients !== undefined) 
                            ? clients.map(client => (
                                <option key={client.clientID} value={client.clientID}>
                                    {client.clientID} {client.name}
                                </option>
                            )) 
                            : <option value={undefined}>
                                    Fetching clients...
                            </option>
                        }
                    </select> 
                    : <></>
                    }
                <h4>Product</h4>
                    {/*TODO: when no product is selected, no error is thrown*/}
                    <select disabled={products === undefined} onChange={handleProductsChange}>
                        
                        <option>Choose product</option>
                        { (products !== undefined) 
                            ? products.map(product => (
                                <option key={product.productName} value={product.productName}>
                                    {product.productName} {product.productPrice}
                                </option>
                            )) 
                            : <option value={undefined}>
                                    Fetching products...
                            </option>
                        }
                    </select>
                <h4>Due date</h4>
                    {/* date dropdown */}<input placeholder="1 December 2022" type="date" value={dueDate} onChange={handleDueDateChange}/>
                </div>
                <div>
                    <h4>Notes</h4>
                    <NotesStyle>
                        <input style={{height: "11em"}} placeholder="Some notes here" value={orderNotes} onChange={handleOrderNotesChange}/>
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