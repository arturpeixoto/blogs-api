// Código retirado do curso da Trybe

const checkRequiredFields = (receivedFields, requiredFields) => {
  for (let i = 0; i < requiredFields.length; i += 1) {
    const currentField = requiredFields[i];
    if (!(currentField in receivedFields)) {
      return 'Some required fields are missing';
    }
  }
};

module.exports = checkRequiredFields;