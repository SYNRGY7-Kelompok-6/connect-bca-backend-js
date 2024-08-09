import jwt, { VerifyOptions } from 'jsonwebtoken';

export const verifyToken = (token: string) => {
  const jwtSecretToken: string = process.env.JWT_SECRET_TOKEN || 'secret-token';
  const options: VerifyOptions = {};
  
  return jwt.verify(token, jwtSecretToken, options);
}

export const verifyTokenPin = (token: string) => {
  const jwtSecretToken: string = process.env.JWT_TRANSACTION_SECRET_TOKEN || 'secret-token';
  const options: VerifyOptions = {};
  
  return jwt.verify(token, jwtSecretToken, options);
}