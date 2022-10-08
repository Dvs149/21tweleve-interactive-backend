import axios from 'axios';
import React,{useState} from 'react'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
    const history = useNavigate();

    const [productInput,setProductInput] = useState({
        name:'',
        detail:'',
        error_list:[]
      });
    const [image, setImage] = useState("");


    const handleInput = (e) => {
        // e.persist();
        console.log(e);
        // setImage(e.target.files[0]);
        setProductInput({...productInput,[e.target.name]:e.target.value});
    }
    const handleFileSelect = (e) => {
        setImage(e.target.files[0]);
      }
    
    const productSubmit = (e) => {
        e.preventDefault();
        const fData =  new FormData();
        fData.append("image",image);
        fData.append("name",productInput.name);
        fData.append("detail",productInput.detail);

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/product`,fData).then(res => {
                swal("Success",res.data.message,"success");
                return history('/list');
            }).catch(error => {
                if (error.response) {
                    setProductInput({...productInput, error_list: error.response.data.errors});
                //   console.log(error.response.data.message);
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
                        <textarea name="detail" onChange={handleInput}  className="  form-control  block  w-full  px-3  py-1.5  text-base  font-normal  text-gray-700  bg-white bg-clip-padding  border border-solid border-gray-300  rounded  transition  ease-in-out  m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlTextarea13" rows={3} placeholder="detail" defaultValue={""} />
                        <span className='text-red-600'>{productInput.error_list.detail}</span>
                    </div>
                    <div className="form-group mb-6">
                        <input type="file" name="image"  onChange={handleFileSelect}/>
                    </div>
                   
                    <input type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" value="submit " />
                </form>
            </div>

        </div>
    )
}

export default AddProduct