import User from '../model/User.js';
import bcrypt from 'bcrypt';


const registerController = async (req, res) => {
  const { name, email, pass,image } = req.body;
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(pass, salt);

  const newUser = new User({ name, email, password: hash,image });
  try {
    await newUser.save();
    res.send('Ok');
  } catch (error) {
    res.send('not ok');
  }
 
};

const logInContriller = async (req,res) => {
  const {email, pass} = req.body;
  const user =  await User.findOne({email}).exec()
  if(!user){
    res.send({error:true,message: "No user registered with this email."});
    return;
  }
  if(bcrypt.compareSync(pass, user.password)){
    const {_id, name,email,image} = user;
    res.send({status:true,message: "User Loged",data: {_id,name,email,image}});
    return
  }else{
    res.send({error:true,message: "Wrong password"});
    return;
  }
  res.send("ok");
}

const getAllController =async (req,res) => {
  try {
    const allUsers =await User.find().select(['-password']);
    
    res.send(await JSON.stringify(allUsers));
  } catch (error) {
    res.send(error);
  }
}

export {registerController,logInContriller,getAllController};