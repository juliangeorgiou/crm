import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';

export default function ClientProfile(props) {
  const client = useRouteLoaderData("clientProfile");
  return (
    <div>
      <p>Client profile</p>
      {client == undefined ?
      "Loading the client is taking longer than usual...":
      <table>
        <tbody>
          <tr><th>User ID</th><td>{client.clientID}</td></tr>
          <tr><th>Name</th><td>{client.name}</td></tr>
          <tr><th>Last contact</th><td>{client.lastContact}</td></tr>
          <tr><th>Email</th><td>{client.email}</td></tr>
          <tr><th>Phone</th><td>{client.phone}</td></tr>
          <tr><th>Notes</th><td>{client.notes}</td></tr>   
        </tbody>
      </table>
      }
    </div>
  )
}