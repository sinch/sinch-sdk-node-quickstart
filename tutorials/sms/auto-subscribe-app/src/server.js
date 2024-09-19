import express from 'express';
import { SinchClient } from '@sinch/sdk-core';
import { autoSubscribeController } from './auto-subscribe-controller.js';
import { gracefulShutdown, readCredentials } from './utils.js';
import { deleteGroup } from './group-lifecycle-manager.js';
import * as dotenv from 'dotenv';
dotenv.config();

// Initializes an Express application and a Sinch client, and starts the server.
//
// The server exposes an API endpoint to handle auto-subscription logic through the
// auto-subscribe-controller and ensures the group is deleted on server shutdown.

const app = express();

/**
 * The port on which the Express server listens. Defaults to 3001 if not provided in the environment variables.
 * @constant {number}
 */
const port = process.env.port || 3001;

/**
 * Initializes a Sinch client using credentials read from the environment.
 * @type {SinchClient}
 */
const sinchClient = new SinchClient(readCredentials());

// Middleware to parse incoming JSON requests. */
app.use(express.json());

// Registers the auto-subscribe controller to the Express app. */
autoSubscribeController(app, sinchClient);

// Starts the Express server on the specified port and logs a message when it's ready.
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Sets up graceful shutdown for the server, ensuring the group is deleted using the Sinch SMS groups API before the server stops.
gracefulShutdown(server, async () => {
  await deleteGroup(sinchClient.sms.groups);
});
