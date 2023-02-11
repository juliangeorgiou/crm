import { useRouteLoaderData } from 'react-router-dom';
import React from 'react';
import styled from "styled-components";
import {Table} from "react-bootstrap"

const InvoicePage = styled.div`
  display: flex;
  justify-content: center;
`

const InvoiceArea = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  width: 210mm;
  height: 297mm;
  border: 1px solid black;
  padding-top : 15mm;
  padding-bottom : 15mm;
`

const LogoRow = styled.div`
  flex-direction: row;
  display: flex;
  margin-left: 31.7mm;
  margin-right: 31.7mm;
  justify-content: space-between;
`

const AddressRow = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin-left: 31.7mm;
  margin-right: 31.7mm;
`

const BillTo = styled.div`
  flex-direction: row;
  display: flex; 
  justify-content: space-between;
  margin-left: 31.7mm;
  margin-right: 31.7mm;
`

const ProductsSold = styled.div`
  flex-direction: column;
  display: flex; 
  justify-content: space-between;
  margin-left: 31.7mm;
  margin-right: 31.7mm;
`

const TotalsBox = styled.div`
  flex-direction: row;
  display: flex; 
  justify-content: flex-end;
  margin-left: 31.7mm;
  margin-right: 31.7mm;
`


const TransferInstructions = styled.div`
  flex-direction: row;
  display: flex; 
  justify-content: center;
  margin-left: 31.7mm;
  margin-right: 31.7mm;
`

const Tr = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  font-weight: bold;
`

const Th = styled.div`
  border-bottom: 1px solid black;
  font-weight: bold;
`

export default function Invoice(){
  const orderData = useRouteLoaderData("invoice");
  const order = orderData.order
  const client = orderData.client
  return <InvoicePage>
    <InvoiceArea>
      <LogoRow>
        <span>Logo</span><h1>Invoice</h1>
      </LogoRow> 
      <AddressRow><address>
          <p>CYCRM LTD</p>
          <p>Hoernlistrasse 44</p>
          <p>8400 Winterthur</p>
          <p>Switzerland</p>
          <p>www.cycrm.cy</p>  
        </address>
        <div style={{"text-align":"right"}}>
          <p>Invoice number: {order.orderNumber}</p>
          <p>Date: 1/1/2023</p>
          <p>Due: 1/2/2023</p>  
        </div>
      </AddressRow>
      <BillTo>
        <div>
          <table style={{border: "1px solid"}}>
            <thead>
              <tr>
                <th style={{border: "1px solid", padding: "5px"}}>Bill to:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{border: "1px solid", padding: "5px"}}>{client.name}</td>
              </tr>
              <tr>
                <td style={{"word-wrap": "break-all", border: "1px solid", padding: "5px"}}>
                  {client.address}
                </td>
              </tr>
              <tr>
                <td style={{border: "1px solid", padding: "5px"}}>VAT Number: Number</td>
              </tr>
            </tbody>
          </table>
        </div>
      </BillTo>
      <ProductsSold>
        <table>
            <thead>
              <tr style={{border: "1px solid", padding: "5px"}}>
                <th>Product sold</th>
                <th>Quantity</th>
                <th>Price per item</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
          <tbody style={{"text-align":"center", border: "1px solid", padding: "5px"}}>
            <tr>
              <td>Taxes 2022</td>
              <td>2</td>
              <td>€120</td>
              <td style={{"word-wrap": "break-all"}}>Product desc very long text here for testing to see if it works properly</td>
              <td>€240</td>
            </tr>
          </tbody>
        </table>
      </ProductsSold>
      <TotalsBox>
        <div style={{"text-align":"right", border: "1px solid"}}>
          <table>
            <tr>
              <th>Subtotal</th>
              <td>€240</td>
            </tr>
            <tr>
            <th>VAT %</th>
              <td>20%</td>
            </tr>
            <tr>
              <th>VAT</th>
              <td>€48</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>€240</td>
            </tr>
            <tr>
              <th>Invoice balance</th>
              <td>€240</td>
            </tr>
            <tr>
              <th>Currency</th>
              <td>Euro</td>
            </tr>
          </table>
        </div>
      </TotalsBox>
      <TransferInstructions>
        Bank transfer instructions
      </TransferInstructions>
    </InvoiceArea>
  </InvoicePage>
}