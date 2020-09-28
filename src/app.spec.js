const request = require('supertest');
const app = require('./app');

describe('Test bank billet', () => {
  it('should return the bank billet data', async () => {
    const res = await request(app)
      .post('/billet')
      .send({
        digitableLine: "34191.79001 01043.510047 91020.150008 5 83900000026000"
      });

      expect(res.body).toHaveProperty('barCode');
      expect(res.body).toEqual({
        barCode: "34195839000000260001790001043510049102015000",
        dueDate: "26/9/2020",
        value: "R$260.00"
      });
  });

  it('should give error because the digit checked of barcode is incorrect', async () => {
    const res = await request(app)
    .post('/billet')
    .send({
      digitableLine: "34191.79001 01043.510047 91020.150008 1 83900000026000"
    });

    expect(res.body).toHaveProperty('error');
    expect(res.body).toEqual({
      error: "Dígito verificador do código de barras incorreto"
    });
  });
});

describe('Test dealership payment', () => {
  it('should return dealership payment data', async () => {
    const res = await request(app)
      .post('/billet')
      .send({
        digitableLine: "89610000000 0 59980001011 9 05333201006 4 26000015744 6"
      });

      expect(res.body).toHaveProperty('barCode');
      expect(res.body).toEqual({
        barCode: "89610000000599800010110533320100626000015744",
        dueDate: "Sem data de vencimento",
        value: "R$59.98"
      });
  });

  it('should give error because the digit checked is incorrect', async () => {
    const res = await request(app)
    .post('/billet')
    .send({
      digitableLine: "89610000000 1 59980001011 9 05333201006 4 26000015744 6"
    });

    expect(res.body).toHaveProperty('error');
    expect(res.body).toEqual({
      error: "Linha digitável inválida"
    });
  });
});