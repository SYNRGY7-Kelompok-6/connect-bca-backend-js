import request from 'supertest';
import app from '../../../src';

describe('Test endpoint API / qr-transfer', () => {
  it('should return 200 and QR data if request is successful', async () => {
    const res = await request(app)
      .post('/api/v1.0/qr-transfer')
      .set('Authorization', 'Bearer token')
      .send({ amount: 100000 })
      .expect(200);

    expect(res.body.message).toBe('QR code generated successfully');
    expect(res.body.data).toEqual({
      qrImage: 'string',
      expiresAt: 111111
    });
  });

  it('should return 400 if amount is missing', async () => {
    const res = await request(app)
      .post('/api/v1.0/qr-transfer')
      .set('Authorization', 'Bearer token')
      .expect(400);

    expect(res.body.message).toBe('Amount is required');
  });

  it('should return 401 if user is not authenticated', async () => {
    const res = await request(app)
      .post('/api/v1.0/qr-transfer')
      .send({ amount: 100000 })
      .expect(401);

    expect(res.body.message).toBe('User not have credentials');
  });

  // it('should return 500 if there is an error', async () => {
  //   const res = await request(app)
  //     .post('/api/v1.0/qr-transfer')
  //     .set('Authorization', 'Bearer token')
  //     .send({ amount: 100000 })
  //     .expect(500);

  //   expect(res.body.message).toBe('Error generating QR');
  // });
});