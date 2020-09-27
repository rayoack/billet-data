const blocksServices = require('./BlocksServices');

class DealershipPaymentServices {
  validateDigitableLineDVs(digitableLine) {
    const blockOne = digitableLine.slice(0, 11).split('');
    const dvOne = Number(digitableLine.slice(11, 12));
    const blockTwo = digitableLine.slice(12, 23).split('');
    const dvTwo = Number(digitableLine.slice(23, 24));
    const blockThree = digitableLine.slice(24, 35).split('');
    const dvThree = Number(digitableLine.slice(35, 36));
    const blockFour= digitableLine.slice(36, 47).split('');
    const dvFour= Number(digitableLine.slice(47, 48));

    let digitOneIsValid
    let digitTwoIsValid
    let digitThreeIsValid
    let digitFourIsValid

    if (digitableLine[2] == '6' || digitableLine[2] == '7') {
      digitOneIsValid = blocksServices.moduleTen(blockOne, '1') == dvOne;
      digitTwoIsValid = blocksServices.moduleTen(blockTwo, '2') == dvTwo;
      digitThreeIsValid = blocksServices.moduleTen(blockThree, '3') == dvThree;
      digitFourIsValid = blocksServices.moduleTen(blockFour, '4') == dvFour;
    } else if (digitableLine[2] == '8' || digitableLine[2] == '9') {
      digitOneIsValid = blocksServices.moduleEleven(blockOne) == dvOne;
      digitTwoIsValid = blocksServices.moduleEleven(blockTwo) == dvTwo;
      digitThreeIsValid = blocksServices.moduleEleven(blockThree) == dvThree;
      digitFourIsValid = blocksServices.moduleEleven(blockFour) == dvFour;
    } else { 
      throw new Error('Identificação do valor real ou referência inválido');
    }

    return Array(digitOneIsValid, digitTwoIsValid, digitThreeIsValid, digitFourIsValid)
    .every(value => value == true)
  }
  
  generateBarcode(digitableLine) {
    const blockOne = digitableLine.slice(0, 11);
    const blockTwo = digitableLine.slice(12, 23);
    const blockThree = digitableLine.slice(24, 35);
    const blockFour = digitableLine.slice(36, 47);

    const barCode = `${blockOne}${blockTwo}${blockThree}${blockFour}`;

    return barCode;
  }

  validateBarcodeDV(barcode, digitableLine) {
    let calculatedDV
    const barcodeDV = Number(barcode.slice(3, 4));
    // Revertendo a posição para que eles sejam multiplicados da direita para esquerda.
    let barcodeNumbers = [...barcode.slice(0, 3), ...barcode.slice(4, 44)].reverse();

    if (digitableLine[2] == '6' || digitableLine[2] == '7') {
      calculatedDV = blocksServices.moduleTen(barcodeNumbers);
    } else {
      calculatedDV = blocksServices.moduleEleven(barcodeNumbers);
    }
    
    return calculatedDV == barcodeDV;
  }
}

module.exports = new DealershipPaymentServices();