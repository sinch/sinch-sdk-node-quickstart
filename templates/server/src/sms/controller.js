import { SmsCallbackWebhooks } from '@sinch/sdk-core';
import {
  handleIncomingBinaryMessageEvent,
  // TODO: uncomment with the version 1.2.0
  // handleIncomingMmsEvent,
  handleIncomingSmsEvent,
  handleMmsDeliveryReportEvent,
  handleMmsRecipientDeliveryReportEvent,
  handleSmsDeliveryReportEvent,
  handleSmsRecipientDeliveryReportEvent,
} from './serverBusinessLogic.js';

export const smsController = (app) => {

  const smsCallbackWebhooks = new SmsCallbackWebhooks();

  app.post('/SmsEvent', async (req, res) => {

    // Parse the request payload
    const event = smsCallbackWebhooks.parseEvent(req.body);

    // Let the business layer process the request
    switch (event.type) {
      case 'mo_text':
        handleIncomingSmsEvent(event);
        break;
      case 'mo_binary':
        handleIncomingBinaryMessageEvent(event);
        break;
      // TODO: uncomment with the version 1.2.0
      // case 'mo_media':
      //   handleIncomingMmsEvent(event);
      //   break;
      case 'delivery_report_sms':
        handleSmsDeliveryReportEvent(event);
        break;
      case 'delivery_report_mms':
        handleMmsDeliveryReportEvent(event);
        break;
      case 'recipient_delivery_report_sms':
        handleSmsRecipientDeliveryReportEvent(event);
        break;
      case 'recipient_delivery_report_mms':
        handleMmsRecipientDeliveryReportEvent(event);
        break;
      default:
        res.status(500).json({ error: 'Unsupported event type' });
    }

    return res.status(200).json();
  });
};
