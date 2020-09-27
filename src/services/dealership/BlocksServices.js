class BlocksServices {
  moduleTen(blockNumbers, check = false) {
    if(!Array.isArray(blockNumbers)) throw new Error('Erro ao calcular bloco');

    let multiplier = 2;

    const total = blockNumbers.map(number => {
      let result = Number(number) * multiplier;
      if(result > 9) result = Math.floor(result / 10) + (result % 10);
      multiplier = multiplier == 2 ? 1 : 2;
      
      return result
    }).reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    
    const restOfDivision = (total % 10);
    
    return restOfDivision == 0 ? 0 : 10 - restOfDivision;
  }

  moduleEleven(blockNumbers) {
    if(!Array.isArray(blockNumbers)) throw new Error('Erro ao calcular bloco');

    let multiplier = 2;

    const total = barcodeNumbers.map(number => {
      let result = Number(number) * multiplier;
      multiplier = multiplier == 9 ? 2 : multiplier += 1;
      return result;
    }).reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    if(total % 11 == 0 || total % 11 == 1) {
      return 0;
    } else if(total % 11 == 10) {
      return 1
    } else {
      return 11 - (sum % 11);
    }
  }
}

module.exports = new BlocksServices();