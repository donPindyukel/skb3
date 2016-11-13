import express from  'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import bodyParser from 'body-parser';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import saveDataDb from './saveDataInDb';
import * as objMod from './objectModifier';
import PC from './models/PC';
import CPU from './models/Cpu';
import HDD from './models/Hdd';
import RAM from './models/Ram';
import Board from './models/Board';

import isAdmin from './middlewares/isAdmin';

mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/pindyuk_skb3');

const app = express();
app.use(cors());
//app.use(express.bodyParser());
app.use(bodyParser.json());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

app.get('/task3A', async (req, res, next) => {

  let pc = {};

  fetch(pcUrl)
    .then(async (response) => {
      pc = await response.json();
      try {
        return res.json(pc);
      } catch (err) {
        return res.status(500).json(err);
      }
    })
    .catch(err => {
      console.log('Чтото пошло не так:', err);
    });
});

app.get('/task3A/*', async (req, res, next) => {

  let pc = {};

  fetch(pcUrl)
    .then(async (response) => {
      pc = await response.json();
      let result;
      try {
        const prop = req.path.split('/');
        if (prop.length > 5) {
          res.status('404').end('Not Found');
          return;
        }
        if (prop.length === 5) {
          result = objMod.getProp(pc[prop[2]], [prop[3]]);
          if (result === '404') {
            res.status('404').end('Not Found');
            return;
          } else {
            result = objMod.getProp(result, prop[4]);
          }
        }
        if (prop.length === 4) {
          result = objMod.getProp(pc[prop[2]], [prop[3]]);
          if (result === '404') {
            res.status('404').end('Not Found');
            return;
          }
        }
        if (prop.length === 3) {
          if (prop[2] === 'volumes') {
            result = objMod.getHdd(pc);
            return res.json(result);
          }
          result = objMod.getProp(pc, prop[2]);
          if (result === '404') {
            res.status('404').end('Not Found');
            return;
          }
        }
        return res.json(result);
      } catch (err) {
        return res.status(500).json(err);
      }
    })
    .catch(err => {
      console.log('Чтото пошло не так:', err);
    });
});

app.get('/task3A/volumes', async (req, res, next) => {

  let pc = {};

  fetch(pcUrl)
    .then(async (response) => {
      pc = await response.json();
      try {
        let result = objMod.getHdd(pc);
        return res.json(result);
      } catch (err) {
        return res.status(500).json(err);
      }
    })
    .catch(err => {
      console.log('Чтото пошло не так:', err);
    });
});


app.get ('/task3A/pc-download', (req, res, next) => {
  let pc = {};

  fetch(pcUrl)
    .then(async (response) => {
      pc = await response.json();
      try {
        const result = await saveDataDb(pc);
        console.log(result);
        return res.json(result);
      } catch (err) {
        return res.status(500).json(err);
      }
    })
    .catch(err => {
      console.log('Чтото пошло не так:', err);
    });
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


