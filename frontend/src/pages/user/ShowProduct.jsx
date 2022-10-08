import axios from 'axios';
import React,{useEffect} from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
// import swal from 'sweetalert';
import { ProductCard } from '../../components/ProductCard'

const ShowProduct = () => {
  const [product,setProduct] = useState({
    name:'',
    detail:'',
    image:''
  });
  const {id} = useParams();
  useEffect(() => {
    fetchProduct();
    // document.title = `You clicked  times`;
  },[]);
  const fetchProduct = async () => {
    await axios.get(`api/product/${id}`).then(({data})=>{
        const prod = data.data.product
    //   const { title, description } = data.product
      setProduct({
        name:prod.name,
        detail:prod.detail,
        image:prod.product_image_url
      })
    }).catch(({response:{data}})=>{
        // swal("Success",data.message,"success");
    
    })
  }
  
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            
            <ProductCard name={product.name} detail={product.detail} image={product.image}/>   
            
          </div>
        </div>
      </section>




    </div>
  )
}

export default ShowProduct