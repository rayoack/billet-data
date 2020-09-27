class FieldServices {

  // Método para multiplicar cada número pelo seu peso
  // e somar para obter o valor total do campo.
  fieldTotal(fieldNumbers) {
    let multiplier = 2;
    if(!Array.isArray(fieldNumbers)) throw new Error('Erro ao calcular campo livre');
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
    // Subtraindo o valor total do campo pela dezena imediatamente posterior.
    let fieldDVResult = (Math.ceil(fieldTotal / 10) * 10) - fieldTotal;
    return fieldDVResult == digit;
  }
}

module.exports = new FieldServices();