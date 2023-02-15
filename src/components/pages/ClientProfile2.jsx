//Purchased products
//Paid/open invoices
//Executed/open orders
//Add family interface with name, birthday
//Interests, likes for small talk and anniversary gift
//Connections with known/unknown leads
//Manual/automatic contact button for email/sms
//

import React, { useContext } from "react"
import { Outlet, Link, useRouteLoaderData } from "react-router-dom"
import styled from "styled-components"
import { ThemeContext } from "../../theme"

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1em;
  visibility: visible;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
`
const ProficonContainer = styled.div`
`

const Proficon = styled.img`
  width: 10em;
`

const Button = styled.div`
  visibility: hidden;
  ${ProficonContainer}:hover & {
    visibility: visible;
  }
`

export default function ClientProfile() {
    const client = useRouteLoaderData("clientProfile");
    const [theme, setTheme] = useContext(ThemeContext)
    return (
        <Container>
            <div>
                <ProficonContainer>
                    <Proficon src={`/static/proficon${theme.picIdentifier}.png`} />
                    <Button>Edit</Button>
                </ProficonContainer>
                <Nav>
                    <Link to={`/client/${client.id}`}>Feed</Link>
                    <Link to="info">Info</Link>
                    <Link to="orders">Orders</Link>
                    <Link to="invoices">Invoices</Link>
                </Nav>
            </div>
            <Outlet />
        </Container>
    );
}