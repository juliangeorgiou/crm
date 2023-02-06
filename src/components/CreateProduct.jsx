import React, {useState} from "react";
import { postData } from "../service/api";

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
        <div>
            <input placeholder="Taxes 2022" value={productName} onChange={handleProductNameChange}/>
            <input placeholder="Filing taxes for 2022" value={productDescription} onChange={handleProductDescriptionChange}/>
            {/* LOCALIZATION FOR STEP AND PLACEHOLDER */} <input placeholder="200" type="number" min="0" step="0.01" value={productPrice} onChange={handleProductPriceChange}/>
            <button onClick={handleSave}>Save</button>
            <p style={{color: "green", display:"inline"}}>{savedNotification}</p>
        </div>
    )
}