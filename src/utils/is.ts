export const isSSR = !(typeof window !== "undefined" && document !== undefined);

export const isDev = process.env.NODE_ENV === `development`;

export const isJson = (value) => {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
};
