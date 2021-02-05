// здесь класс rabbitmq должен получать сообщения и файлы на конверт
import * as multer from 'multer';

const convertImage = async (photo) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb): void => {
      cb(null, '/src/uploads');
    },
    filename: (req, file, cb): void => {
      cb(null, file.fieldname + '-' + Date.now() + file.filename);
    },
  });

  const upload = await multer({ storage: storage });
};

export default convertImage;
