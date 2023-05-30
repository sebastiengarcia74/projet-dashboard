import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Login({ onClose, toggleSignupModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const GoToSignUp = async (e) => {
    onClose(), toggleSignupModal()
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8002/login', {
          email: email,
          password: password,
        });
          
        console.log(response.data)
        if (response.data) Cookies.set('_id', response.data._id);
          window.location.reload()
      } catch (error) {
        console.error(error);
    if (error.response && error.response.status === 401) {
      setErrorMessage("Email or Password is incorrect. Please try again.");
    } else {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
      }
    };

	return ( <section className=" rounded-lg">
        <div className="w-96 bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight">
                    Login to your account
                </h1>
                {errorMessage && (<div className="text-red-500 text-sm p-2">{errorMessage}</div>)}
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium ">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <p className="text-sm font-light">
                        Don’t have an account yet? <a onClick={GoToSignUp} className="font-medium">Sign up</a>
                    </p>
                    <button className='btn' type="submit">Sign in</button>
                </form>
               
            </div>
        </div>
  </section>

);
}