// eslint-disable-next-line no-unused-vars
import { Verification } from '@sinch/sdk-core';

/**
 * Handles a Verification Request Event.
 * @param {Verification.VerificationRequestEvent} verificationRequestEvent - The incoming Verification Request event.
 * @return {Verification.VerificationRequestEventResponse} the verification request event response
 */
export const handleVerificationRequestEvent = (verificationRequestEvent) => {
  console.log(`Handling Verification Request event:\n${JSON.stringify(verificationRequestEvent, null, 2)}`);

  // add your logic here according to SMS, FlashCall, PhoneCall, ... verification
  return {};
};

/**
 * Handles a Verification Result Event.
 * @param {Verification.VerificationResultEvent} verificationResultEvent - The incoming Verification Result notification.
 * @return {null}
 */
export const handleVerificationResultEvent = (verificationResultEvent) => {
  console.log(`Handling Verification Result event:\n${JSON.stringify(verificationResultEvent, null, 2)}`);
  return null;
};
