import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const List = () => {
  const [productList, setProductList] = useState("");
  useEffect(() => {
    loadProduct();
    // console.log(productList);
    // document.title = `You clicked  times`;
  }, []);
  const loadProduct = async () => {
    const result = await axios.get('http://127.0.0.1:8000/api/product');
    var pl = result.data.data.product_list;
    // console.log(pl);
    setProductList(pl);
  }
  
  const deleteProduct = async (id) => {
    // alert(id)
    const isConfirm = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.get('/sanctum/csrf-cookie').then(response => {
          axios.delete(`api/product/${id}`).then(res => {
              loadProduct()
              swal("Success",res.data.message,"success");
              // swal("Poof! Your imaginary file has been deleted!", {
              //   icon: "success",
              // });
              // return history('/list');
          }).catch(error => {
              if (error.response) {
                  // setProductInput({...productInput, error_list: error.response.data.errors});
              //   console.log(error.response.data.message);
              }
            });
      })
        
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }
  

  return (
    <div>
      <table id="dataTable" className="p-4 m-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-8 text-xs text-gray-500">
              ID
            </th>
            <th className="p-8 text-xs text-gray-500">
              Name
            </th>
            <th className="p-8 text-xs text-gray-500">
              Description
            </th>
            <th className="p-8 text-xs text-gray-500">
              View
            </th>
            <th className="px-6 py-2 text-xs text-gray-500">
              Edit
            </th>
            <th className="px-6 py-2 text-xs text-gray-500">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">

          {
            productList.length > 0 && (
              productList.map((row, key) => (
                <tr key={key}>
                  <td className="px-6 py-4 text-center">
                    {row.id}
                  </td>
                  {/* <td>{row.id}</td> */}
                  <td className="px-6 py-4 text-center">{row.name}</td>
                  <td className="px-6 py-4 text-center">{row.detail}</td>
                  <td className="px-6 py-4 text-center">
                  <Link to={`/show-product/${row.id}`} className='px-4 py-1 text-sm text-white bg-green-400 rounded'>
                      View
                    </Link>
                    </td>
                  <td className="px-6 py-4 text-center">
                    <Link to={`/edit-product/${row.id}`} className='px-4 py-1 text-sm text-white bg-blue-400 rounded'>
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-4 py-1 text-sm text-white bg-red-400 rounded" onClick={()=>deleteProduct(row.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default List