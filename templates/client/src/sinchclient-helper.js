import { SinchClient, SmsRegion } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

export const initSinchClient = () => {
  // Unified credentials
  const projectId = getProperty('SINCH_PROJECT_ID');
  const keyId = getProperty('SINCH_KEY_ID');
  const keySecret = getProperty('SINCH_KEY_SECRET');

  // SMS legacy configuration
  const servicePlanId = getProperty('SINCH_SERVICE_PLAN_ID');
  const apiToken = getProperty('SINCH_API_TOKEN');
  const smsRegion = getProperty('SMS_REGION') || SmsRegion.UNITED_STATES;

  // Application credentials (verification + voice)
  const applicationKey = getProperty('SINCH_APPLICATION_KEY');
  const applicationSecret = getProperty('SINCH_APPLICATION_SECRET');

  return new SinchClient({
    projectId,
    keyId,
    keySecret,
    servicePlanId,
    apiToken,
    smsRegion,
    applicationKey,
    applicationSecret,
  });
};

const getProperty = (propertyName) => {
  return process.env[propertyName] || '';
};
