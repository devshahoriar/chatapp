import Message from '../model/messageModel.js';

const sendMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = new Message({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    const mes = await data.save();
    res.send(mes);
  } catch (error) {
    res.send('error');
  }
};

const getAllMEssage =async (req, res) => {
  const {from,to} = req.body;
 
  try {
    const resM = await Message.find({users:{$all:[from,to]}}).exec();
    res.send(resM);
  } catch (error) {
    console.log(error);
  }
};

export { sendMessage, getAllMEssage };
