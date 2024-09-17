// eslint-disable-next-line no-unused-vars
import { Sms } from '@sinch/sdk-core';

/**
 * Handles an incoming SMS Event.
 * @param {Sms.MOText} incomingSmsEvent - The incoming SMS event.
 */
export const handleIncomingSmsEvent = (incomingSmsEvent) => {
  console.log(`Handling incoming SMS event:\n${JSON.stringify(incomingSmsEvent, null, 2)}`);
};

/**
 * Handles an incoming binary message Event.
 * @param {Sms.MOBinary} incomingBinaryMessageEvent - The incoming binary message event.
 */
export const handleIncomingBinaryMessageEvent = (incomingBinaryMessageEvent) => {
  console.log(`Handling incoming binary message event:\n${JSON.stringify(incomingBinaryMessageEvent, null, 2)}`);
};

// TODO: uncomment with the version 1.2.0
// /**
//  * Handles an incoming MMS Event.
//  * @param {Sms.MOMedia} incomingMmsEvent - The incoming MMS event.
//  */
// export const handleIncomingMmsEvent = (incomingMmsEvent) => {
//   console.log(`Handling incoming MMS event:\n${JSON.stringify(incomingMmsEvent, null, 2)}`);
// };

/**
 * Handles an SMS Delivery Report Event.
 * @param {Sms.DeliveryReport} smsDeliveryReportEvent - The SMS delivery report event.
 */
export const handleSmsDeliveryReportEvent = (smsDeliveryReportEvent) => {
  console.log(`Handling SMS delivery report event:\n${JSON.stringify(smsDeliveryReportEvent, null, 2)}`);
};

/**
 * Handles an MMS Delivery Report Event.
 * @param {Sms.DeliveryReport} mmsDeliveryReportEvent - The MMS delivery report event.
 */
export const handleMmsDeliveryReportEvent = (mmsDeliveryReportEvent) => {
  console.log(`Handling MMS delivery report event:\n${JSON.stringify(mmsDeliveryReportEvent, null, 2)}`);
};

/**
 * Handles an SMS Recipient Delivery Report Event.
 * @param {Sms.RecipientDeliveryReport} smsRecipientDeliveryReportEvent - The SMS recipient delivery report event.
 */
export const handleSmsRecipientDeliveryReportEvent = (smsRecipientDeliveryReportEvent) => {
  console.log(`Handling SMS recipient delivery report event:\n${JSON.stringify(smsRecipientDeliveryReportEvent, null, 2)}`);
};

/**
 * Handles an MMS Recipient Delivery Report Event.
 * @param {Sms.RecipientDeliveryReport} mmsRecipientDeliveryReportEvent - The MMS recipient delivery report event.
 */
export const handleMmsRecipientDeliveryReportEvent = (mmsRecipientDeliveryReportEvent) => {
  console.log(`Handling MMS recipient delivery report event:\n${JSON.stringify(mmsRecipientDeliveryReportEvent, null, 2)}`);
};
