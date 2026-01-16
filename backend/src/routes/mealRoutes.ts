import { Router } from 'express';
import {
  addMeal,
  getMeals,
  getMealById,
  deleteMeal,
  getRandomMeal
} from '../controllers/mealController';

const router = Router();

router.get('/', getMeals);
router.get('/random', getRandomMeal);
router.get('/:id', getMealById);
router.post('/', addMeal);
router.delete('/:id', deleteMeal);
export default router;