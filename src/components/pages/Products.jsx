import React, {useState, useEffect} from 'react';
import { fetchData } from '../../service/api';
import CreateProduct from '../CreateProduct.jsx';
import {Table} from "react-bootstrap"
import styled from "styled-components";

const ProductsListStyle = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`

const TableControls = styled.div`
  flex-direction: row;
  display: flex;

` 

export default function Products() {
  const [products, setProducts] = useState(undefined)
  function refreshTable(){
    fetchData("product").then((fetchedProducts) => {
      setProducts(fetchedProducts)
    }, (reason) => console.log(reason + " Error while retrieving products."))
  }
  //we use useEffect to prevent fetching the data when var products changes from above
  //retrieve it from the backend
  useEffect(() => {
    refreshTable()
  }, [])
  return (
    <ProductsListStyle>
      <CreateProduct onCreate={refreshTable}/>
      <h2>Products list</h2>
      {products == undefined ?
      "Loading products":
      <TableControls>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th> Price</th>
            <th> Description</th>
          </tr>
          </thead>
          <tbody>{
            products.map(product => {
              return (
                <tr key={product.productName}>
                  <td>{product.productName}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.productDescription}</td>
                </tr>
              );
            })
          }</tbody>
        </table>
      </TableControls>
      }
    </ProductsListStyle>
  )
}