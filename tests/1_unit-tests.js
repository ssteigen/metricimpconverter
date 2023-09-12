const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('convertHandler should correctly read a whole number input', function() {
    assert.strictEqual(convertHandler.getNum('4gal'), 4);
  });

  test('convertHandler should correctly read a decimal number input', function() {
    assert.strictEqual(convertHandler.getNum('0.5km'), .5);
  });

  test('convertHandler should correctly read a fractional input', function() {
    assert.strictEqual(convertHandler.getNum('1/2km'), .5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.strictEqual(convertHandler.getNum('5.4/3lbs'), 1.8);
  });
  
  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function() {
    assert.strictEqual(convertHandler.getNum('3/7.2/4kilomegagram'), 'invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function() {
    assert.strictEqual(convertHandler.getUnit('4gal'), 'gal');
    assert.strictEqual(convertHandler.getUnit('4L'), 'L');
    assert.strictEqual(convertHandler.getUnit('1/2mi'), 'mi');
    assert.strictEqual(convertHandler.getUnit('1/2km'), 'km');
    assert.strictEqual(convertHandler.getUnit('5.4/3lbs'), 'lbs');
    assert.strictEqual(convertHandler.getUnit('kg'), 'kg');
  });

  test('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.strictEqual(convertHandler.getUnit('3'), 'invalid unit');
    assert.strictEqual(convertHandler.getUnit('3min'), 'invalid unit');
    assert.strictEqual(convertHandler.getUnit('3/7.2/4kilomegagram'), 'invalid unit');
  });

  test('convertHandler should return the correct return unit for each valid input unit', function() {
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
    assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
    assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
    assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  test('convertHandler should correctly convert gal to L', function() {
    assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541);
  });

  test('convertHandler should correctly convert L to gal', function() {
    assert.strictEqual(convertHandler.convert(1, 'L'), 0.26417);
  });

  test('convertHandler should correctly convert mi to km', function() {
    assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934);
  });

  test('convertHandler should correctly convert km to mi', function() {
    assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137);
  });

  test('convertHandler should correctly convert lbs to kg', function() {
    assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359);
  });

  test('convertHandler should correctly convert kg to lbs', function() {
    assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462);
  });
});