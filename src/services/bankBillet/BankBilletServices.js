const fieldsServices = require('./FieldsServices');

class BankBilletServices {
  validateDigitableLineDVs(digitableLine) {
    const fieldOne = digitableLine.substring(0, 9).split('');
    const dvOne = Number(digitableLine.substring(9, 10));
    const fieldTwo = digitableLine.substring(10, 20).split('');
    const dvTwo = Number(digitableLine.substring(20, 21));
    const fieldThree = digitableLine.substring(21, 31).split('');
    const dvThree = Number(digitableLine.substring(31, 32));

    const fieldOneTotal = fieldsServices.fieldTotal(fieldOne, 2);
    const fieldTwoTotal = fieldsServices.fieldTotal(fieldTwo, 1);
    const fieldThreeTotal = fieldsServices.fieldTotal(fieldThree, 1);

    const digitOneIsValid = fieldsServices.validateDV(fieldOneTotal, dvOne);
    const digitTwoIsValid = fieldsServices.validateDV(fieldTwoTotal, dvTwo);
    const digitThreeIsValid = fieldsServices.validateDV(fieldThreeTotal, dvThree);

    const result = Array(digitOneIsValid, digitTwoIsValid, digitThreeIsValid)
      .every(value => value == true)
    
    return result;
  }
}

module.exports = new BankBilletServices();