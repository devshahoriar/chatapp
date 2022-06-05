import Convarsion from '../model/convarsionModel.js';

const createNew = async (req, res) => {
  const { u1, u2 } = req.body;
  if(u1===u2){
    res.send("😊");
    return;
  }
  const alrady = await Convarsion.findOne({
    $or: [
      { u1, u2 },
      { u1: u2, u2: u1 },
    ],
  });
  if (alrady) {
    res.send('ok');
    return;
  }

  const newConvirsion = new Convarsion({ u1, u2 });
  const nn = await newConvirsion.save();
  res.send('new added');
};

const getAllCon = async (req, res) => {
  try {
    const { u } = req.body;
    const allCon = await Convarsion.find({ $or: [{ u1: u }, { u2: u }] }).populate({path:'u1 u2',select : "name image"}).exec();
    res.send(allCon);
  } catch (error) {
    res.send(error);
  }
};

export { createNew, getAllCon };
