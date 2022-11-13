// TODO: Refactor function to make clear what each step does
export const sanitizeFloatInput = (floatStr) => {
  const splittedNumber = floatStr.split('.');
  let sanitizedInput = splittedNumber[0];

  if (splittedNumber.length) {
    sanitizedInput = splittedNumber.splice(0, 2).join('.') + splittedNumber.join('');
  }

  sanitizedInput = sanitizedInput.replace(/[^\d\.]/gi, '') || '';

  if (sanitizedInput !== '' && sanitizedInput[sanitizedInput.length - 1] !== '.') {
    sanitizedInput = parseFloat(sanitizedInput);
  }

  return sanitizedInput;
};
