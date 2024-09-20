/* eslint-disable valid-jsdoc */

/**
 * Reads the Sinch client credentials from environment variables and constructs
 * the Sinch client parameters object.
 *
 * @return {import('@sinch/sdk-core').SinchClientParameters} An object containing the Sinch client parameters to use validate the event headers
 */
export const readCredentials = () => {
  return {
    applicationKey: process.env.SINCH_APPLICATION_KEY,
    applicationSecret: process.env.SINCH_APPLICATION_SECRET,
  };
};

/**
 * Middleware function to validate the events authentication headers.
 *
 * @param {import('@sinch/sdk-core').VoiceCallbackWebhooks} voiceCallbackWebhooks - The Sinch VoiceCallbackWebhooks instance used for validation. It must have been initialized with the same Voice App credentials as the ones used to perform the callout.
 */
export const validateSignature = (voiceCallbackWebhooks) => {
  return (req, res, next) => {
    const isValid = voiceCallbackWebhooks.validateAuthenticationHeader(
      req.headers, req.rawBody, '/VoiceEvent', 'POST',
    );

    if (!isValid) {
      return res.status(401).send('Unauthorized');
    }

    next();
  };
};
