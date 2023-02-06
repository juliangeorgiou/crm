import { useRouteLoaderData } from 'react-router-dom';
import React from 'react';
import styled from "styled-components";
import {Table} from "react-bootstrap"

const InvoicePage = styled.div`
  display: flex;
  justify-content: center;
  background-color: #222;
  color: #e6e6e6;
`

const InvoiceArea = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  width: 210mm;
  height: 297mm;
  background-color: black; 
`

const LogoRow = styled.div`
  flex-direction: row;
  display: flex;
  margin-left: 20mm;
  margin-right: 20mm;
  justify-content: space-between;
`

const AddressRow = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin-left: 20mm;
  margin-right: 20mm;
`

const BillTo = styled.div`
  flex-direction: row;
  display: flex; 
  justify-content: space-between;
  margin-left: 20mm;
  margin-right: 20mm;
`

const ProductsSold = styled.div`
  flex-direction: column;
  display: flex; 
  justify-content: space-between;
  margin-left: 20mm;
  margin-right: 20mm;
`

const TotalsBox = styled.div`
  flex-direction: row;
  display: flex; 
  justify-content: flex-end;
  margin-left: 20mm;
  margin-right: 20mm;
`


const TransferInstructions = styled.div`
  flex-direction: row;
  display: flex; 
  justify-content: center;
  margin-left: 20mm;
  margin-right: 20mm;
`

export default function Invoice(){
  const orderData = useRouteLoaderData("invoice");
  const order = orderData.order
  const client = orderData.client
  return <InvoicePage>
    <InvoiceArea>
      <LogoRow>
        <span>Logo</span><span>Invoice</span>
      </LogoRow> 
      <AddressRow><address>
          <p>CYCRM LTD</p>
          <p>Hoernlistrasse 44</p>
          <p>8400 Winterthur</p>
          <p>Switzerland</p>
          <p>www.cycrm.cy</p>  
        </address>
        <div>
          <p>Invoice number: {order.orderNumber}</p>
          <p>Date: 1/1/2023</p>
          <p>Due: 1/2/2023</p>  
        </div>
      </AddressRow>
      <BillTo>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Bill to:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{client.name}</td>
              </tr>
              <tr>
                <td style={{"word-wrap": "break-all"}}>
                  {client.address}
                </td>
              </tr>
              <tr>
                <td>VAT Number: Number</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </BillTo>
      <ProductsSold>
        <Table>
            <thead>
              <tr>
                <th>Product sold</th>
                <th>Quantity</th>
                <th>Price per item</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td>Taxes 2022</td>
              <td>2</td>
              <td>€120</td>
              <td style={{"word-wrap": "break-all"}}>Product desc very long text here for tesitng to see if it works properly</td>
              <td>€240</td>
            </tr>
          </tbody>
        </Table>
      </ProductsSold>
      <TotalsBox>
        <div>
          <Table>
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
          </Table>
        </div>
      </TotalsBox>
      <TransferInstructions>
        Bank transfer instructions
      </TransferInstructions>
    </InvoiceArea>
  </InvoicePage>
}