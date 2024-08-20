export const qrisExpire = (seconds: number): number => {
  const expirationDate: Date = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + seconds);
  const expirationTimestamp: number = expirationDate.getTime();

  return expirationTimestamp;
}

export const isExpired = (expiresAt: number): boolean => {
  const expiresAtDate: Date = new Date(expiresAt);
  const now: Date = new Date();

  return now > expiresAtDate;
}