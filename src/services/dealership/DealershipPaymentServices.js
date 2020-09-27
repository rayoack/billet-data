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

    let digitOneIsValid, digitTwoIsValid, digitThreeIsValid, digitFourIsValid

    if (digitableLine[2] == '6' || digitableLine[2] == '7') {
      digitOneIsValid = blocksServices.moduleTen(blockOne) == dvOne;
      digitTwoIsValid = blocksServices.moduleTen(blockTwo) == dvTwo;
      digitThreeIsValid = blocksServices.moduleTen(blockThree) == dvThree;
      digitFourIsValid = blocksServices.moduleTen(blockFour) == dvFour;
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

  getBilletDueDate(barcode) {
    let dueDateCode;

    if (barcode[1] == '6') {
      dueDateCode = barcode.slice(26, 34);
    } else {
      dueDateCode = barcode.slice(19, 27);
      console.log()
    };

    let dueDate = `${dueDateCode[4]+dueDateCode[5]}/${dueDateCode[6]+dueDateCode[7]}/${dueDateCode[0]+dueDateCode[1]+dueDateCode[2]+dueDateCode[3]}`
    
    return new Date(dueDate) == 'Invalid Date' ?
      'Sem data de vencimento'
      : dueDate
  }
}

module.exports = new DealershipPaymentServices();