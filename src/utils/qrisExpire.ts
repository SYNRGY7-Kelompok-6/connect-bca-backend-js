export const qrisExpire = (seconds: number) => {
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + seconds);
  const expirationTimestamp = expirationDate.getTime();

  return expirationTimestamp;
}