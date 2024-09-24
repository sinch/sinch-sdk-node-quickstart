# Backend application built using Sinch Node.js SDK to handle incoming webhooks

This directory contains a server application based on the [Sinch Node.js SDK](https://github.com/sinch/sinch-sdk-node).

## Requirements

- [Node.js LTS](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Sinch account](https://dashboard.sinch.com/)
- [ngrok](https://ngrok.com/docs)

## Configuration
Edit the [.env](.env) file to set the parameters that will be used to configure the Express server and the controllers.

### Server port
*Default: 3001* 
 - `port`: the port to be used to listen to incoming requests. Default is `3001` if not set.

### Controller Configuration
 - Numbers controller: `NUMBERS_WEBHOOK_SECRET`. This value can be found thanks to the [Numbers API](https://developers.sinch.com/docs/numbers/api-reference/numbers/tag/Numbers-Callbacks/), using the `/callbackConfiguration` endpoint.
 - SMS controller: no support for header validation at the moment
 - Verification and Voice controllers: the incoming `Authorization` header is signed with the same credentials as when using the API:
   - `SINCH_APPLICATION_KEY`=Your Application Key
   - `SINCH_APPLICATION_SECRET`=Your Application Secret

## Usage

### Starting the server

1. Install the dependencies by running the command `npm install`.
2. Edit the `.env` file with your own parameters (see the paragraph above for details).
3. Run the code with one of the following commands:
  - `npm start`
  - `node src/server.js`

### Endpoints

When the server is up and running, the declared controllers will listen and respond to the following endpoints:

| Service      | Endpoint           |
|--------------|--------------------|
| Numbers      | /NumbersEvent      |
| SMS          | /SmsEvent          |
| Verification | /VerificationEvent |
| Voice        | /VoiceEvent        |

## Use ngrok to forward the event request to the local server

You can forward the request to your local server of the port it is listening to.

*Note: The `3001` value is coming from the default configuration and can be changed (see [Server port](#Server port) configuration section)*

```bash
ngrok http 3001
```

The `ngrok` output will contain something like:
```
ngrok                                                                           (Ctrl+C to quit)
...
Forwarding                    https://cafe-64-220-29-200.ngrok-free.app -> http://localhost:3001
```
The line
```
Forwarding                    https://cafe-64-220-29-200.ngrok-free.app -> http://localhost:3001
```
contains the "`https://cafe-64-220-29-200.ngrok-free.app`" value which will be used to determine the callback URLs, e.g.:
 - Numbers: https://cafe-64-220-29-200.ngrok-free.app/NumbersEvent
 - SMS: https://cafe-64-220-29-200.ngrok-free.app/SmsEvent
 - Verification: https://cafe-64-220-29-200.ngrok-free.app/VerificationEvent
 - Voice: https://cafe-64-220-29-200.ngrok-free.app/VoiceEvent

This value must be used to configure the callback URLs:
 - Numbers: the callback URL must be set at Number level with the parameter `callbackUrl` when renting a number or when updating a rented number with the API.
 - SMS: the callback URL must be configured at Service level on the [Sinch dashboard](https://dashboard.sinch.com/sms/api/services) in the "Callback URLs" section.
 - Verification: the callback URL must be configured at Application level on the [Sinch dashboard](https://dashboard.sinch.com/verification/apps) in the "Settings/Callback URL" section.
 - Voice: the callback URL must be configured at Application level on the [Sinch dashboard](https://dashboard.sinch.com/voice/apps) in the "Settings/Handle call events with" section.


