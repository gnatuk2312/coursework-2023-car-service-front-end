export const removeNullKeys = <T>(obj: T): T => {
  const newObj: Partial<T> = {};

  for (const key in obj) {
    if (obj[key] !== null) newObj[key] = obj[key];
  }

  return newObj as T;
};
