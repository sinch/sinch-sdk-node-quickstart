# Auto-subscribe application sample

This directory contains some code related to the Node.js SDK tutorial: [auto-subscribe](https://developers.sinch.com/docs/sms/tutorials/)

## Requirements

- [Node.js LTS](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Sinch account](https://dashboard.sinch.com/)
- [ngrok](https://ngrok.com/docs)

## Usage

### Configure application settings

Edit the [.env](.env) file to set the parameters that will be used to configure the Express server and the controller.

#### Sinch credentials

To use the [SMS API](https://developers.sinch.com/docs/sms/), you need to fill the following variables with the values from your Sinch account:
- `SINCH_PROJECT_ID`=Your Sinch Project ID
- `SINCH_KEY_ID`=Your Sinch Access Key ID
- `SINCH_KEY_SECRET`=Your Sinch Key Secret associated to your Sinch Access Key
- `SMS_REGION`=the SMS region (`us` / `eu`)

In case you want to use the [SMS API](https://developers.sinch.com/docs/sms/) with regions others than US and EU, you need to use the "Service Plan ID" and fill the following variables with the values from your [Services](https://dashboard.sinch.com/sms/api/services) section in the dashboard:
- `SINCH_SERVICE_PLAN_ID`=Your Service Plan ID
- `SINCH_API_TOKEN`=Your API Token associated to your Service Plan ID
- `SMS_REGION`=the SMS region (`au` / `br` / `ca`)

#### Server port

*Default: 3001*
- `port`: the port to be used to listen to incoming requests. Default is `3001` if not set.

### Starting the server locally

1. Install the dependencies by running the command `npm install`.
2. Edit the `.env` file with your own parameters (see the paragraph above for details).
3. Start the server with the following command:
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

With this example, given the fact the controller is exposing the path `/SmsEvent`, the resulting callback URL to configure in your [Sinch dashboard](https://dashboard.sinch.com/sms/api/services) will be `https://cafe-64-220-29-200.ngrok-free.app/SmsEvent` (adapt the value according to your ngrok and controller configurations).
