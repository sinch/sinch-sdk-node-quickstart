import { VerificationCallbackWebhooks } from '@sinch/sdk-core';
import { handleVerificationRequestEvent, handleVerificationResultEvent } from './serverBusinessLogic.js';

export const verificationController = (app) => {

  const applicationKey = process.env.SINCH_APPLICATION_KEY;
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET;

  const verificationCallbackWebhooks = new VerificationCallbackWebhooks({
    applicationKey,
    applicationSecret,
  });

  app.post('/VerificationEvent', async (req, res) => {

    // Ensure the authentication is valid before processing the request
    const validAuth = verificationCallbackWebhooks.validateAuthenticationHeader(
      req.headers,
      req.rawBody,
      '/VerificationEvent',
      'POST',
    );

    // Authentication header failed
    if (!validAuth) {
      return res.status(401).json();
    }

    // Parse the request payload
    const event = verificationCallbackWebhooks.parseEvent(req.body);

    // Let the business layer process the request
    let response;
    switch (event.event) {
      case 'VerificationRequestEvent':
        response = handleVerificationRequestEvent(event);
        break;
      case 'VerificationResultEvent':
        response = handleVerificationResultEvent(event);
        break;
      default:
        res.status(500).json({ error: 'Unsupported event type' });
    }

    console.log(`JSON response:\n${JSON.stringify(response, null, 2)}`);

    return res.status(200).json(response);
  });
};
