//import express from  'express';
//import cors from 'cors';

import mongoose from 'mongoose';
import Promise from 'bluebird';
import saveDataDb from './saveDataInDb';

mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/pindyuk_skb3');

const data = {
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
};

saveDataDb(data);

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





/*app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});*/
