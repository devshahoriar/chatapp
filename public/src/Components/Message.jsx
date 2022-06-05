const Message = ({me,text}) => {
  return(<div className={me?"self-end mx-3 my-1 bg-slate-600 p-1 rounded-md":"bg-blue-400 p-1 rounded-md mx-3 my-1 self-start"}>
    <h1>{text}</h1>
    
    </div>);
};

export default Message;