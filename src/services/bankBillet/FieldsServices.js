class FieldServices {
  fieldTotal(fieldNumbers, multiplier) {
    if(!Array.isArray(fieldNumbers)) return null;
    const total = fieldNumbers.map(number => {
      let result = Number(number) * multiplier;
      if(result > 9) result = Number(result.toString()[0]) + Number(result.toString()[1])
      multiplier = multiplier == 2 ? 1 : 2;
      
      return result;
    }).reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    return total;
  }

  validateDV(fieldTotal, digit) {
    let fieldDVResult = (Math.ceil(fieldTotal / 10) * 10) - fieldTotal;
    return fieldDVResult == digit;
  }
}

module.exports = new FieldServices();