import { VoiceCallbackWebhooks } from '@sinch/sdk-core';
import { validateSignature } from './utils.js';
import { handleAnsweredCallEvent, handlePromptInputEvent } from './qualify-leads-service.js';

export const qualifyLeadsController = (app, sinchClientParameters) => {

  const voiceCallbackWebhooks = new VoiceCallbackWebhooks(sinchClientParameters);

  /**
   * POST /VoiceEvent - Handles incoming Voice events from the Sinch callback and processes ACEs and PIEs.
   *
   * @return {Promise<void>} - Sends a 200 status with the SVAML object containing the action and instructions to perform by Sinch.
   */
  app.post('/VoiceEvent', validateSignature(voiceCallbackWebhooks), async (req, res) => {
    let response = {};
    try {
      // Parse the incoming Voice event from the request body
      const event = voiceCallbackWebhooks.parseEvent(req.body);

      // Process the event if it is an Answered Call Event or a Prompt Input Event
      if (event.event === 'ace') {
        response = handleAnsweredCallEvent(event);
      }
      else if (event.event === 'pie') {
        response = handlePromptInputEvent(event);
      }
    } catch (error) {
      console.error('Error processing event:', error);
      return res.status(400).json({ error: 'Invalid event format' });
    }
    res.status(200).json(response);
  });

};
