const bankBilletServices = require('../services/bankBillet/BankBilletServices');

class BilletController {
  async showBilletData(req, res) {
    const { digitableLine } = req.body
    const cleanDigitableLine = digitableLine.replace(/[. ^A-Z]/gi, '');

    try {
      if(cleanDigitableLine.length == 47) {

        if(bankBilletServices.validateDigitableLineDVs(cleanDigitableLine)) {
          return res.json({result: true})
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