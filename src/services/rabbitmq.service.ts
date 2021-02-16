import * as amqp from 'amqplib/callback_api';

class MessageBroker {
  async messageProduce(file: string): Promise<void> {
    amqp.connect('amqp://localhost', (connError: any, conn: any) => {
      if (connError) {
        console.error('[AMQP]', connError.message);
      }

      conn.createChannel((chanError: any, channel: any) => {
        if (chanError.message !== 'Connection closing') {
          console.error('[AMQP] conn error', chanError.message);
        }

        const queue = 'data_queue';
        const data = file;

        channel.assertQueue(queue, {
          durable: true,
        });

        channel.sendToQueue(queue, Buffer.from(data), {
          persistent: true,
        });

        console.log('[x] Sent', data);

        setTimeout(() => {
          conn.close();
          console.log('Closing rabbitmq channel');
          process.exit(0);
        }, 500);
      });
    });
  }
}

export default new MessageBroker();
