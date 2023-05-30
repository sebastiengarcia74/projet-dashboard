import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup({onClose, toggleLoginModal}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [confPassword, setConfPass] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');

  const GoToSignIn = async (e) => {
    onClose(),toggleLoginModal()
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
   

    if(password != confPassword){
      toast.error("Passwords don't match!");
      return
    }

    try {
        const response = await axios.post('http://localhost:8002/register', {
          email: email,
          pseudo: pseudo,
          password: password,
        });
          console.log("user created")
          console.log(response.data)
          toast.success('Account created successfully!');
          Cookies.set('userId', response.data._id)
          onClose();
          toggleLoginModal();
      } catch (error) {
        console.error(error);
    if (error.response && error.response.status === 401) {
      setErrorMessage("Email or Password is incorrect. Please try again.");
    } else {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
      }
    };

	return ( <section className="bg-gray-50 dark:bg-gray-900 rounded-lg">
    {/* <ToastContainer/> */}
        <div className="w-96 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                </h1>
                {errorMessage && (<div className="text-red-500 text-sm p-2">{errorMessage}</div>)}
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required="" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your pseudo</label>
                        <input type="text" name="first name" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required="" onChange={(e) => setPseudo(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    
                    <div>
                        <label htmlFor="password_conf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" name="password" id="password_conf"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e) => setConfPass(e.target.value)}></input>
                    </div>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Allready have an account? <a onClick={GoToSignIn} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                    </p>
                    <button className='btn' type="submit">Signup</button>
                </form>
               
            </div>
        </div>
  </section>

);
}