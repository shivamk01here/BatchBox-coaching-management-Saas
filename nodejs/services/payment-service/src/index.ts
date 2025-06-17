import express from 'express';
import paymentRoutes from './routes/payment.routes';
import { connectToDB } from './config/db';
import { setupKafkaConsumer } from './events/kafka.consumer';

const app = express();
app.use(express.json());

app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  console.log(`🚀 Payment service running on port ${PORT}`);
  await connectToDB();
  setupKafkaConsumer();
});
