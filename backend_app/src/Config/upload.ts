const toStream = require('buffer-to-stream');
import { v2 } from 'cloudinary';
import { setupCloudinary } from './cloudinary';
export const uploadCloudinary = async (file: Express.Multer.File) => {
  setupCloudinary();
  return new Promise((resolve, reject) => {
    const upload = v2.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
    toStream(file.buffer).pipe(upload);
  });
};
