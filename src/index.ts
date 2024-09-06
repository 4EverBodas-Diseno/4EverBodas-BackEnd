import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Conexión a MongoDB
const mongoUrl = process.env.DB_MONGO_URL;
const mongoName = process.env.DB_MONGO_NAME;
if (!mongoUrl || !mongoName) {
    console.error('DB_MONGO_URL or DB_MONGO_NAME is undefined');
    process.exit(1);
}
mongoose.connect(mongoUrl + mongoName).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error al conectar a MongoDB', err);
});

// Rutas
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});