function ConvertHandler() {

  const regex = /(?<number>[0-9/.]+(?=[a-zA-Z]))?(?<unit>.*$)/;

  this.getNum = function(input) {
    // Grab any integer, decimal, or fraction from the input string.
    const match = input.match(regex).groups.number;

    // If no number was provided, assume the unit is 1.
    if (!match) return 1;

    // If the number contains multiple slashes, assume it is a double fraction.
    if (match.split("/").length - 1 > 1) return 'invalid number';

    // Evaluate the number or fraction so we get a float back.
    return eval(match);
  };

  this.getUnit = function(input) {
    let result;

    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    const match = input.toLowerCase().match(regex).groups.unit;

    if (!match) return 'invalid unit';

    if (validUnits.indexOf(match) > -1) {
      return (match === 'l') ? 'L' : match
    }
    else {
      return 'invalid unit';
    };
  };

  this.getReturnUnit = function(initUnit) {
    let result;

    switch (initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        result = 'invalid unit';
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      default:
        result = 'invalid unit';
    }

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initNum === 'invalid number') return initNum;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = 'invalid unit';
    }

    if (typeof (result) == 'number') {
      result = Math.round(result * 100000) / 100000;
    }

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };

}

module.exports = ConvertHandler;
