# Client application based on Sinch Node.js SDK

This directory contains a client application based on the [Sinch Node.js SDK](https://github.com/sinch/sinch-sdk-node).

## Prerequisites

 - [Node.js LTS](https://nodejs.org/en)
 - [Sinch account](https://dashboard.sinch.com/)

## Configuration

Edit [.env](.env) file to set the credentials that will be used to configure the Sinch Client.
 - To use [Numbers](https://developers.sinch.com/docs/numbers/) or [SMS](https://developers.sinch.com/docs/sms/), you need to fill the following variables with the values from your Sinch account:
   - `SINCH_PROJECT_ID`=Your Sinch Project ID
   - `SINCH_KEY_ID`=Your Sinch Access Key ID
   - `SINCH_KEY_SECRET`=Your Sinch Key Secret associated to your Sinch Access Key
 - To use [Verification](https://developers.sinch.com/docs/verification/) or [Voice](https://developers.sinch.com/docs/voice/), you need to fill the following variables with the values from a Verification / Voice Application
   - `SINCH_APPLICATION_KEY`=Your Application Key
   - `SINCH_APPLICATION_SECRET`=Your Application Secret
 - To use [SMS](https://developers.sinch.com/docs/sms/) with regions others than US and EU, you need to use the "Service Plan ID" and fill the following variables with the values from your [Services](https://dashboard.sinch.com/sms/api/services) section in the dashboard:
   - `SINCH_SERVICE_PLAN_ID`=Your Service Plan ID
   - `SINCH_API_TOKEN`=Your API Token associated to your Service Plan ID
   - `SMS_REGION`=the SMS region (`au` / `br` / `ca`)

## Usage

1. Install the dependencies by running the command `npm install`.
2. Edit the `.env` file with your own credentials (see the paragraph above for details).
3. Replace the content of the `snippet.js` file of the API you want to use with your own code (you can find some snippets examples for each API endpoint in the following repository: https://github.com/sinch/sinch-sdk-node-snippets)
4. Run the code with one of the following commands:
  - `npm start`
  - `node src/app.js`
