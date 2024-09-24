import { validateSignature } from './validateSignature.js';
import { SinchClient, SmsCallbackWebhooks } from '@sinch/sdk-core';
import { handleSmsEvent } from './serverBusinessLogic.js';
import * as dotenv from 'dotenv';
dotenv.config();

export const smsController = (app, sinchClientParameters) => {

  const sinchClient = new SinchClient(sinchClientParameters);
  const smsCallbackWebhooks = new SmsCallbackWebhooks();

  app.post('/SmsEvent', validateSignature, async (req, res) => {
    try {
      const event = smsCallbackWebhooks.parseEvent(req.body);
      if (event.type === 'mo_text') {
        await handleSmsEvent(event, sinchClient.sms);
      } else {
        res.status(400).json({ error: `Unexpected event type: ${event.type}` });
      }
    } catch (error) {
      console.error('Error parsing event:', error);
      return res.status(400).json({ error: 'Invalid event format' });
    }
    res.status(200).json();
  });
};
