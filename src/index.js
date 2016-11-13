import express from  'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import saveDataDb from './saveDataInDb';
import Pet from './models/Pet';
import User from './models/User';

mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/pindyuk_skb3');

const app = express();
app.use(cors());

app.get('/users', async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

app.get('/pets', async (req, res) => {
  const pets = await Pet.find();
  return res.json(pets);
});

app.post('/data', async (req, res) => {
  const pets = req.body;
  /*const data = {
    user: {
      name: 'pindyuk',
    },
    pets: [
      {
        name: 'Zildjian',
        type: 'cat',
      },
      {
        name: 'Doge',
        type: 'dog'
      },
    ]
  };*/
  saveDataDb(data);
});

/*const kitty = new Pet({
  name: 'Ziljian',
  type: 'cat'
});

kitty.save()
  .then(() => {
    console.log('success');
  })
  .catch((err) => {
    console.log('err', err);
  });*/


//const app = express();
//app.use(cors());
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
