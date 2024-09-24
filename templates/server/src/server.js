import express from 'express';
import { numbersController } from './numbers/controller.js';
import { smsController } from './sms/controller.js';
import { verificationController } from './verification/controller.js';
import { voiceController } from './voice/controller.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.port || 3001;

// Middleware to capture the raw body and store it in req.rawBody
app.use((req, res, next) => {
  let data = '';

  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    req.rawBody = data;
    req.body = JSON.parse(data);
    next();
  });

  req.on('error', (err) => {
    next(err);
  });
});

numbersController(app);
smsController(app);
verificationController(app);
voiceController(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
