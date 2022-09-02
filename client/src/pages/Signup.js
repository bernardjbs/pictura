import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

import { ADD_USER } from '../utils/mutations';

export default function Signup() {

  const [signupFormState, setSignupFormState] = useState([
    {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    }
  ]);
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignupFormState({
      ...signupFormState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          firstname: signupFormState.firstname,
          lastname: signupFormState.lastname,
          email: signupFormState.email,
          password: signupFormState.password,
          userType: 'Customer',
        },
      });
      const token = mutationResponse.data.addUser.token;
      console.log(token)
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const { data } = await addUser({
  //       variables: {
  //         firstname: signupFormState.firstname,
  //         lastname: signupFormState.lastname,
  //         email: signupFormState.email,
  //         password: signupFormState.password,
  //         userType: 'Customer',
  //       },
  //     });
  //     const token = data.login.token;
  //     Auth.login(token);

  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-12">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Join us - Become a Pictura Member
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your First Name</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={signupFormState.firstname}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="first name"
                  required="" />
              </div>
              <div>
                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={signupFormState.lastname}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="last name"
                  required="" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={signupFormState.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={setSignupFormState.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required="" />
              </div>
              <div>
                <label htmlFor="confirm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input
                  type="password"
                  name="confirm"
                  id="confirm"
                  value={''}
                  onChange={''}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required="" />
              </div>
              <div className="flex items-center justify-between">
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}