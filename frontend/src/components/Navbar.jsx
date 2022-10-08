import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
 
export const Navbar = () => {
  const history = useNavigate();

    const logoutSubmit = (e) => {
        e.preventDefault();
        
        axios.get(`/api/logout`).then(res => {
            if(res.data.status === true)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_email');
                // swal("Success",res.data.message,"success");
                swal("Success",res.data.message,"success");

                // history.push('/');
                return history("/login");

            }
        });

    }

    var AuthButton = '';
    var navbar = ""
    if (!localStorage.getItem('auth_token')) {
        AuthButton = (
            <div>
                <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-2">
                    Login
                </Link>
                <Link to="/register" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                    Register
                </Link>
            </div>
        )
    } else {
        navbar = ( 
            <>
                <div className="text-sm lg:flex-grow">
                    {/* <Link to="/home" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Product
                    </Link> */}
                    <Link to="/add-product" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Add product
                    </Link>
                    <Link to="/list" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                        List
                    </Link>
                </div>
            </>

        )
        AuthButton = (
            <button onClick={logoutSubmit} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                            Logout
                        </button>
        )
    }
    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <span className="font-semibold text-xl tracking-tight">Divyesh</span>
                </div>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                {navbar}
                
                <div >
                    <div className="text-sm lg:flex-grow">
                        {
                            AuthButton
                        }
                    </div>
                </div>
            </nav>


        </>
    )
}
