import React, {useState} from "react";
import { postData } from "../service/api";
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

//the first param of CreateProduct is an object e.g: named "props"
//below key-value pair is "onCreate"
//using {onCreate} we extract the value of the key-value pair
export default function CreateProduct(props){
    const onCreate = props.onCreate
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [savedNotification, setSavedNotification] = useState("")

    function handleProductNameChange(event){
        setProductName(event.target.value)
    }

    function handleProductPriceChange(event){
        setProductPrice(event.target.value)
    }

    function handleProductDescriptionChange(event){
        setProductDescription(event.target.value)
    }

    async function handleSave(event){
        try {
            await postData("product", {
                productName,
                productDescription,
                productPrice
            })
        }catch(error){
            setSavedNotification("Product not saved: " + error.message)
            setTimeout(() => {
                setSavedNotification("")
            }, 5000)
            return
        }
        //REFRESH PRODUCT TABLE
        onCreate()
        //CLEAR INPUTBOXES
        setProductDescription("")
        setProductName("")
        setProductPrice("")
        //PRODUCT SAVED NOTIFICATION
        setSavedNotification("Product saved.")
        setTimeout(() => {
            setSavedNotification("")
        }, 2000)
    }

    return (
        <InputBox>
            <h2>Create product</h2>
            <InputForm>
                <div>
                    <h4>Name</h4>
                    <input placeholder="Taxes 2022" value={productName} onChange={handleProductNameChange}/>
                    <h4>Description</h4>
                    <input placeholder="Filing taxes for 2022" value={productDescription} onChange={handleProductDescriptionChange}/>
                    {/* LOCALIZATION FOR STEP AND PLACEHOLDER */} 
                    <h4>Price</h4>
                    <input placeholder="200" type="number" min="0" step="0.01" value={productPrice} onChange={handleProductPriceChange}/>
                    <button onClick={handleSave}>Save</button>
                    <p style={{color: "green", display:"inline"}}>{savedNotification}</p>
                </div>
            </InputForm>
        </InputBox>
        
    )
}