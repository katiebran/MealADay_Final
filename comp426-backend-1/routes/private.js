import express from "express";

import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";
import {authenticateUser} from "../middlewares/auth";

export const router = express.Router();
export const prefix = '/private';

const {privateStore} = require('../data/DataStore');
// const cors = require('cors');

// var corsOptions = {
//   origin: 'http://localhost:3004',
//   credentials: true
// }

/**
 * Every request to this route needs
 * to be made from an authenticated user.
 */
router.use(authenticateUser);

router.get('/*', parseGet, function (req, res) {
  const result = req.handleGet(privateStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});

router.post('/*', parsePost, function (req, res) {
  const result = req.handlePost(privateStore);
  if (typeof result !== 'undefined') {
    res.send({result})
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3004');
  }
});

router.delete('/*', parseDelete, function (req, res) {
  const result = req.handleDelete(privateStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});



