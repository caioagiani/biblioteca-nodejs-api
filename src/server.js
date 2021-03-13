import { app } from './app';
import './services/mongoose';

app.listen(process.env.PORT || 3333, () => console.log('SERVER: ON'));
