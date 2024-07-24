import request from 'supertest';
import app from '../../../src';

describe('Test endpoint API / qr-transfer', () => {
  it('should return 200 and QR data if request is successful', async () => {
    const res = await request(app)
      .get('/api/v1.0/qr-pay')
      .set('Authorization', 'Bearer token')
      .expect(200);

    expect(res.body.message).toBe('QR code generated successfully');
    expect(res.body.data).toEqual({
      qrImage: 'string',
    });
  });

  it('should return 401 if user is not authenticated', async () => {
    const res = await request(app)
      .get('/api/v1.0/qr-pay')
      .expect(401);

    expect(res.body.message).toBe('User not have credentials');
  });

  // it('should return 500 if there is an error', async () => {
  //   const res = await request(app)
  //     .get('/api/v1.0/qr-pay')
  //     .set('Authorization', 'Bearer token')
  //     .expect(500);

  //   expect(res.body.message).toBe('Error generating QR');
  // });
});