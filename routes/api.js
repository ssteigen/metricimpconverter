'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    // If no query params was provided, do nothing.
    if (!req.query) return;

    // If there is no query param named 'input', do nothing.
    if (!req.query.input) return;

    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      res.send('invalid number and unit');
    }
    else if (initNum === 'invalid number') {
      res.send(initNum);
    }
    else if (initUnit === 'invalid unit') {
      res.send(initUnit);
    }
    
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    const initUnitString = convertHandler.spellOutUnit(initUnit);
    const returnUnitString = convertHandler.spellOutUnit(returnUnit);

    const string = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
    
    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });

};
