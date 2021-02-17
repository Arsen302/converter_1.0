import * as amqp from 'amqplib/callback_api';

// RabbitMQ:
// https://www.youtube.com/watch?v=KLUJyrqlZ-w&t=485s
// https://www.youtube.com/watch?v=Cie5v59mrTg

class MessageBroker {
  async messageProduce(file: any): Promise<void> {
    amqp.connect('amqp://localhost:5672', (connError: any, conn: any) => {
      if (connError) {
        console.error(connError);
      }
      console.log('[x] Connection created...');

      conn.createChannel((chanError: any, channel: any) => {
        if (chanError) {
          console.error(chanError);
        }
        console.log('[x] Channel created...');

        const queue = 'data_queue';
        const data = file.file_path;

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.sendToQueue(queue, Buffer.from(data), {
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
  }
}

export default new MessageBroker();
