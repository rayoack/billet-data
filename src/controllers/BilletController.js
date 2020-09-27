const bankBilletServices = require('../services/bankBillet/BankBilletServices');
const dealershipPaymentServices = require('../services/dealership/DealershipPaymentServices');

class BilletController {
  async showBilletData(req, res) {
    const { digitableLine } = req.body

    try {
      if(typeof digitableLine != 'string') throw new Error('Linha digitável inválida');
      
      // Removendo pontos, espaços e caracteres da linha digitável.
      const cleanDigitableLine = digitableLine.replace(/[. ^A-Z]/gi, '');

      let billetData = {};

      // Verificando se a linha digitável é de um título bancário ou pagamento de concessionária.
      if(cleanDigitableLine.length == 47) {

        // Validando os dígitos verificadores da linha digitável do título bancário.
        if(bankBilletServices.validateDigitableLineDVs(cleanDigitableLine)) {

          billetData.barCode = bankBilletServices.generateBarcode(cleanDigitableLine);
          
          if(billetData.barCode.length != 44)
            throw new Error('Erro ao gerar código de barras');

          if(!bankBilletServices.validateBarcodeDV(billetData.barCode))
            throw new Error('Dígito verificador do código de barras incorreto');

          billetData.dueDate = bankBilletServices.getBankBilletDueDate(billetData.barCode);
          billetData.value = bankBilletServices.getBankBilletValue(billetData.barCode)
        } else {
          throw new Error('Linha digitável inválida');
        }
      } else if (cleanDigitableLine.length == 48 && cleanDigitableLine[0] == 8) {

        if(dealershipPaymentServices.validateDigitableLineDVs(cleanDigitableLine)) {
          billetData.barCode = dealershipPaymentServices.generateBarcode(cleanDigitableLine);
        } else {
          throw new Error('Linha digitável inválida');
        }

      } else {
        throw new Error('Linha digitável com tamanho incorreto');
      }

      return res.json(billetData)
      
    } catch (error) {
      return res.status(400).json({ error: error.message });      
    }

    res.json(cleanDigitableLine);
  }
}

module.exports = new BilletController();