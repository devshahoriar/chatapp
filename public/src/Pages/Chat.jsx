import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Contracts from '../Components/Contracts';
import { localUser, serverUrl } from '../Utils/constrains';

const Chat = () => {
  const navigate = useNavigate();
  const [loUser, setLOUser] = useState(null);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const setOrCheck = async () => {
      const user = localStorage.getItem(localUser);
      if (!user) {
        navigate('/login');
      } else {
        setLOUser(JSON.parse(user));
        
      }
    };
    setOrCheck();
  }, []);

  useEffect(()=>{
    const xx = async () =>{
      const re = await axios.post(serverUrl+'/get-all-con', {
          u: loUser._id,
        });
        setPersons(re.data)
    }
    if(loUser){

      xx();
    }
  },[loUser])

  return (
    <div className="container mx-auto">
      <div className="h-full">
        <Contracts user={loUser} persons={persons} />
      </div>
    </div>
  );
};

export default Chat;
