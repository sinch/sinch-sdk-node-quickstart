import { initSinchClient } from './sinchclient-helper.js';
import { NumbersQuickstart } from './numbers/numbers-quickstart.js';
import { SmsQuickstart } from './sms/sms-quickstart.js';
import { VerificationQuickstart } from './verification/verification-quickstart.js';
import { VoiceQuickstart } from './voice/voice-quickstart.js';

const sinchClient = initSinchClient();

try {
  new NumbersQuickstart(sinchClient.numbers);
  new SmsQuickstart(sinchClient.sms);
  new VerificationQuickstart(sinchClient.verification);
  new VoiceQuickstart(sinchClient.voice);
} catch (e) {
  console.error(e);
}
