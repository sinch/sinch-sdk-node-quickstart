// eslint-disable-next-line no-unused-vars
import { SmsService } from '@sinch/sdk-core';
import { execute } from './snippet.js';

/**
 * Class representing a quickstart for using the SMS API.
 */
export class SmsQuickstart {
  /**
   * @param { SmsService } smsService - the SmsService instance from the Sinch SDK containing the API methods
   */
  constructor(smsService) {
    this.smsService = smsService;

    // replace by your code and business logic
    execute(this.smsService);
  }
}
