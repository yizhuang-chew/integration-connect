import { logger } from '../utils/logger.utils';
import { SubscriptionDraft } from '@commercetools/platform-sdk';
import { createApiRoot } from '../client/create.client';
// Define the possible commercetools event types
type CommercetoolsEventType = 'Messages' | 'Changes';
// Define the message types (assuming it's an array of strings)
type CommercetoolsEventMessageTypes = string[];
import CustomError from '../errors/custom.error';
import {
  HTTP_STATUS_SUCCESS_ACCEPTED,
  HTTP_STATUS_BAD_REQUEST,
} from '../constants/http-status.constants';
export const subscriptionController = async (
  projectId: string,
  topicName: string,
  integrationKey: string,
  commercetoolsEventType: CommercetoolsEventType,
  commercetoolsEvent: string,
  commercetoolsEventMessageTypes: CommercetoolsEventMessageTypes // Properly typed array of strings:
): Promise<any> => {
  try {
    const messages: {
      resourceTypeId: string;
      types?: CommercetoolsEventMessageTypes;
    }[] = [];
    const changes: { resourceTypeId: string }[] = [];

    // Handle event type based on 'Message' or 'Change'
    if (commercetoolsEventType === 'Messages') {
      // If the event type is 'Message', update the messages array
      messages.push({
        resourceTypeId: commercetoolsEvent, // Add the specific event
        types: commercetoolsEventMessageTypes, // Add the types if they exist
      });
    } else if (commercetoolsEventType === 'Changes') {
      // If the event type is 'Change', update the changes array
      changes.push({
        resourceTypeId: commercetoolsEvent, // Add the specific event
      });
    }

    // Define the subscription draft
    const subscriptionDraft: SubscriptionDraft = {
      key: `eventSubscription-${integrationKey}`, // You can customize this key
      destination: {
        type: 'GoogleCloudPubSub',
        projectId: projectId,
        topic: topicName,
      },
      changes: changes.length > 0 ? changes : undefined,
      messages: messages.length > 0 ? messages : undefined,
    };

    logger.info("SUBSCRIPTION DRAFT", subscriptionDraft);

    // Make the API call to create the subscription
    const response = await createApiRoot()
      .subscriptions()
      .post({
        body: subscriptionDraft,
      })
      .execute();

    logger.info('Subscription created successfully:', response.body);
  } catch (error) {
    throw new CustomError(HTTP_STATUS_BAD_REQUEST, `Bad request: ${error}`);
  }
};
