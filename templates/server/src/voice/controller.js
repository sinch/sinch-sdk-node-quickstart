import { VoiceCallbackWebhooks } from '@sinch/sdk-core';
import {
  handleAnsweredCallEvent,
  handleDisconnectedCallEvent,
  handleIncomingCallEvent,
  handleNotifyEvent,
  handlePromptInputEvent,
} from './serverBusinessLogic.js';

export const voiceController = (app) => {

  const applicationKey = process.env.SINCH_APPLICATION_KEY;
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET;

  const voiceCallbackWebhooks = new VoiceCallbackWebhooks({
    applicationKey,
    applicationSecret,
  });

  app.post('/VoiceEvent', async (req, res) => {

    // Ensure the authentication is valid before processing the request
    const validAuth = voiceCallbackWebhooks.validateAuthenticationHeader(
      req.headers,
      req.rawBody,
      '/VoiceEvent',
      'POST',
    );

    // Authentication header failed
    if (!validAuth) {
      return res.status(401).json();
    }

    // Parse the request payload
    const event = voiceCallbackWebhooks.parseEvent(req.body);

    // Let the business layer process the request
    let response;
    switch (event.event) {
      case 'ice':
        response = handleIncomingCallEvent(event);
        break;
      case 'ace':
        response = handleAnsweredCallEvent(event);
        break;
      case 'pie':
        response = handlePromptInputEvent(event);
        break;
      case 'dice':
        response = handleDisconnectedCallEvent(event);
        break;
      case 'notify':
        response = handleNotifyEvent(event);
        break;
      default:
        res.status(500).json({ error: 'Unsupported event type' });
    }

    console.log(`JSON response:\n${JSON.stringify(response, null, 2)}`);

    return res.status(200).json(response);
  });
};
