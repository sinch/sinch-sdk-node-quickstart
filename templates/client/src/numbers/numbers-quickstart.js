// eslint-disable-next-line no-unused-vars
import { NumbersService } from '@sinch/sdk-core';
import { execute } from './snippet.js';

/**
 * Class representing a quickstart for using the Numbers API.
 */
export class NumbersQuickstart {
  /**
   * @param { NumbersService } numbersService - the NumbersService instance from the Sinch SDK containing the API methods
   */
  constructor(numbersService) {
    this.numbersService = numbersService;

    // replace by your code and business logic
    execute(this.numbersService);
  }
}
