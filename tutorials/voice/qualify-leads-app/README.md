# Qualify-leads application sample

This directory contains some code related to the Node.js SDK tutorial: [qualify-leads](https://developers.sinch.com/docs/voice/tutorials/)

## DISCLAIMER

This tutorial is based on mixing a command-line function with a server-side backend service.

It is not a correct use of the CLI outside an educational purpose.

## Requirements

- [Node.js LTS](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Sinch account](https://dashboard.sinch.com/)
- [ngrok](https://ngrok.com/docs)

## Usage

### Configure application settings

Edit the [.env](.env) file to set the parameters that will be used to configure the Express server and the controller.

#### Sinch credentials

With the [Voice API](https://developers.sinch.com/docs/voice/), the incoming `Authorization` header is signed with the same credentials as when using the API:
- `SINCH_APPLICATION_KEY`=Your Application Key
- `SINCH_APPLICATION_SECRET`=Your Application Secret

#### Other parameters
- `SINCH_NUMBER`=The Sinch number associated to your [Voice App](https://dashboard.sinch.com/voice/apps).
- `SIP_ADDRESS`=If you are performing this tutorial with a SIP infrastructure, this is where you would enter your SIP address.

#### Server port

*Default: 3001*
- `port`: the port to be used to listen to incoming requests. Default is `3001` if not set.

### Starting the server locally

1. Edit the `.env` file with your own parameters (see the paragraph above for details).
2. Start the server with the following command:
```bash
npm start
```

### Use ngrok to forward requests to the local server

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
contains the "`https://cafe-64-220-29-200.ngrok-free.app`" value which will be used to determine the callback URL. 

With this example, given the fact the controller is exposing the path `/VoiceEvent`, the resulting callback URL to configure in your [Sinch dashboard](hhttps://dashboard.sinch.com/voice/apps) will be `https://cafe-64-220-29-200.ngrok-free.app/VoiceEvent` (adapt the value according to your ngrok and controller configurations).
