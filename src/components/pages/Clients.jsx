import React, {useState, useEffect} from "react"
import {Table} from "react-bootstrap"
import { fetchData } from '../../service/api';
import CreateClient from "../CreateClient.jsx";
import {Link} from 'react-router-dom'

import MultiRangeSlider from "multi-range-slider-react"
import Select from 'react-select'

import styled from "styled-components";

const TableStyle = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  max-width: 35cm
`

const ClientsListStyle = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`

const TableControls = styled.div`
  flex-direction: row;
  display: flex;

` 

function generatePhoneOptions(clients){
  return clients
  //map clients by phone
    .map((client) => client.phone)
    //filter those results by keeping only the first occurence of each item
    .filter((element, index, array) => {
      return array.indexOf(element) === index
    })
    //map those results to the dropdown with value and label as per the library specs(react-select)
    .map((phone) => {
      return {value: phone, label: phone}
  })
}

function ClientsTableBody({clients, phonesShown, ascending, columnSort, columnIsShown, isEditingTable}){ 
  //filter clients
  const filteredClients = clients.filter((client) => {
    //SHORT CIRCUITING: first true occurence for || stops and first false occurence for && stops
    return phonesShown.length === 0 || phonesShown.includes(client.phone)
  })

  //sort filtered clients ascending or descending
  filteredClients.sort((a, b) => {
    const valueA = a[columnSort]
    const valueB = b[columnSort]
    if (typeof valueA === "string") {
      return valueA.localeCompare(valueB) * (ascending ? -1 : +1)
    } else {
      return (valueA - valueB) * (ascending ? -1 : +1)
    }
  })
  
  return <tbody>
    {filteredClients.map((client) => (
      <tr key={client.clientID}>
        {columnIsShown.clientID || isEditingTable
          ? <td> <Link to={`/clients/${client.clientID}`}>{client.clientID}</Link></td> 
          : ""}
        {columnIsShown.name || isEditingTable
          ? <td><Link to={`/clients/${client.clientID}`}>{client.name}</Link></td>
          : ""}
        {columnIsShown.lastContact || isEditingTable
          ? <td>{client.lastContact}</td>
          : ""}
        {columnIsShown.email || isEditingTable
          ? <td>{client.email}</td>
          : ""}
        {columnIsShown.address || isEditingTable
          ? <td>{client.address}</td>
          : ""}
        {columnIsShown.phone || isEditingTable
          ? <td>{client.phone}</td>
          : ""}
        {columnIsShown.notes || isEditingTable
          ? <td>{client.notes}</td>
          : ""}

      </tr>)
    )}
    {/* <tr>
      <td>Total</td>
      <td></td>
      <td>{filteredClients.reduce((sum, client) => {
        return sum + client.orderValue
      }, 0)}</td>
    </tr> */}
  </tbody>
}

export default function Clients() {
  const [clients, setClients] = useState(undefined)
  function refreshTable(){
    fetchData("client").then((fetchedClients) => {
      setClients(fetchedClients)
    }, (reason) => console.log(reason + " Error while retrieving clients."))
  }
  //retrieve it from the backend
  //we use useEffect to prevent fetching the data when var clients changes from above
  useEffect(() => {
    refreshTable()
  }, [])

  const [columnSort, setColumnSort] = useState("name")
  const [isEditingTable, setIsEditingTable] = useState(false)
  const [ascending, setAscending] = useState(true)
  const [filterMenuShown, setFilterMenuShown] = useState(false)
  const [phonesShown, setPhonesShown] = useState([])
  const [columnIsShown, setColumnIsShown] = useState({
    clientID: true,
    name: true,
    lastContact: true,
    email: true,
    address: true,
    phone: true,
    notes: true
  })

  //show icon for sorting
  function getSortingIcon(columnName) {
    return <a onClick={() => toggleColumnAscDesc(columnName)} href="#">
      {columnSort === columnName
        ? (ascending ? <span>&#x25BE;</span> : <span>&#x25B4;</span>)
        : <span>&#9663;</span>}
    </a>
  }
  //sort column order
  function toggleColumnAscDesc(columnName) {
    if (columnSort === columnName) {
      setAscending(ascending ? false : true)
    } else { setColumnSort(columnName) }
  }
 
  //checkbox handling of change updates state
  const handleOnChange = (columnName) => {
    setColumnIsShown({
      //spread syntax allows below, to add key-value pairs from the object defined after the "...". without the "..." the key would had been the object-name and the value would had been the object-content
      ...columnIsShown,
      [columnName]: !columnIsShown[columnName]
    });
  };
  //show headers in columns
  function renderColumnHeader(columnName, columnText) {
    return columnIsShown[columnName] || isEditingTable
      ? <th>
        {isEditingTable
          ? <input type="checkbox" checked={columnIsShown[columnName]} onChange={() => handleOnChange(columnName)} />
          : ""
        }
        {columnText}
        {isEditingTable
          ? ""
          : getSortingIcon(columnName)}
      </th>
      : ""
  }
  //checkboxes show/hidecolumns
  function toggleColumnShow(columnIsShown) {
    if (columnIsShown) {
      setColumnIsShown(true)
    }
  }

  //when clicking edit-table, enter edit mode
  return (
    <ClientsListStyle>
      <CreateClient onCreate={refreshTable}/>
      <h2>Clients list</h2>
      {clients == undefined ?
      "Loading clients":
      <div>
        <TableControls>
          <a onClick={() => setIsEditingTable(!isEditingTable)}
            href="#"> &#9998; {isEditingTable ? "Save changes" : "Edit table"}
          </a>&nbsp;
          <div style={{display: "inline-block"}}>
            <a onClick={() => setFilterMenuShown(!filterMenuShown)} href="#" style={{display: "flex"}}>
              <span className="material-symbols-outlined">filter_alt</span> Filter
            </a>
            {filterMenuShown
              ? <div style={{
                  position: "absolute",
                  background: "white",
                  padding: "1em",
                  boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.75)",
                  border: "2px solid white",
                  borderRadius: "2px"
                }}>
                  <MultiRangeSlider />
                  {clients == undefined
                  ? "Loading clients"
                  : <Select
                    options={generatePhoneOptions(clients)}
                    isMulti
                    onChange={(newValue) => setPhonesShown(newValue.map( (phoneObject) => phoneObject.value))}
                    />
                  }
                </div>
              : ""
            }
          </div>
        </TableControls>
          <Table striped bordered hover>
            <thead>
              <tr style={isEditingTable 
                ? {
                  border: "1px solid blue",
                  borderStyle: "double"
                } 
                : {}}>

                {renderColumnHeader("clientID", "ID")}
                {renderColumnHeader("name", "Name")}
                {renderColumnHeader("lastContact", "Last contact")}
                {renderColumnHeader("email", "Email")}
                {renderColumnHeader("address", "Address")}
                {renderColumnHeader("phone", "Phone")}
                {renderColumnHeader("notes", "Notes")}
              </tr>
            </thead>
            {/* when passing props to a component,  use the HTML attribute method*/}
            <ClientsTableBody clients = {clients}  phonesShown = {phonesShown} ascending = {ascending} columnSort = {columnSort} columnIsShown = {columnIsShown} isEditingTable = {isEditingTable}/>
          </Table>
      </div>
      }
    </ClientsListStyle>
  )
}