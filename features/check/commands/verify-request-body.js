const Joi = require('joi');

const constants = require('../constants');

const { NAME_MIN, NAME_MAX, PASSWORD_MAX, PASSWORD_MIN } = constants;
 
async function validateRegisterPayload(req, res, next) {
  
  return next();
}

module.exports = validateRegisterPayload;
