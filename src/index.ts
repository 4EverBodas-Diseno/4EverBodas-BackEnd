import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './auth/interfaces/http/routes/authRoutes';
import profileRoutes from './profile/interfaces/http/routes/profileRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
const mongoUrl = process.env.DB_MONGO_URL;
const mongoName = process.env.DB_MONGO_NAME;
if (!mongoUrl || !mongoName) {
    console.error('DB_MONGO_URL or DB_MONGO_NAME is undefined');
    process.exit(1);
}
mongoose.connect(mongoUrl + mongoName).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error while connecting with MongoDB', err);
});

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`);
});