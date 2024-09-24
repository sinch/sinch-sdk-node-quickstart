import express from 'express';
import * as dotenv from 'dotenv';
import { readCredentials } from './utils.js';
import { captureRawBody } from './middleware/rawbody.js';
import { qualifyLeadsController } from './qualify-leads-controller.js';
import { CliHelper } from './cli-helper.js';
dotenv.config();

// Initializes an Express application and a Sinch client, and starts the server.
//
// The server exposes an API endpoint to handle the qualify-leads logic through the
// qualify-leads-controller.

const app = express();

/**
 * The port on which the Express server listens. Defaults to 3001 if not provided in the environment variables.
 * @constant {number}
 */
const port = process.env.port || 3001;

const sinchClientParameters = readCredentials();
export const sinchNumber = process.env.SINCH_NUMBER;

export const cliHelper = new CliHelper(sinchClientParameters);

// Middleware to parse incoming JSON requests and store the raw body. */
app.use(captureRawBody);

// Registers the qualify-leads controller to the Express app.
qualifyLeadsController(app, sinchClientParameters);

// Starts the Express server on the specified port and logs a message when it's ready.
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  // Start the Command Line Interface to simulate the intake of prospects' phone numbers
  cliHelper.start(sinchNumber);
});
