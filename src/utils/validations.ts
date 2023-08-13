export const isValidEmail = (email: string) => {
  if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return false;
  }
  return true;
};

export const checkStringMinLength = (value: string, minLength: number) => {
  return String(value).length < minLength;
};

export const checkStringMaxLength = (value: string, maxLength: number) => {
  return String(value).length > maxLength;
};

export const isValidSGPhoneNo = (phone: string) => {
  if (phone && !/^[89]\d{7}$/.test(phone)) {
    return false;
  }
  return true;
};
