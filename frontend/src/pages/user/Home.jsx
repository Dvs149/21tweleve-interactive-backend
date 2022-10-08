import axios from 'axios';
import React,{useEffect} from 'react'
// import swal from 'sweetalert';
import { ProductCard } from '../../components/ProductCard'

const Home = () => {
  useEffect(() => {
    // Update the document title using the browser API
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.get(`/api/product`).then(res => { 
        if(res.data.status === true)
        {
          var product_list = res.data.data.product_list;
          console.log(product_list);
        }
      }).catch(error => {
        if (error.response) {
          // setLoginInput({...loginInput, error_list: error.response.data.errors});
          console.log(error.response.data.message);
        }
      });
    });
    // document.title = `You clicked  times`;
  },[]);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            
            <ProductCard name="Divyesh" detail="destails djfjk kjdshkj sdkjhds"/>   
            
          </div>
        </div>
      </section>




    </div>
  )
}

export default Home