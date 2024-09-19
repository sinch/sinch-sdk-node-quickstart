// eslint-disable-next-line no-unused-vars
import { SmsRegion } from '@sinch/sdk-core';

/* eslint-disable valid-jsdoc */

/**
 * Reads the Sinch client credentials from environment variables and constructs
 * the Sinch client parameters object.
 *
 * @return {import('@sinch/sdk-core').SinchClientParameters} An object containing the Sinch client parameters to use either the default gateway with the projectId either the legacy one with the servicePlanId
 */
export const readCredentials = () => {
  return {
    projectId: process.env.SINCH_PROJECT_ID,
    keyId: process.env.SINCH_KEY_ID,
    keySecret: process.env.SINCH_KEY_SECRET,
    servicePlanId: process.env.SINCH_SERVICE_PLAN_ID,
    apiToken: process.env.SINCH_API_TOKEN,
    smsRegion: process.env.SMS_REGION || SmsRegion.UNITED_STATES,
  };

};

/**
 * Middleware that performs the signature validation process for SMS event.
 *
 * Currently, this function is a placeholder and does not validate signatures.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {Function} next - The next middleware function to call.
 */
export const validateSignature = (req, res, next) => {
  console.log('Validating SMS event signature.');
  // Do nothing as this feature is not supported yet.
  next();
};

/**
 * Sets up graceful shutdown handling for the server.
 *
 * When a termination signal is received (`SIGINT` or `SIGTERM`), it triggers the
 * shutdown process, which includes running the provided cleanup callback before closing
 * the server and exiting the process.
 *
 * @param {import('http').Server} server - The HTTP server instance to be shut down.
 * @param {Function} cleanupCallback - An asynchronous function that performs cleanup actions.
 */
export const gracefulShutdown = (server, cleanupCallback) => {

  const shutdown = async () => {
    console.log('Shutting down server...');
    await cleanupCallback();
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};
