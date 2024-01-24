import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable'
  );
}

let cachedConnection = null;

export async function connectToDatabase() {
 if (cachedConnection) {
    return cachedConnection;
 }

 const connection = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 });

 cachedConnection = connection;

 mongoose.connection.on('connected', () => console.log('conectado'));
 mongoose.connection.on('open', () => console.log('abierto'));
 mongoose.connection.on('disconnected', () => console.log('desconectado'));
 mongoose.connection.on('reconnected', () => console.log('reconectado'));
 mongoose.connection.on('disconnecting', () => console.log('desconectándose'));
 mongoose.connection.on('close', () => console.log('cerrado'));

 mongoose.connection.on('error', err => {
    console.error('Error de conexión', err);
 });

 return connection;
}