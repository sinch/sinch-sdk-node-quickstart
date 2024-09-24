// eslint-disable-next-line no-unused-vars
import { VoiceService } from '@sinch/sdk-core';
import { execute } from './snippet.js';

/**
 * Class representing a quickstart for using the Voice API.
 */
export class VoiceQuickstart {
  /**
   * @param { VoiceService } voiceService - the VoiceService instance from the Sinch SDK containing the API methods
   */
  constructor(voiceService) {
    this.voiceService = voiceService;

    // replace by your code and business logic
    execute(this.voiceService);
  }
}
