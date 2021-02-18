import * as amqp from 'amqplib/callback_api';

// RabbitMQ:
// https://www.youtube.com/watch?v=KLUJyrqlZ-w&t=485s
// https://www.youtube.com/watch?v=Cie5v59mrTg

class MessageBroker {
  // try writing with callback syntax

  async messageProduce(file: any): Promise<void> {
    await amqp.connect('amqp://localhost:5672', (err: any, conn: any) => {
      if (err) {
        console.error('We have a problem with connection...', err);
      }
      console.log('[x] Connection created...');
      conn.createChannel((err: any, ch: any) => {
        if (err) {
          console.error('We have a problem with creating channel...', err);
        }
        console.log('[x] Channel created...');
        const queue = 'data_queue';
        const data = file.file_path;
        ch.assertQueue(queue, {
          durable: false,
        });
        ch.sendToQueue(queue, Buffer.from(data), {
          persistent: true,
        });
        console.log('[x] Sent', data);
        setTimeout(() => {
          conn.close();
          console.log('[x] Closing rabbitmq channel');
          process.exit(0);
        }, 500);
      });
    });

    // try writing with async/await syntax

    //   try {
    //   const conn = await amqp.connect('amqp://localhost:5672', conn: any);
    //   console.log('[x] Connection created...');

    //   const ch = await conn.createChannel()
    //   console.log('[x] Channel created...');

    //   const queue = 'data_queue';
    //   const data = file.file_path;

    //   ch.assertQueue(queue, {
    //     durable: false,
    //   });

    //   ch.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
    //     persistent: true,
    //   });

    //   console.log('[x] Sent', data);

    //   setTimeout(() => {
    //     conn.close();
    //     console.log('[x] Closing rabbitmq channel');
    //     process.exit(0);
    //   }, 500);
    // }
  }
}

export default new MessageBroker();
