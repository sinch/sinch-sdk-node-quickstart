// eslint-disable-next-line no-unused-vars
import { SmsService, Sms } from '@sinch/sdk-core';

/**
 * Handles the incoming SMS event by echoing what has been received to the sender.
 * @param { Sms.MOText } incomingTextMessage - The incoming SMS message event object
 * @param { SmsService } smsService - the SMS service instance from the Sinch SDK containing the API methods
 */
export const handleSmsEvent = async (incomingTextMessage, smsService) => {
  console.log(`Handling event: ${JSON.stringify(incomingTextMessage, null, 2)}`);

  /** @type {Sms.SendSMSRequestData} */
  const smsRequest = {
    sendSMSRequestBody: {
      to: [incomingTextMessage.from],
      body: `You sent ${incomingTextMessage.body}`,
      from: incomingTextMessage.to,
    },
  };

  console.log(`Replying with: ${JSON.stringify(smsRequest, null, 2)}`);

  await smsService.batches.send(smsRequest);
};
