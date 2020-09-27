const blocksServices = require('./BlocksServices');

class DealershipPaymentServices {
  validateDigitableLineDVs(digitableLine) {
    const blockOne = digitableLine.slice(0, 11).split('');
    const dvOne = Number(digitableLine.slice(11, 12));
    const blockTwo = digitableLine.slice(12, 23).split('');
    const dvTwo = Number(digitableLine.slice(20, 21));
    const blockThree = digitableLine.slice(21, 31).split('');
    const dvThree = Number(digitableLine.slice(31, 32));
    const blockFour= digitableLine.slice(21, 31).split('');
    const dvFour= Number(digitableLine.slice(31, 32));

    let digitOneIsValid
    let digitTwoIsValid
    let digitThreeIsValid
    let digitFourIsValid

    if (digitableLine[2] == '6' || digitableLine[2] == '7') {
      digitOneIsValid = blocksServices.moduleTen(blockOne) != dvOne;
      digitTwoIsValid = blocksServices.moduleTen(blockTwo) != dvTwo;
      digitThreeIsValid = blocksServices.moduleTen(blockThree) != dvThree;
      digitFourIsValid = blocksServices.moduleTen(blockFour) != dvFour;
    } else if (digitableLine[2] == '8' || digitableLine[2] == '9') {
      digitOneIsValid = blocksServices.moduleEleven(blockOne) != dvOne;
      digitTwoIsValid = blocksServices.moduleEleven(blockTwo) != dvTwo;
      digitThreeIsValid = blocksServices.moduleEleven(blockThree) != dvThree;
      digitFourIsValid = blocksServices.moduleEleven(blockFour) != dvFour;
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
}

module.exports = new DealershipPaymentServices();