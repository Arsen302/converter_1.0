// здесь класс rabbitmq должен получать сообщения и файлы на конверт
import * as multer from 'multer';
import messageBroker from 'src/services/rabbitmq.service';

const convertImage = async (photo): Promise<void> => {
  messageBroker.messageConsumer();
  const storage = await multer.diskStorage({
    destination: (req, file, callback): void => {
      callback(null, '/src/uploads');
    },
    filename: (req, file, callback): void => {
      callback(null, file.fieldname + '-' + Date.now() + file.filename);
    },
  });

  const upload = await multer({ storage: storage }).single('image');
};

export default convertImage;
