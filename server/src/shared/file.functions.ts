import { extname } from 'path';

export const imageFileFilter = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
): void => {
  console.log(file.originalname);
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error, fileName: string) => void,
): void => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const time = new Date().getTime().toString();

  callback(null, `${name}-${time}${fileExtName}`);
};
