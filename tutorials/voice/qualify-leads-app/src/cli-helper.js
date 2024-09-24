import { SinchClient, Voice } from '@sinch/sdk-core';
import inquirer from 'inquirer';

/* eslint-disable valid-jsdoc */

/**
 * A helper class to manage command-line interactions for making a call using Sinch Voice API.
 */
export class CliHelper {

  /**
   * @param {import('@sinch/sdk-core').SinchClientParameters} sinchClientParameter - The Sinch client parameters needed to authenticate API requests.
   */
  constructor(sinchClientParameter) {
    this.sinchClient = new SinchClient(sinchClientParameter);
  }

  /**
   * Starts the process of initiating a phone call.
   * @param {string} sinchNumber - The Sinch number to be used as the CLI (Caller Line Identification) during the call.
   * @return {Promise<void>}
   */
  async start(sinchNumber) {
    const e164Number = await this.promptPhoneNumber();
    await this.proceedCallout(sinchNumber, e164Number);
    // Once the call has been placed, prompt again for a number to call
    await this.start(sinchNumber);
  }

  /**
   * Prompts the user to enter a phone number in E.164 format.
   * @return {Promise<string>} - The entered phone number.
   */
  async promptPhoneNumber() {
    const userInput = await inquirer.prompt([
      {
        type: 'input',
        name: 'phoneNumber',
        message: 'Enter the phone number you want to call (E.164 format):',
        validate: (input) => input ? true : 'Phone number cannot be empty.',
      },
    ]);

    return userInput.phoneNumber;
  }

  /**
   * Initiates a custom callout request to the provided phone number using the Sinch number.
   * @param {string} sinchNumber - The Sinch number to be used as the CLI (Caller Line Identification).
   * @param {string} phoneNumber - The phone number to call in E.164 format.
   * @return {Promise<void>}
   */
  async proceedCallout(sinchNumber, phoneNumber) {
    /** @type {Voice.CustomCalloutRequestData} */
    const requestData = {
      customCalloutRequestBody: {
        method: 'customCallout',
        customCallout: {
          ice: Voice.customCalloutHelper.formatIceResponse(
            Voice.iceActionHelper.connectPstn({
              number: phoneNumber,
              cli: sinchNumber,
              amd: {
                enabled: true,
              },
            }),
          ),
        },
      },
    };

    const response = await this.sinchClient.voice.callouts.custom(requestData);
    console.log(`Callout response: ${JSON.stringify(response, null, 2)}`);
  }
}
