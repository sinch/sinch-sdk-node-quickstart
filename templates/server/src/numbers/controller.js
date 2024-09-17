import { NumbersCallbackWebhooks } from '@sinch/sdk-core';
import { handleNumbersEvent } from './serverBusinessLogic.js';

export const numbersController = (app) => {

  const callbackSecret = process.env.NUMBERS_WEBHOOK_SECRET || '';
  const numbersCallbackWebhooks = new NumbersCallbackWebhooks(callbackSecret);

  app.post('/NumbersEvent', async (req, res) => {

    // Ensure the authentication is valid before processing the request
    const validAuth = numbersCallbackWebhooks.validateAuthenticationHeader(
      req.headers,
      req.rawBody,
    );

    // Authentication header failed
    if (!validAuth) {
      return res.status(401).json();
    }

    // Parse the request payload
    const event = numbersCallbackWebhooks.parseEvent(req.body);

    // Let the business layer process the request
    await handleNumbersEvent(event);

    return res.status(200).json();
  });
};
