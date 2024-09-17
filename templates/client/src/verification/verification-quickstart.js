// eslint-disable-next-line no-unused-vars
import { VerificationService } from '@sinch/sdk-core';
import { execute } from './snippet.js';

/**
 * Class representing a quickstart for using the Verification API.
 */
export class VerificationQuickstart {
  /**
   * @param { VerificationService } verificationService - the VerificationService instance from the Sinch SDK containing the API methods
   */
  constructor(verificationService) {
    this.verificationService = verificationService;

    // replace by your code and business logic
    execute(this.verificationService);
  }
}
