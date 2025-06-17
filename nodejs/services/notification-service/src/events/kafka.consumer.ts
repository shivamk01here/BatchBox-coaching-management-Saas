import { Kafka } from 'kafkajs';
import { sendWhatsappNotification } from '../services/whatsapp.service';

export const setupKafkaConsumer = async () => {
  const kafka = new Kafka({ clientId: 'notification-service', brokers: ['localhost:9092'] });
  const consumer = kafka.consumer({ groupId: 'notification-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'payment-success' });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const payload = JSON.parse(message.value!.toString());
      console.log(`[KAFKA] Notification Event from ${topic}:`, payload);

      // Send WhatsApp Notification
      await sendWhatsappNotification(payload);
    },
  });
};
