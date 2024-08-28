import request from 'supertest';
import app from '../../../src';

describe('Test endpoint API QRIS Pay', () => {
  it('should return 200 and QRIS data if request is successful', async () => {
    return request(app)
      .post('/api/v1.0/qr-pay')
      .set('Authorization', 'Bearer token')
      .send({ amount: 100000 })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('QRIS code generated successfully');
        expect(res.body.data).toEqual({
          qrImage: 'string',
          expiresAt: 111111
        });
      })
  });
});