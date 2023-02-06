import React, {useState, useEffect} from 'react';
//.. goes on level higher in the folder structure
import { fetchData } from '../../service/api';
import CreateOrder from '../CreateOrder.jsx';
import {Link} from 'react-router-dom'
import {Table} from "react-bootstrap"

export default function Orders() {
  const [orders, setOrders] = useState(undefined)
  function refreshTable(){
    fetchData("order").then((fetchedOrders) => {
      setOrders(fetchedOrders)
    }, (reason) => console.log(reason + " Error while retrieving orders."))
  }
    //we use useEffect to prevent fetching the data when var orders changes from above
  //retrieve it from the backend
  useEffect(() => {
    refreshTable()
  }, [])
    
  //GIVES ERROR: MIME SNIFFING move the dummy data to the parent component (panes.jsx)
  //pass the dummy data to this component ()
  return (
    <div>
      <CreateOrder onCreate={refreshTable}/>
      <p>Orders list</p>
      {orders == undefined ?
      "Loading orders":
      <Table>
        <thead>
        <tr>
          <th>User ID</th>
          <th> Order number</th>
          <th> Product name</th>
          <th> Due date</th>
          <th> Invoice</th>
          <th> Notes</th>
        </tr>
        </thead>
        <tbody>{
          orders.map(order => {
            return (
              <tr key={order.orderNumber} >
                <td>{order.clientID}</td>
                <td>{order.orderNumber}</td>
                <td>{order.productNames}</td>
                <td>{order.dueDate}</td>
                <td>
                  <Link to={`/invoices/${order.orderNumber}`}>{"View" + order.orderNumber}</Link>
                </td>                
                <td>{order.orderNotes}</td>
              </tr>
            );
          })
        }</tbody>
      </Table>
      }
    </div>
  )
}