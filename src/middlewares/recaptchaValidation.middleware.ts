import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';
import fetch from 'node-fetch';
const axios = require('axios');

const recaptchaValidationMiddleware = (): RequestHandler => {
  return  async (req, res, next) => { 
    console.log(req.headers.recaptcha); 
    try {
      const response = await axios.get('https://www.google.com/recaptcha/api/siteverify?secret=6Lei3W0dAAAAACdbEIGKT3V25T_kjpqyDgzlB3-5&response='+req.headers.recaptcha+'=&remoteip');
      console.log(response.data);
      if(response.data.success == true){
        if(response.data.score > 0.3){
          next()
        }
        if(response.data.score < 0.1){
          res.json({
            code: '102',
            message: 'Bot User'
          })
        }
      }
      else{
        res.json({
          code: '102',
          message: 'Failed ! Invalid/Bot User'
        })
      }
    } catch (error) {
      console.error(error);
    }
    
    
  };
};

export default recaptchaValidationMiddleware;
