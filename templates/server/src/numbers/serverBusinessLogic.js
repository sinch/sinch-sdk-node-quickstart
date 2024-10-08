/* eslint-disable valid-jsdoc */
/**
 * Handles a Numbers Event.
 * @param {import("@sinch/sdk-core").NumbersCallback} numbersEvent - The incoming Numbers event notification.
 */
export const handleNumbersEvent = async (numbersEvent) => {
  console.log(`Handling Numbers event:\n${JSON.stringify(numbersEvent, null, 2)}`);
};
