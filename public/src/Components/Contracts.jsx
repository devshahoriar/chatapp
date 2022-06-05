import { useEffect, useRef, useState } from 'react';
import Person from './Person';
import Send from './Send';
import Welcome from './Welcome';
import io from 'socket.io-client';
import { serverUrl } from '../Utils/constrains';

const Contracts = ({ user, persons }) => {
  let socketRef = useRef();
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    socketRef.current = io(serverUrl);
  }, []);
 
  return (
    <div className="flex">
      <aside className=" h-[95vh] w-80">
        {user && (
          <>
            <div className="flex  px-4 rounded-lg justify-between items-center mt-4 bg-blue-400">
              <div>
                <p className="text-4xl capitalize font-bold">{user.name}</p>
              </div>
              <div className="h-16 w-16">
                <img src={user.image} alt="User" className="w-full" />
              </div>
            </div>
            <div className="bg-blue-400 mt-5 w-full h-[88%] rounded-lg overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-gray-100 ">
              {persons.map((ittem, index) => {
                const p = ittem.u1._id === user._id ? ittem.u2 : ittem.u1;
                return <Person key={index} person={p} set={setCurrentChat} />;
              })}
            </div>
          </>
        )}
      </aside>
      {!currentChat && <Welcome />}
      {currentChat && <Send socket={socketRef.current} person={currentChat} />}
    </div>
  );
};

export default Contracts;
