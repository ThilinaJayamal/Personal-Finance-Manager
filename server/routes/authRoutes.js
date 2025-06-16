import express from 'express';
import auth from '../middleware/authMiddleware.js'
import { register, login, getCurrentUser, logout } from '../controllers/authController.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', auth, getCurrentUser);

export default router;