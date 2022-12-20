//CLIENT DATA


//ORDERS
//TODO: EXECUTED ORDERS/OPEN ORDERS 

//PRODUCTS
//PURCHASED PRODUCTS

//PERSONAL DATA
//DATE OF BIRTH - TODO: CHILDREN/WIFE NAMES AND BIRTHDAYS
//TODO: LIKES - FOR SMALL TALK
//TODO: KNOWN FRIENDS - FOR EXPANSIONS
//PHONE NUMBER - EMAIL ADDRESS - TODO: HOME ADDRESS

//CONTACT
//SMS/CALL INTEGRATIONS (transactional sms provider) https://www.clicksend.com/eu/pricing/cy/#email
//EMAIL/POST INTEGRATIONS (transactional email provider) https://www.twilio.com/pricing 

//BILLING 
//BALANCE 0: PAID INVOICES - BALANCE NEGATIVE: OPEN INVOICES - BALANCE POSITIVE: CREDIT ON ACCOUNT
//PAYMENT METHODS: INVOICE BILLING, CREDIT CARD (stripe.com)

import React from 'react';
import { Outlet, Link, useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  margin-right: 1em;
  visibility: visible;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const Proficon = styled.img`
  width: 10em;
`

const ProficonContainer = styled.div`
`
const Button = styled.button`
  visibility: hidden;
  ${ProficonContainer}:hover & {
    visibility: visible;
  }
`

export default function ClientProfile() {
  const client = useRouteLoaderData("clientProfile");
  return (
    <Container>
      <div>
        <ProficonContainer>
          <Proficon src="/static/proficon.svg" />
          <Button>Edit</Button>
        </ProficonContainer>
        <Nav>
          <Link to={`/clients/${client.clientID}`}>Feed</Link>
          <Link to="info">Info</Link>
          <Link to="orders">Orders</Link>
          <Link to="invoices">Invoices</Link>
        </Nav>
      </div>
      <Outlet />
    </Container>
  );
}