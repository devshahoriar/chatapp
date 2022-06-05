import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import getAvater from '../Utils/getAvater';
import { localUser, serverUrl } from '../Utils/constrains';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name:"",
    email:"",
    pass: "",
    image:""
  });

  useEffect(()=>{
    if(localStorage.getItem(localUser)){
      navigate('/');
    }
  })

  const addUser = (e) => {
    let { name, value } = e.target;
    setUser((u) => ({ ...u, [name]: value }));
  };
  useEffect(() => {
    setUser((u) => ({ ...u, image: getAvater(u?.name) }));
  }, [user.name]);
  const _hendelSubmit = async () => {
    try {
     const res =   await axios({
        method: 'post',
        url: serverUrl+'/register',
        data: {
          ...user,
        },
      });
      if(res) navigate("/login?register=true")
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center mt-20">
        <form
          className="flex regFrom items-center flex-col rounded-xl h-[520px] w-96 bg-slate-700 pt-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-3xl text-center">Chat app</h1>
          <h1 className="text-xl text-center">Register</h1>
          <img className="w-20 h-20 mt-5" src={user.image} alt="Avater" />
          <input
            type="text"
            className="!mt-5"
            placeholder="Name"
            name="name"
            value={user?.name}
            onChange={addUser}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={user?.email}
            onChange={addUser}
          />
          <input
            type="text"
            placeholder="password"
            name="pass"
            value={user?.pass}
            onChange={addUser}
          />
          <button
            className="bg-blue-300 px-6 py-2 rounded-xl mt-4"
            type="submit"
            onClick={_hendelSubmit}
          >
            Register
          </button>
          <div className="text-center mt-4">
            <span>
              Alrady have account?{' '}
              <Link className="hover:text-blue-600" to="/login">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
