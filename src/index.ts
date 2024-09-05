import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/4everbodas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions).then(() => {
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