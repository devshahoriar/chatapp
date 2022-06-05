import {  useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { localUser, serverUrl } from "../Utils/constrains";

const Login = () => {

  const [reg] = useSearchParams();
  const navigate = useNavigate();
  const isReg = reg.get("register");
  const [error,setError] = useState("");

  const [user,setUser] = useState({
    email:"",
    pass:""
  });

  const addUser = (e) => {
    let {name,value} = e.target;
    setUser((u) => ({...u,[name]:value}))
  }

  useEffect(()=>{
    if(localStorage.getItem(localUser)){
      navigate('/');
    }
  })


 const _hendelSubmit =async () =>{
   setError(null)
   try {
    const res =await  axios({
      method: 'post',
      url: serverUrl+"/login",
      data: {
        ...user
      }
    });
    if(res.data.error){
      setError(res.data.message);
    }
    if(res.data.status){
      const userString = JSON.stringify(res.data.data)
      localStorage.setItem(localUser,userString);
      navigate('/')
    }
   } catch (error) {
     console.log(error);
   }
 }

  return(<div className="container mx-auto">
    <div className="flex flex-col justify-center items-center mt-32">
      
      <form className="flex regFrom items-center flex-col rounded-xl h-[400px] w-96 bg-slate-700 pt-5" onSubmit={(e)=> e.preventDefault()}>
      <h1 className="text-3xl text-center">Chat app</h1>
      <h1 className="text-xl text-center">Login</h1>
      {isReg && <span className="!normal-case opacity-60">Registered successfull</span>}
        <input className="!mt-5" type="text" placeholder="Email" name="email" value={user?.email}  onChange={addUser}  />
        <input className="!mt-5" type="text" placeholder="password" name="pass" value={user?.pass} onChange={addUser}  />
        <h1 className="text-red-500"> {error}</h1>
        <button disabled={!user.email || !user.pass} className="bg-blue-300 px-6 py-2 rounded-xl mt-1 hover:opacity-50 transition-opacity disabled:opacity-50" type="submit" onClick={_hendelSubmit}>Login</button>
        <div className="text-center mt-4"> 
          <span >Don't have account? <Link className="hover:text-blue-600" to="/register">Register</Link></span>
        </div>
      </form>
    </div>
  </div>);
};

export default Login;