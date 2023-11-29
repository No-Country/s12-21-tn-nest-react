import * as CryptoJS from 'crypto-js';

export const encrypt = async (pass: string) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(pass),
    'AutenticationsNets2023+.',
  ).toString();
};

export const compare = async (passworSearch: string, passwordDb: string) => {
  const passInBytes = CryptoJS.AES.decrypt(
    passwordDb,
    'AutenticationsNets2023+.',
  ).toString(CryptoJS.enc.Utf8);
  const PassDescriptada = passInBytes;
  if (
    passworSearch.replace(/['"]+/g, '') ===
    PassDescriptada.replace(/['"]+/g, '')
  ) {
    return true;
  } else {
    return false;
  }
};
