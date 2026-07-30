export const b64 = (s) => Buffer.from(String(s)).toString('base64');

export const unb64 = (s) => {
  try {
    return parseInt(Buffer.from(s, 'base64').toString('utf8'), 10);
  } catch {
    return null;
  }
};
