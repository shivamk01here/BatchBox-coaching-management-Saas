import { Kafka } from 'kafkajs';

export const setupKafkaConsumer = async () => {
  const kafka = new Kafka({ clientId: 'payment-service', brokers: ['localhost:9092'] });
  const consumer = kafka.consumer({ groupId: 'payment-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'invoice-paid' });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const payload = JSON.parse(message.value!.toString());
      console.log(`[KAFKA] Message received from ${topic}:`, payload);
    },
  });
};
