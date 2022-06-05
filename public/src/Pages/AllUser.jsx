import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Person from "../Components/Person";
import useUser from "../hooks/useUser";
import { serverUrl } from "../Utils/constrains";

const AllUser = () => {
  const [people,setPeople] = useState([]);
  const navigate = useNavigate();
  const user = useUser();
  
  useEffect(()=>{
     const ss = async () =>{
      const pe = await axios.get(serverUrl+"/get-all-user")
      setPeople(pe.data);
    }
    ss();
  },[])
  const ss =async (id) =>{
    const re = await axios.post(serverUrl+"/createnew",{"u1": user._id,"u2": id})
    if(re){
      console.log(re.data)
      navigate('/');
    }
    
  }

  return(<div className="container mx-auto">
    <div>
      {people ? people.map((p,index)=> <Person key={index} person={p} set={()=> ss(p._id)}/>) : "Loading..."}
    </div>
  </div>);
};

export default AllUser;