import axios from 'axios';
import React,{useState} from 'react'
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';


const EditProduct = () => {
    const history = useNavigate();
    const { id } = useParams();
    
    const [productInput,setProductInput] = useState({
        name:'',
        detail:'',
        error_list:[]
      });
    const [image, setImage] = useState(null);

    useEffect(()=>{
        fetchProduct()
      },[])

    const fetchProduct = async () => {
        await axios.get(`api/product/${id}/edit`).then(({data})=>{
            const prod = data.data.product
        //   const { title, description } = data.product
          setProductInput({
            name:prod.name,
            detail:prod.detail,
            image_path:prod.product_image_url,
            error_list:[]
          })
        }).catch(({response:{data}})=>{
            // swal("Success",data.message,"success");
        
        })
      }

    const handleInput = (e) => {
        // e.persist();
        setProductInput({...productInput,[e.target.name]:e.target.value});
    }
    const handleFileSelect = (e) => {
        setImage(e.target.files[0]);
      }

    const productSubmit = (e) => {
        e.preventDefault();
        const fData =  new FormData();
        fData.append('_method', 'PATCH');
        if(image!==null){
            fData.append('image', image)
          }
        fData.append("name",productInput.name);
        fData.append("detail",productInput.detail);
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/product/${id}`,fData,{ "Content-Type": "multipart/form-data" }).then(res => {
                swal("Success",res.data.message,"success");
                return history('/list');
            }).catch(error => {
                if (error.response) {
                    setProductInput({...productInput, error_list: error.response.data.errors});
                }
              });
        })
    }

    return (
        <div>
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md mt-10 m-auto">
                <form onSubmit={productSubmit}>
                    <div className="form-group mb-6">
                        <input type="text" name="name" value={productInput.name} onChange={handleInput} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7" placeholder="Name" />
                        <span  className='text-red-600'>{productInput.error_list.name}</span>
                    </div>
                    <div className="form-group mb-6">
                        <textarea name="detail" onChange={handleInput} value={productInput.detail}   className="  form-control  block  w-full  px-3  py-1.5  text-base  font-normal  text-gray-700  bg-white bg-clip-padding  border border-solid border-gray-300  rounded  transition  ease-in-out  m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlTextarea13" rows={3} placeholder="detail" defaultValue={""} />
                        <span className='text-red-600'>{productInput.error_list.detail}</span>
                    </div>
                    <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded m-auto" alt="hero" src={productInput.image_path}  />

                    <div className="form-group mb-6">
                        <label htmlFor="image">Update Image from here
                        <input type="file" id="image" name="image" onChange={handleFileSelect}/>
                        </label>
                    </div>
                   
                    <input type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" value="submit " />
                </form>
            </div>

        </div>
    )
}

export default EditProduct