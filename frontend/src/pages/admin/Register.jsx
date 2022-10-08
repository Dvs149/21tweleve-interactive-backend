import axios from 'axios'
import React,{useState} from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
const Register = () => {
  const history = useNavigate();
  
  const [registerInput, setRegister] = useState({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error_list:[]
  });

  const handleInput = (e) => {
      e.persist();
      setRegister({...registerInput, [e.target.name]: e.target.value });
  }
  const registerSubmit = (e) =>{
    // alert('d');
    e.preventDefault();
    const data = {
      name : registerInput.name,
      email : registerInput.email,
      password : registerInput.password,
      password_confirmation : registerInput.password_confirmation
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/register`,data).then(res => { 
        if(res.data.status === true)
        {
          swal("Success",res.data.message,"success");
          localStorage.setItem('auth_token', res.data.data.token);
          localStorage.setItem('auth_email', res.data.data.email);
          return history('/list');
          // history.push('/');
        }
       
      }).catch(error => {
        if (error.response) {
          setRegister({...registerInput, error_list: error.response.data.errors});
          console.log(error.response.data.errors);
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
              <form onSubmit={registerSubmit}>
                
                {/* <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"> */}
                  <p className="text-center font-semibold mx-4 mb-5">Sign up</p>
                {/* </div> */}
                {/* Email input */}
                <div className="mb-6">
                  <input type="text"  onChange={handleInput} name="name" value={registerInput.name}  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput11" placeholder="Name" />
                  <span className='text-red-600'>{registerInput.error_list.name}</span>
                </div>
                {/* Email input */}
                <div className="mb-6">
                  <input type="text" onChange={handleInput} name="email" value={registerInput.email} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput21" placeholder="Email address" />
                  <span className='text-red-600'>{registerInput.error_list.email}</span>
                </div>
                {/* Password input */}
                <div className="mb-6">
                  <input type="password" onChange={handleInput} name="password" value={registerInput.password}  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput31" autoComplete='true' placeholder="Password" />
                  <span className='text-red-600'>{registerInput.error_list.password}</span>
                </div>
                {/* Confirm Password input */}
                <div className="mb-6">
                  <input type="password"  onChange={handleInput} name="password_confirmation" value={registerInput.password_confirmation}  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput41" autoComplete='true' placeholder="Confirm Password" />
                  <span className='text-red-600'>{registerInput.error_list.password_confirmation}</span>

                </div>
                <div className="text-center lg:text-left flex justify-between">
                    <Button name="Register"/>
                    {/* <input type="submit" className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" value="Submit" /> */}
                    
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Already have accont? 
                    <a href="#!" className="ml-2 text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Login</a>
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

export default Register