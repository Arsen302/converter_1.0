import * as amqp from 'amqplib';

class MessageBroker {
  async messageProducer() {
    amqp.connect('amqp://localhost', (connError, connection) => {
      if (connError) {
        connError;
      }
      connection.createChannel((chanError, channel) => {
        if (chanError) {
          throw chanError;
        }
        const queue = 'data_queue';

        channel.assertQueue(queue, {
          durable: true,
        });
        channel.prefetch(1);
        console.log(
          ' [*] Waiting for messages in %s. To exit press CTRL+C',
          queue
        );

        channel.consume(
          queue,
          (message) => {
            const secs = message.content.toString().split('.').length - 1;

            console.log(' [x] Received %s', message.content.toString());
            setTimeout(() => {
              console.log('[x] Done');
              channel.ack(message);
            }, secs * 1000);
          },
          {
            noAck: false,
          }
        );
      });
    });
  }

  async messageConsumer() {
    amqp.connect('amqp://localhost', (connError, connection) => {
      if (connError) {
        connError;
      }
      connection.createChannel((chanError, channel) => {
        if (chanError) {
          throw chanError;
        }
        const queue = 'data_queue';

        channel.assertQueue(queue, {
          durable: true,
        });
        channel.prefetch(1);
        console.log(
          ' [*] Waiting for messages in %s. To exit press CTRL+C',
          queue
        );

        channel.consume(
          queue,
          (message) => {
            const secs = message.content.toString().split('.').length - 1;

            console.log(' [x] Received %s', message.content.toString());
            setTimeout(() => {
              console.log('[x] Done');
              channel.ack(message);
            }, secs * 1000);
          },
          {
            noAck: false,
          }
        );
      });
    });
  }
}

export default new MessageBroker();
