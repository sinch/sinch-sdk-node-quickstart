// eslint-disable-next-line no-unused-vars
import { Sms, GroupsApi } from '@sinch/sdk-core';

/**
 * The name of the group used in the Auto-Subscribe tutorial.
 * @constant {string}
 */
const GROUP_NAME = 'Sinch Pirates';

/**
 * A reference to the group object, initialized as null.
 * @type {Sms.GroupResponse|null}
 */
let sinchPiratesGroup = null;

/**
 * Fetches the group named "Sinch Pirates" from the SMS service. If the group does not exist,
 * it creates a new group with the specified name.
 *
 * @param {GroupsApi} groupsService - The service used to interact with the SMS groups.
 * @return {Promise<Sms.GroupResponse>} - A promise that resolves to the Group object.
 */
export const fetchGroup = async (groupsService) => {
  for await (const group of groupsService.list({})) {
    if (group.name === GROUP_NAME) {
      sinchPiratesGroup = group;
      break;
    }
  }
  if (sinchPiratesGroup) {
    console.log(`Group '${sinchPiratesGroup.name}' found with id '${sinchPiratesGroup.id}'`);
  } else {
    console.log(`The group '${GROUP_NAME}' doesn't exist. Let's create it.`);

    /** @type {Sms.CreateGroupRequestData} */
    const requestData = {
      createGroupRequestBody: {
        name: GROUP_NAME,
      },
    };
    sinchPiratesGroup = await groupsService.create(requestData);
    console.log(`Group '${sinchPiratesGroup.name}' created with id '${sinchPiratesGroup.id}'`);
  }
  return sinchPiratesGroup;
};

/**
 * Deletes the group named "Sinch Pirates" from the SMS service.
 *
 * @param {GroupsApi} groupsService - The service used to interact with the SMS groups.
 * @return {Promise<void>} - A promise that resolves when the group is deleted.
 */
export const deleteGroup = async (groupsService) => {
  console.log(`Deleting group '${sinchPiratesGroup.name}' with id '${sinchPiratesGroup.id}'`);
  await groupsService.delete({
    group_id: sinchPiratesGroup.id,
  });
  console.log(`Group '${sinchPiratesGroup.name}' deleted!`);
};
