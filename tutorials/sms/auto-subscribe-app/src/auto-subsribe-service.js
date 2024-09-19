// eslint-disable-next-line no-unused-vars
import { SmsService, Sms } from '@sinch/sdk-core';
import { fetchGroup } from './group-lifecycle-manager.js';

const SUBSCRIBE_ACTION = 'SUBSCRIBE';
const STOP_ACTION = 'STOP';

/**
 * Processes the incoming SMS event, determines if the sender wants to subscribe or unsubscribe from the group,
 * and sends a response based on their input.
 *
 * @param { Sms.MOText } incomingTextMessage - The incoming SMS message event object
 * @param { SmsService } smsService - the SMS service instance from the Sinch SDK containing the API methods
 */
export const processInboundEvent = async (incomingTextMessage, smsService) => {
  console.log(`Received event: ${JSON.stringify(incomingTextMessage, null, 2)}`);

  const from = incomingTextMessage.from;
  const to = incomingTextMessage.to;
  const senderInput = incomingTextMessage.body.trim();

  const group = await fetchGroup(smsService.groups);

  const membersList = await getMembersList(smsService, group);
  const isInGroup = isMemberInGroup(membersList, from);

  const responseText = await processSenderInput(smsService, from, to, senderInput, group, membersList, isInGroup);

  await sendResponse(smsService, to, from, responseText);
};

/**
 * Fetches the list of members in the group.
 *
 * @param {SmsService} smsService - The SMS service instance from the Sinch SDK containing the API methods.
 * @param {Sms.CreateGroupResponse} group - The group object.
 * @return {Promise<string[]>} - A promise that resolves to a list of member phone numbers.
 */
const getMembersList = async (smsService, group) => {
  return await smsService.groups.listMembers({
    group_id: group.id,
  });
};

/**
 * Checks if the specified member is in the list of members og the group.
 *
 * @param {string[]} membersList - The list of group members.
 * @param {string} member - The phone number of the member to check.
 * @return {boolean} - Whether the member is part of the group.
 */
const isMemberInGroup = (membersList, member) => {
  return membersList.includes(member);
};

/**
 * Processes the sender's input to either subscribe, unsubscribe, or handle unknown actions.
 *
 * @param {SmsService} smsService - the SMS service instance from the Sinch SDK containing the API methods.
 * @param {string} from - The phone number of the sender.
 * @param {string} to - The group's phone number.
 * @param {string} action - The incoming action (e.g., "SUBSCRIBE" or "STOP").
 * @param {Sms.CreateGroupResponse} group - The group object.
 * @param {string[]} membersList - The list of group members.
 * @param {boolean} isInGroup - Whether the sender is already in the group.
 * @return {Promise<string>} - A promise that resolves to the response text for the sender.
 */
const processSenderInput = async (smsService, from, to, action, group, membersList, isInGroup) => {
  if (action === SUBSCRIBE_ACTION) {
    return await subscribe(smsService, group, isInGroup, to, from);
  } else if (action === STOP_ACTION) {
    return await unsubscribe(smsService, group, isInGroup, to, from);
  }
  return unknownAction(isInGroup, to);
};

/**
 * Subscribes a member to the group if they are not already in it.
 *
 * @param {SmsService} smsService - the SMS service instance from the Sinch SDK containing the API methods
 * @param {Sms.CreateGroupResponse} group - The group object.
 * @param {boolean} isInGroup - Whether the member is already in the group.
 * @param {string} groupPhoneNumber - The group's phone number.
 * @param {string} member - The phone number of the member to subscribe.
 * @return {Promise<string>} - A promise that resolves to the subscription confirmation message.
 */
const subscribe = async (smsService, group, isInGroup, groupPhoneNumber, member) => {
  if (isInGroup) {
    return `You have already subscribed to '${group.name}'. Text "${STOP_ACTION}" to +${groupPhoneNumber} to leave the group.`;
  }

  /** @type {Sms.UpdateGroupRequestData } */
  const requestData = {
    group_id: group.id,
    updateGroupRequestBody: {
      add: [member],
    },
  };

  await smsService.groups.update(requestData);

  return `Congratulations! You are now subscribed to '${group.name}'. Text "${STOP_ACTION}" to +${groupPhoneNumber} to leave the group.`;
};

/**
 * Unsubscribes a member from the group if they belong to it.
 *
 * @param {SmsService} smsService - the SMS service instance from the Sinch SDK containing the API methods.
 * @param {Sms.CreateGroupResponse} group - The group object.
 * @param {boolean} isInGroup - Whether the member is in the group.
 * @param {string} groupPhoneNumber - The group's phone number.
 * @param {string} member - The phone number of the member to unsubscribe.
 * @return {Promise<string>} - A promise that resolves to the unsubscription confirmation message.
 */
const unsubscribe = async (smsService, group, isInGroup, groupPhoneNumber, member) => {
  if (!isInGroup) {
    return `You haven't subscribed to '${group.name}' yet. Text "${SUBSCRIBE_ACTION}" to +${groupPhoneNumber} to join this group.`;
  }

  /** @type {Sms.UpdateGroupRequestData} */
  const requestData = {
    group_id: group.id,
    updateGroupRequestBody: {
      remove: [member],
    },
  };

  await smsService.groups.update(requestData);

  return `We're sorry to see you go. You can always rejoin '${group.name}' by texting "${SUBSCRIBE_ACTION}" to +${groupPhoneNumber}.`;
};

/**
 * Handles an unknown action by suggesting the sender either subscribe or unsubscribe.
 *
 * @param {boolean} isInGroup - Whether the sender is already in the group.
 * @param {string} groupPhoneNumber - The group's phone number.
 * @return {string} - A message suggesting the next action for the sender.
 */
const unknownAction = (isInGroup, groupPhoneNumber) => {
  if (isInGroup) {
    return `Thanks for your interest. If you want to unsubscribe from this group, text "${STOP_ACTION}" to +${groupPhoneNumber}.`;
  } else {
    return `Thanks for your interest. If you want to subscribe to this group, text "${SUBSCRIBE_ACTION}" to +${groupPhoneNumber}.`;
  }
};

/**
 * Sends a response SMS to the sender.
 *
 * @param {SmsService} smsService - the SMS service instance from the Sinch SDK containing the API methods
 * @param {string} to - The group's phone number.
 * @param {string} from - The phone number of the sender.
 * @param {string} responseText - The text of the response to send.
 * @return {Promise<void>}
 */
const sendResponse = async (smsService, to, from, responseText) => {
  /** @type {Sms.SendTextSMSRequestData} */
  const requestData = {
    sendSMSRequestBody: {
      to: [to],
      body: responseText,
      from,
    },
  };

  await smsService.batches.sendTextMessage(requestData);

  console.log(`Replied: ${responseText}`);
};
