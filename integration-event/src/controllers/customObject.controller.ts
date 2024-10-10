import { CustomObject } from '../types/customObject.types';
import { createApiRoot } from '../client/create.client';

import { logger } from '../utils/logger.utils';
import CustomError from '../errors/custom.error';
import {
  HTTP_STATUS_SUCCESS_ACCEPTED,
  HTTP_STATUS_BAD_REQUEST,
} from '../constants/http-status.constants';

// Mapping function to process the input
export const customObjectController = async (
  messageNotificationType: string,
  messageResourceType: string,
  messageType: string
): Promise<CustomObject[]> => {
  try {
    const response = await createApiRoot()
      .customObjects()
      .withContainer({ container: 'integration-layer' })
      .get({
        queryArgs: {
          where: `value(integration(eventType="${messageNotificationType}")) and value(integration(event="${messageResourceType}")) and value(integration(eventMessageTypes="${messageType}"))`,
        },
      })
      .execute();

    // Return the custom object if found
    if (response && response.body && response.body.results.length > 0) {
      logger.info('Custom Objects Found', response.body.results);
      return response.body.results; // Return the first matching custom object - TODO Handle if multiple
    } else {
      throw new CustomError(HTTP_STATUS_BAD_REQUEST, `No Custom Object`);
    }
  } catch (error) {
    throw new CustomError(HTTP_STATUS_BAD_REQUEST, `Bad request: ${error}`);
  }
};
