// Login.jsx
import React from "react";
import { useState } from "react";
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
   const [isSignIn, setIsSignIn] = useState(true);
   const [email, setEmail] = useState('');
   const [loginError, setLoginError] = useState(null)
   const [password, setPassword] = useState('');
   const [givenName, setGivenName] = useState('');
   const [familyName, setFamilyName] = useState('');
   const { login } = useAuth();

   const handleSignUpForm = async (e) => {
      e.preventDefault();
      if(email.trim() === "" || givenName.trim() === "" || password.trim() === ""){
         setLoginError('Fill all inputs please');
         return
      }
      const data = {
         email,
         givenName,
         familyName,
         password
      }
      const response = await signUp(data, true, 'Form');
      console.log(response)
   }

   const handleLoginForm = async (e) => {
      e.preventDefault();
      if(email.trim() === "" || password.trim() === ""){
         setLoginError('Fill email and password');
         return
      }
      const credentials = {
         email,
         password
      }
      const response = await login(credentials, true, 'Form');
      console.log(response)
   }

   // https://developers.google.com/identity/gsi/web/reference/js-reference
   const handleGoogle = (response) => {
      const user_credential = jwt_decode(response.credential)
      console.log('login Google Sign In', response, user_credential)
      login(user_credential, true, 'Google')
   }

   useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
         callback: handleGoogle
      });
      google.accounts.id.renderButton(
         document.getElementById('signInGoogleDiv'),
         { theme: "outline", size: "large" }
      )
   }, []);

   useEffect(() => {
      setPassword('')
   }, [isSignIn])

   const theme = [
      (
         <div id="login" className="p-4 border rounded-md">
            <div>
               <form onSubmit={(e) => handleLoginForm(e)}>
                  {(loginError !== null) ? (<p className="text-red-600">{loginError}</p>) : ''}
                  <p>
                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-1" placeholder="email@asd.com in" />
                  </p>
                  <p>
                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-1" placeholder="pass in" />
                  </p>
                  <button type="submit" className="border p-2 rounded-md">Sign In</button>
               </form>

               <p>----- Or -------</p>

               <div id="signInGoogleDiv"></div>
            </div>
            <p>Not registered? <span onClick={() => setIsSignIn(false)}>Sign Up here</span></p>
         </div>
      ),
      (
         <div id="login" className="p-4 border rounded-md">
            <div>
               <form onSubmit={(e) => handleSignUpForm()}>
                  <p>
                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-1" placeholder="email up" />
                  </p>
                  <div className="grid">
                     <div><input type="text" value={givenName} onChange={(e) => setGivenName(e.target.value)} className="w-full border p-1" placeholder="given name" /></div>
                     <div><input type="text" value={familyName} onChange={(e) => setFamilyName(e.target.value)} className="w-full border p-1" placeholder="family name" /></div>
                  </div>
                  <p>
                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-1" placeholder="pass up" />
                  </p>
                  <button type="submit" className="border p-2 rounded-md">Sign Up</button>
               </form>

               <p>----- Or -------</p>

               <div id="signInGoogleDiv"></div>
            </div>
            <p>Already registered? <span onClick={() => setIsSignIn(true)}>Sign In here</span></p>
         </div>
      )
   ]

   return isSignIn === true ? theme[0] : theme[1]
};