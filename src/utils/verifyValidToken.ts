function verifyValidToken(expirationDate: number) {
  const currentDate = new Date();
  const dateUTCToCompare = new Date(0);
  const expirationDateConverted =
    dateUTCToCompare.setUTCSeconds(expirationDate);

  if (currentDate.getTime() > expirationDateConverted) {
    return false;
  }

  return true;
}

export default verifyValidToken;
