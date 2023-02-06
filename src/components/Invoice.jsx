import { useRouteLoaderData } from 'react-router-dom';
import React from 'react';
import styled from "styled-components";

const PageColumn = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  width: 210mm;
  height: 297mm;
  background-color: beige; 
`

const LogoRow = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-around;
`

const ItemBox = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-around;
`

export default function Invoice(){
  const orderData = useRouteLoaderData("invoice");
  const order = orderData.order
  const client = orderData.client
  return <PageColumn>
    <LogoRow><span>Logo</span><span>Invoice</span></LogoRow> 
    <LogoRow><address>
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
      </div></LogoRow>
    <div>Bill to:
      <p>{client.name}</p>
      <address>{client.address}</address>
    </div>
    <span>Product sold - quantity - price for each - desc - amount</span>
    <span>Subtotal - tax rate - tax - total - invoice balance - currency</span>
    <span>bank transfer instructions</span>

    Order number: {order.orderNumber}</PageColumn>
}