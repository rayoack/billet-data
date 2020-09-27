const fieldsServices = require('./FieldsServices');

class BankBilletServices {

  // Método que fará o calculo do dígito verificador / Módulo 10
  validateDigitableLineDVs(digitableLine) {
    // Pegando os campos livres e os digitos verificadores de cada campo.
    // Transformando os campos em um array para mapear cada números posteriormente.
    const fieldOne = digitableLine.slice(0, 9).split('');
    const dvOne = Number(digitableLine.slice(9, 10));
    const fieldTwo = digitableLine.slice(10, 20).split('');
    const dvTwo = Number(digitableLine.slice(20, 21));
    const fieldThree = digitableLine.slice(21, 31).split('');
    const dvThree = Number(digitableLine.slice(31, 32));

    // Multiplicando cada número e somando para obter o valor total do campo.
    const fieldOneTotal = fieldsServices.fieldTotal(fieldOne, 2);
    const fieldTwoTotal = fieldsServices.fieldTotal(fieldTwo, 1);
    const fieldThreeTotal = fieldsServices.fieldTotal(fieldThree, 1);

    // Validando o dígito verificador.
    const digitOneIsValid = fieldsServices.validateDV(fieldOneTotal, dvOne);
    const digitTwoIsValid = fieldsServices.validateDV(fieldTwoTotal, dvTwo);
    const digitThreeIsValid = fieldsServices.validateDV(fieldThreeTotal, dvThree);

    // Verificando se todos são validos.
    const result = Array(digitOneIsValid, digitTwoIsValid, digitThreeIsValid)
      .every(value => value == true)
    
    return result;
  }

  generateBarcode(digitableLine) {
    const bankAndCurrencyCode = digitableLine.slice(0, 4);
    const positionOne = digitableLine.slice(4, 9);
    const positionTwo = digitableLine.slice(10, 20);
    const positionThree = digitableLine.slice(21, 31);
    const barCodeDigit = digitableLine.slice(31, 32);
    const dueDateAndValue = digitableLine.slice(33, 47);

    const barCode = `${bankAndCurrencyCode}${barCodeDigit}${dueDateAndValue}${positionOne}${positionTwo}${positionThree}`;

    return barCode;
  }
}

module.exports = new BankBilletServices();