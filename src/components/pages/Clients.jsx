import React, {useState, useEffect} from 'react';
import { fetchData } from '../../service/api';
import CreateClient from "../CreateClient.jsx";
import {Link} from 'react-router-dom'

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
  
  //DONE: get it working by defining it here with dummy data
  //GIVES ERROR: MIME SNIFFING move the dummy data to the parent component (panes.jsx)
  //pass the dummy data to this component ()
  return (
    <div>
      <CreateClient onCreate={refreshTable}/>
      <p>Clients list</p>
      {clients == undefined ?
      "Loading clients":
      <table>
        <thead>
        <tr>
          <th>User ID | </th>
          <th> Name | </th>
          <th> Last contact | </th>
          <th> Email | </th>
          <th> Phone | </th>
          <th> Notes</th>
        </tr>
        </thead>
        <tbody>{
          clients.map(client => {
            return (
              <tr key={client.clientID}>
                <td>
                  <Link to={`/clients/${client.clientID}`}>{client.clientID}</Link>
                </td>
                <td>
                  <Link to={`/clients/${client.clientID}`}>{client.name}</Link>
                </td>
                <td>{client.lastContact}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.notes}</td>
              </tr>
            );
          })
        }</tbody>
      </table>
      }
    </div>
  )
}