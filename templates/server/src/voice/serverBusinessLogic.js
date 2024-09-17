import { Voice } from '@sinch/sdk-core';

/**
 * Handles an Incoming Call Event (ICE).
 * @param {Voice.IceRequest} iceRequest - The incoming ICE request object.
 * @return {Promise<string>} The formatted ICE response to handle the incoming call.
 */
export const handleIncomingCallEvent = async (iceRequest) => {
  console.log(`Handling 'ICE' event:\n${JSON.stringify(iceRequest)}`);
  return Voice.customCalloutHelper.formatIceResponse();
};

/**
 * Handles an Answered Call Event (ACE).
 * @param {Voice.AceRequest} aceRequest - The incoming ACE request object.
 * @return {Promise<string>} The formatted ACE response to handle the answered call.
 */
export const handleAnsweredCallEvent = async (aceRequest) => {
  console.log(`Handling 'ACE' event:\n${JSON.stringify(aceRequest)}`);
  return Voice.customCalloutHelper.formatAceResponse();
};

/**
 * Handles a prompt input event (PIE).
 * @param {Voice.PieRequest} pieRequest - The incoming PIE request object.
 * @return {Promise<string>} An empty string as a response to the prompt input event.
 */
export const handlePromptInputEvent = async (pieRequest) => {
  console.log(`Handling 'PIE' event:\n${JSON.stringify(pieRequest)}`);
  return '';
};

/**
 * Handles a disconnected call event (DICE).
 * @param { Voice.DiceRequest } diceRequest - The incoming DICE request object.
 * @return {Promise<string>} An empty string as a response to the disconnected call event.
 */
export const handleDisconnectedCallEvent = async (diceRequest) => {
  console.log(`Handling 'DICE' event:\n${JSON.stringify(diceRequest)}`);
  return '';
};

/**
 * Handles a notification event.
 * @param { Voice.NotifyRequest } notifyRequest - The incoming notify event object
 * @return {Promise<string>} An empty string as a response to the notify event.
 */
export const handleNotifyEvent = async (notifyRequest) => {
  console.log(`Handling 'notify' event:\n${JSON.stringify(notifyRequest)}`);
  return '';
};
