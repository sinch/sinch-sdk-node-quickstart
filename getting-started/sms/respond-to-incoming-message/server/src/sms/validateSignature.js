export const validateSignature = (req, res, next) => {
  console.log('Validating SMS event signature.');
  // Do nothing as this feature is not supported yet.
  next();
};
