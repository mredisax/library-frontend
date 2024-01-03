export const minLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

export const maxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

export const isPhoneNumber = (value: string): boolean => {
  return /^\d{9}$/.test(value);
};
