const bankBilletServices = require('../services/bankBillet/BankBilletServices');

class BilletController {
  async showBilletData(req, res) {
    const { digitableLine } = req.body
    // Removendo pontos, espaços e caracteres da linha digitável.
    const cleanDigitableLine = digitableLine.replace(/[. ^A-Z]/gi, '');

    try {
      let billetData = {};

      // Verificando se a linha digitável é de um título bancário ou pagamento de concessionária.
      if(cleanDigitableLine.length == 47) {

        // Validando os dígitos verificadores da linha digitável do título bancário.
        if(bankBilletServices.validateDigitableLineDVs(cleanDigitableLine)) {
          // Gerando código de barras
          billetData.barCode = bankBilletServices.generateBarcode(cleanDigitableLine)

          // Verificando se o código de barras é válido
          if(billetData.barCode.length != 44) throw new Error('Erro ao gerar código de barras');

          return res.json(billetData)
        } else {
          throw new Error('Linha digitável inválida');
        }
      } else if (cleanDigitableLine.length == 48) {
        return res.json({ok: 'ok'})
      } else {
        throw new Error('Linha digitável inválida');
      }
      
    } catch (error) {
      return res.status(400).json({ error: error.message });      
    }

    res.json(cleanDigitableLine);
  }
}

module.exports = new BilletController();