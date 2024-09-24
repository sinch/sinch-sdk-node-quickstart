import { Voice } from '@sinch/sdk-core';

const SIP_MENU = 'sip';
const NON_SIP_MENU = 'non-sip';

/**
 * Handles an answered call event by analyzing whether it was answered by a human or a machine.
 * @param {Voice.AceRequest} event - The event object representing the Answered Call Event.
 * @return {Voice.AceResponse} - The appropriate SVAML response based on whether a human or machine answered the call.
 * @throws {Error} - Throws an error if the event's AMD (Answering Machine Detection) result is unexpected.
 */
export const handleAnsweredCallEvent = (event) => {
  const amdResult = event.amd;
  if (amdResult.status === 'machine') {
    return machineResponse();
  }
  if (amdResult.status === 'human') {
    return humanResponse();
  }
  throw new Error(`Unexpected amd value: ${JSON.stringify(event, null, 2)}`);
};

/**
 * Handles a prompt input event by processing the menu result.
 * @param {Voice.PieRequest} event - The event object representing the Prompt Input Event.
 * @return {Voice.PieResponse} - The SVAML response based on the input from the menu (SIP or non-SIP options).
 */
export const handlePromptInputEvent = (event) => {
  const menuResult = event.menuResult;
  if (menuResult.value === SIP_MENU) {
    return sipResponse();
  }
  if (menuResult.value === NON_SIP_MENU) {
    return nonSipResponse();
  }
  return defaultResponse();
};

/**
 * Returns the SVAML response for a SIP-based call connection.
 * @return {Voice.PieResponse} - A SVAML response that connects the call to a SIP endpoint and informs the caller.
 */
const sipResponse = () => {
  const instruction = 'Thanks for agreeing to speak to one of our sales reps! We\'ll now connect your call.';

  return new Voice.PieSvamletBuilder()
    .setAction(Voice.pieActionHelper.connectSip({
      destination: {
        type: 'Sip',
        endpoint: process.env.SIP_ADDRESS,
      },
      cli: process.env.SINCH_NUMBER,
      transport: 'tls',
    }))
    .addInstruction(Voice.pieInstructionHelper.say(instruction))
    .build();
};

/**
 * Returns the SVAML response for a non-SIP-based call connection.
 * @return {Voice.PieResponse} - A SVAML response that thanks the caller for trying the tutorial and ends the call.
 */
const nonSipResponse = () => {
  const instruction = 'Thank you for choosing to speak to one of our sales reps! If this were in production, at'
    + ' this point you would be connected to a sales rep on your sip network. Since you do'
    + ' not, you have now completed this tutorial. We hope you had fun and learned'
    + ' something new. Be sure to keep visiting https://developers.sinch.com for more great'
    + ' tutorials.';

  return new Voice.PieSvamletBuilder()
    .setAction(Voice.pieActionHelper.hangup())
    .addInstruction(Voice.pieInstructionHelper.say(instruction))
    .build();
};

/**
 * Returns the default SVAML response when the input does not match any predefined options.
 * @return {Voice.PieResponse} - A SVAML response that thanks the caller and ends the call.
 */
const defaultResponse = () => {
  const instruction = 'Thank you for trying our tutorial! This call will now end.';

  return new Voice.PieSvamletBuilder()
    .setAction(Voice.pieActionHelper.hangup())
    .addInstruction(Voice.pieInstructionHelper.say(instruction))
    .build();
};

/**
 * Returns the SVAML response for a human answer event, presenting a menu with SIP and non-SIP options.
 * @return {Voice.AceResponse} - A SVAML response that presents a menu asking the caller whether they are using SIP.
 */
const humanResponse = () => {
  const SIP_MENU_OPTION = '1';
  const NON_SIP_MENU_OPTION = '2';

  const mainPrompt = `#tts[Hi, you awesome person! Press '${SIP_MENU_OPTION}' if you have performed this tutorial using a sip infrastructure. Press '${NON_SIP_MENU_OPTION}' if you have not used a sip infrastructure. Press any other digit to end this call.]`;

  const repeatPrompt = `#tts[Again, simply press '${SIP_MENU_OPTION}' if you have used sip, press '${NON_SIP_MENU_OPTION}' if you have not, or press any other digit to end this call.]`;

  /** @type {Voice.Option} */
  const option1 = {
    action: `return(${SIP_MENU})`,
    dtmf: SIP_MENU_OPTION,
  };

  /** @type {Voice.Option} */
  const option2 = {
    action: `return(${NON_SIP_MENU})`,
    dtmf: NON_SIP_MENU_OPTION,
  };

  return new Voice.AceSvamletBuilder()
    .setAction(Voice.aceActionHelper.runMenu({
      menus: [
        {
          id: 'main',
          mainPrompt,
          repeatPrompt,
          repeats: 2,
          maxDigits: 1,
          options: [
            option1,
            option2,
          ],
        },
      ],
    }))
    .build();
};

/**
 * Returns the SVAML response for a machine answer event, delivering a message and ending the call.
 * @return {Voice.AceResponse} - A SVAML response that delivers a message to the answering machine and hangs up the call.
 */
const machineResponse = () => {
  const instruction = 'Hi there! We tried to reach you to speak with you about our awesome products.'
    + ' We will try again later. Bye!';

  return new Voice.AceSvamletBuilder()
    .setAction(Voice.aceActionHelper.hangup())
    .addInstruction(Voice.aceInstructionHelper.say(instruction, 'Matthew'))
    .build();
};
