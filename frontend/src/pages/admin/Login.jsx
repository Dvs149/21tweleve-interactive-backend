import React,{useState} from 'react'
import Button from '../../components/Button'
import axios from 'axios'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const history = useNavigate();

  const [loginInput,setLoginInput] = useState({
    email:'',
    password:'',
    error_list:[]
  });

  const handleInput = (e) => {
    e.persist();
    setLoginInput({...loginInput,[e.target.name]:e.target.value});
  }
  const loginSubmit = (e) =>{
    // alert('d');
    e.preventDefault();
    const data = {
      email : loginInput.email,
      password : loginInput.password
    }
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/login`,data).then(res => { 
        if(res.data.status === true)
        {
          swal("Success",res.data.message,"success");
          localStorage.setItem('auth_token', res.data.data.token);
          localStorage.setItem('auth_email', res.data.data.email);
          return history('/list');
          
        }
       
      }).catch(error => {
        if (error.response) {
          setLoginInput({...loginInput, error_list: error.response.data.errors});
        }
      });
    });
  }


  return (
    <>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={loginSubmit}>
                  <p className="text-center font-semibold mx-4 mb-5">Sign in</p>
                {/* Email input */}
                <div className="mb-6">
                  <input type="text" onChange={handleInput} name="email" value={loginInput.email} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput1" placeholder="Email address" />
                  <span className='text-red-600'>{loginInput.error_list.email}</span>
                </div>
                {/* Password input */}
                <div className="mb-6">
                  <input type="password" onChange={handleInput} name="password" value={loginInput.password} autoComplete='true' className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput3" placeholder="Password" />
                  <span className='text-red-600'>{loginInput.error_list.password}</span>
                  {/* <input type="password"  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput3" placeholder="Password" /> */}
                </div>
                
                <div className="text-center lg:text-left flex justify-between">
                    <Button name="Login"/>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <a href="#!" className="ml-2 text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>  
    </>
  )
}

export default Login