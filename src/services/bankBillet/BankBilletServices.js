const fieldsServices = require('./FieldsServices');

class BankBilletServices {

  // Método que fará o calculo do dígito verificador / Módulo 10
  validateDigitableLineDVs(digitableLine) {
    // Pegando os campos livres e os digitos verificadores de cada campo.
    // Transformando os campos em um array para mapear cada números posteriormente.
    // Revertendo a posição para que eles sejam multiplicados da direita para esquerda.
    const fieldOne = digitableLine.slice(0, 9).split('').reverse();
    const dvOne = Number(digitableLine.slice(9, 10));
    const fieldTwo = digitableLine.slice(10, 20).split('').reverse();
    const dvTwo = Number(digitableLine.slice(20, 21));
    const fieldThree = digitableLine.slice(21, 31).split('').reverse();
    const dvThree = Number(digitableLine.slice(31, 32));

    // Multiplicando cada número e somando para obter o valor total do campo.
    const fieldOneTotal = fieldsServices.fieldTotal(fieldOne);
    const fieldTwoTotal = fieldsServices.fieldTotal(fieldTwo);
    const fieldThreeTotal = fieldsServices.fieldTotal(fieldThree);

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
    const barCodeDigit = digitableLine.slice(32, 33);
    const dueDateAndValue = digitableLine.slice(33, 47);

    const barCode = `${bankAndCurrencyCode}${barCodeDigit}${dueDateAndValue}${positionOne}${positionTwo}${positionThree}`;

    return barCode;
  }

  validateBarcodeDV(barcode) {
    const barcodeDV = barcode.slice(4, 5);
    // Revertendo a posição para que eles sejam multiplicados da direita para esquerda.
    let barcodeNumbers = [...barcode.slice(0, 4), ...barcode.slice(5, 44)].reverse();
    let multiplier = 2;

    const barcodeTotal = barcodeNumbers.map(number => {
      let result = Number(number) * multiplier;
      multiplier = multiplier == 9 ? 2 : multiplier += 1;
      return result;
    }).reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    let calculatedDV = 11 - (barcodeTotal % 11);

    calculatedDV = (calculatedDV == 0 || calculatedDV == 10 || calculatedDV == 11) ? 1 : calculatedDV;

    return calculatedDV == barcodeDV;
  }
}

module.exports = new BankBilletServices();