import express from 'express';
import {test} from '../controllers/authcontroller.js'

const router = express.Router();

 
 router.get('/test/:tester_id', test)

 export default router