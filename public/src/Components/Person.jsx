import React from 'react';

const Person = ({person,set}) => {

  return (
    <div onClick={()=> set({person})} className="w-[90%] !m-4 h-20 bg-slate-600 rounded-md cursor-pointer">
      <div className="flex items-center h-20 justify-between mx-5">
        <div>
          <p className='truncate w-40'>{person?.name} </p>
        </div>
        <div className="h-14 w14">
          <img src={person?.image} alt="avater" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default Person;
