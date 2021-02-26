import * as amqp from 'amqplib';
import * as express from 'express';

class MessageListner {
  async produce(file: any): Promise<void> {
    try {
      const conn = await amqp.connect(`${process.env.AMQP_URL}`);
      console.log('[x] Connection created...');

      const ch = await conn.createChannel();
      console.log('[x] Channel created...');

      const queue = 'data_queue';
      const msg = file;

      await ch.assertQueue(queue, {
        durable: false,
      });

      await ch.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
        persistent: true,
      });

      console.log('[x] Sent', msg);

      await ch.close();
      await conn.close();
      console.log('[x] Closing rabbitmq channel');
      process.exit(0);
    } catch (err) {
      console.error(err);
    }
  }
}

export default new MessageListner();
