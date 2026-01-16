import express from 'express';
import mealRoutes from './src/routes/mealRoutes';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/meals', mealRoutes);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});