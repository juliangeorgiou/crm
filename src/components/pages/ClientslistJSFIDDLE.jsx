import React, {useState} from "react"
import {Table} from "react-bootstrap"
import MultiRangeSlider from "multi-range-slider-react"

export default function ClientslistJSFIDDLE() {
  const clients = [
    {
      clientID: 0,
      clientName: "John",
      orderValue: 1000,
      clientNationality: "German",
    },
    {
      clientID: 1,
      clientName: "Mohammed",
      orderValue: 5000,
      clientNationality: "Qatar",
    },
    {
      clientID: 2,
      clientName: "Alasdair",
      orderValue: 3000,
      clientNationality: "British",
    },
    {
      clientID: 3,
      clientName: "Jean-Claude",
      orderValue: 6500,
      clientNationality: "Belgian",
    },
    {
      clientID: 4,
      clientName: "Pierre",
      orderValue: 4500,
      clientNationality: "French",
    }
  ]

  const [columnSort, setColumnSort] = useState("clientName")
  const [isEditingTable, setIsEditingTable] = useState(false)
  const [ascending, setAscending] = useState(true)
  const [filterMenuShown, setFilterMenuShown] = useState(false)
  const [columnIsShown, setColumnIsShown] = useState({
    clientID: true,
    clientName: true,
    orderValue: false,
    clientNationality: true
  })
  //TODO sort numerically not working
  //sort clients ascending or descending
  clients.sort((a, b) => {
    const valueA = a[columnSort]
    const valueB = b[columnSort]
    if (typeof valueA === "string") {
      return valueA.localeCompare(valueB) * (ascending ? -1 : +1)
    } else {
      return (valueA - valueB) * (ascending ? -1 : +1)
    }
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
  //show values in columns
  function renderColumnValue(columnName, client) {
    return columnIsShown[columnName] || isEditingTable
      ? <td>{client[columnName]}</td>
      : ""
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
    <div>
      <h2>Clients list</h2>

      <a onClick={() => setIsEditingTable(!isEditingTable)}
        href="#"> &#9998; {isEditingTable ? "Save changes" : "Edit table"}</a>&nbsp;

      <div style={{display: "inline-block"}}>
        <a onClick={() => setFilterMenuShown(!filterMenuShown)} href="#"> 
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
        </div>
        : ""}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr style={isEditingTable ? {
            border: "1px solid blue",
            borderStyle: "double"
          } : {}}>

            {renderColumnHeader("clientID", "ID")}
            {renderColumnHeader("clientName", "Name")}
            {renderColumnHeader("orderValue", "Order value")}
            {renderColumnHeader("clientNationality", "Nationality")}
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.clientID}>
              {renderColumnValue("clientID", client)}
              {renderColumnValue("clientName", client)}
              {renderColumnValue("orderValue", client)}
              {renderColumnValue("clientNationality", client)}

            </tr>)
          )}
          <tr>
          <td>Total</td>
          <td></td>
          <td>{clients.reduce((sum, client) => {
          	return sum + client.orderValue
           }, 0)}</td>
        </tr>
        </tbody>
      </Table>
    </div>
  )
}