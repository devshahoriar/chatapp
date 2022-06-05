import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { localUser, serverUrl } from '../Utils/constrains';
import Message from './Message';
import axios from 'axios';

const Send = ({ person, click, socket }) => {
  const navigate = useNavigate();
  const user = useUser();
  const [message, setMessage] = useState('');
  const [allMEssage, setAllMessage] = useState([]);
  const [newCMesage, setNewMessage] = useState(null);
  const logOut = () => {
    localStorage.removeItem(localUser);
    navigate('/login');
  };

  useEffect(() => {
    console.log(allMEssage);
  }, [allMEssage]);

  const shoketNewMess = (d) => {
    const newMessage = {
      message:{
      text: d.message
    },
    sender:d.from,
  }
  setNewMessage(newMessage);
}

  useEffect(() => {
    socket.emit('add_user', { socId: socket.id, usId: user._id });
    socket.on('rechived',shoketNewMess);
  //  return socket.off('rechived');
    
  }, []);

  useEffect(()=>{
   setAllMessage((prev)=> [...prev,newCMesage]);
   
  },[newCMesage])

  const _send_Message = async () => {
    const deta = { message, from: user._id, to: person.person._id };
    const res = await axios.post(serverUrl + '/send-message', deta);
    socket.emit('send_message', deta);
    setAllMessage((prev)=> [...prev,res.data]);

    setMessage('');
  };

  useEffect(() => {
    setAllMessage([]);
    const get_message = async () => {
      const res = await axios.post(serverUrl + '/get-all-message', {
        from: user._id,
        to: person.person._id,
      });
      setAllMessage(res.data);
    };
    get_message();
  }, [person]);

  return (
    <div className="justify-self-center self-stretch grow">
      <div className="w-full h-full rounded-md bg-blue-900 flex flex-col ml-2 mt-5">
        <div className="h-20 bg-slate-600 rounded-md">
          <div className="flex h-20 justify-between items-center">
            <div className="flex w-60 justify-between h-20 items-center ml-5">
              <h1 className="truncate text-2xl">{person.person.name}</h1>
              <div className="h-16 w-16">
                <img
                  className="w-full h-full"
                  src={person.person.image}
                  alt=""
                />
              </div>
            </div>
            <div className="mr-5">
              <button
                onClick={() => navigate('/all-people')}
                className="mr-2 h-10 px-5 bg-blue-400"
              >
                See all People
              </button>
              <button className="mr-2 h-10 px-5 bg-blue-400" onClick={logOut}>
                Log out
              </button>
            </div>
          </div>
        </div>
        <div className="h-full mb-3 flex flex-col justify-end">
          <div className="flex flex-col justify-end overflow-y-auto">
            {allMEssage.map((m, i) => {
              const me = m.sender === user._id;
              return <Message key={i} text={m.message.text} me={me} />;
            })}
            
          </div>
        </div>
        <div className="mt-auto bg-slate-600 h-14 w-full flex items-center ">
          <button
            onClick={click}
            className="h-10 w-10 bg-blue-400 rounded-full ml-3  focus:outline-none focus:border-none"
          >
            +
          </button>
          <input
            placeholder="send message"
            type="text"
            className="grow mx-5 h-10 text-2xl"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            disabled={!message}
            onClick={_send_Message}
            className="mr-5 h-10 px-5 bg-blue-400"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Send;
