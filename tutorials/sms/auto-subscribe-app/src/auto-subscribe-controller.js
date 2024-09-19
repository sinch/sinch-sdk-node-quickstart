import { SmsCallbackWebhooks } from '@sinch/sdk-core';
import { validateSignature } from './utils.js';
import { processInboundEvent } from './auto-subsribe-service.js';

export const autoSubscribeController = (app, sinchClient) => {

  const smsCallbackWebhooks = new SmsCallbackWebhooks();

  /**
   * POST /SmsEvent - Handles incoming SMS events from the Sinch callback and processes "SUBSCRIBE" or "STOP" messages.
   *
   * @return {Promise<void>} - Sends a 200 status on success, or a 400 status if there's an error or unexpected event type.
   */
  app.post('/SmsEvent', validateSignature, async (req, res) => {
    try {
      // Parse the incoming SMS event from the request body
      const event = smsCallbackWebhooks.parseEvent(req.body);

      // Process the event if it is an MO (Mobile Originated) text message
      if (event.type === 'mo_text') {
        await processInboundEvent(event, sinchClient.sms);
      } else {
        res.status(400).json({ error: `Unexpected event type: ${event.type}` });
      }
    } catch (error) {
      console.error('Error processing event:', error);
      return res.status(400).json({ error: 'Invalid event format' });
    }
    res.status(200).json();
  });
};
