export const qrisExpire = (seconds: number): number => {
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + seconds);
  const expirationTimestamp = expirationDate.getTime();

  return expirationTimestamp;
}

export const isExpired = (expiresAt: number): boolean => {
  const expiresAtDate = new Date(expiresAt);
  const now = new Date();

  return now > expiresAtDate;
}