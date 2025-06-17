import express from 'express';
import notificationRoutes from './routes/notification.routes';
import { setupKafkaConsumer } from './events/kafka.consumer';
import { env } from 'process';

const app = express();
app.use(express.json());

app.use('/api/notifications', notificationRoutes);

const PORT = env.PORT || 3003;

app.listen(PORT, async () => {
  console.log(`🚀 Notification service running on port ${PORT}`);
  setupKafkaConsumer();
});
