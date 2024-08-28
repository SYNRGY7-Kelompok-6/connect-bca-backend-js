import request from 'supertest';
import app from '../../../src';

describe('Test endpoint API QRIS Transfer', () => {
  it('should return 200 and QRIS data if request is successful', async () => {
    return request(app)
      .get('/api/v1.0/qr-transfer')
      .set('Authorization', 'Bearer token')
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