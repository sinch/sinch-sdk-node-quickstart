// eslint-disable-next-line no-unused-vars
import { Voice } from '@sinch/sdk-core';

/**
 * Handles an Incoming Call Event (ICE).
 * @param {Voice.IceRequest} iceRequest - The incoming ICE request object.
 * @return {string} The formatted ICE response to handle the incoming call.
 */
export const handleIncomingCallEvent = (iceRequest) => {
  console.log(`Handling 'ICE' event:\n${JSON.stringify(iceRequest, null, 2)}`);

  const instruction = 'Thank you for calling your Sinch number. You have just handled an incoming call.';

  return Voice.customCalloutHelper.formatIceResponse(
    Voice.iceActionHelper.hangup(),
    Voice.iceInstructionHelper.say(instruction),
  );
};

/**
 * Handles a disconnected call event (DICE).
 * @param { Voice.DiceRequest } diceRequest - The incoming DICE request object.
 * @return {string} An empty string as a response to the disconnected call event.
 */
export const handleDisconnectedCallEvent = (diceRequest) => {
  console.log(`Handling 'DICE' event:\n${JSON.stringify(diceRequest, null, 2)}`);

  return '';
};

/**
 * Handles a notification event.
 * @param { Voice.NotifyRequest } notifyRequest - The incoming notify event object
 * @return {string} An empty string as a response to the notify event.
 */
export const handleNotifyEvent = (notifyRequest) => {
  console.log(`Handling 'notify' event:\n${JSON.stringify(notifyRequest, null, 2)}`);

  return '';
};
