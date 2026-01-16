import express from 'express';
import mealRoutes from './src/routes/mealRoutes';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/meals', mealRoutes);

const PORT = 3000;

app.listen(PORT, "0.0.0.0",() => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});