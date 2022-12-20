//Routes is the definition of the pages and their relationships

//component files start with a capital letter
//you can think of components as a class because they can be reused
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css'

import React from 'react' 

import Clients from './pages/Clients.jsx'
import Orders from './pages/Orders.jsx'
import Products from './pages/Products.jsx'
//TODO: IMPORT PROFILE, SECURITY, LOGOUT
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ClientProfile from './pages/ClientProfile.jsx'
import Root from './Root.jsx';
import {fetchData} from '../service/api.js'
import ClientFeed from './ClientFeed.jsx'
import ClientInvoices from './ClientInvoices.jsx'
import ClientInfo from './ClientInfo.jsx'
import ClientOrders from './ClientOrders.jsx'
import ClientslistJSFIDDLE from './pages/ClientslistJSFIDDLE.jsx'


/*THIS IS A NAV PANE EMPLOYING USESTATE FOR NAVIGATION

export default function Panes(){
  //here you can get all clients from db
  const [pane, setPane] = useState("Home")
  //at this point a function will be called each time the component is called
  return (
      <div>
        <a onClick={() => setPane("Clients")}>Clients</a>
        <a onClick={() => setPane("Products")}>Products</a>
        <a onClick={() => setPane("Orders")}>Orders</a>
        {
          pane === "Clients" ? <Clients />
          : pane === "Products" ? <Products />
          : pane === "Orders" ? <Orders />
          : pane === "Profile" ? <Profile />
          : pane === "Security" ? <Security />
          : pane === "Log out" ? <LogOut />
          : undefined
        }
      </div>
  )
}*/

async function clientLoader({params}){
  const clientLoaded = await fetchData("client/" + params.clientID)
  return clientLoaded
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "clients/:clientID",
        element: <ClientProfile />,
        loader: clientLoader,
        id: "clientProfile",
        children: [
          {
            path: "",
            element: <ClientFeed />,
          },
          {
            path: "info",
            element: <ClientInfo />,
          },
          {
            path: "orders",
            element: <ClientOrders />,
          },
          {
            path: "invoices",
            element: <ClientInvoices />,
          },
        ],
      },
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "fiddle",
        element: <ClientslistJSFIDDLE />
      }
    ],
  },
]);

export default function Routes(){  
  return (
      <div>
        <RouterProvider router={router} />
      </div>
  )
}