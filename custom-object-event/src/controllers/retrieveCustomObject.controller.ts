import { createApiRoot } from '../client/create.client';

import { logger } from '../utils/logger.utils';

import CustomError from '../errors/custom.error';

import {
  HTTP_STATUS_SUCCESS_ACCEPTED,
  HTTP_STATUS_BAD_REQUEST,
} from '../constants/http-status.constants';

export const retrieveCustomObject = async (
  container: string,
  key: string
): Promise<any> => {
  try {
    const response = await createApiRoot()
      .customObjects()
      .withContainerAndKey({ container, key })
      .get()
      .execute();

    logger.info('RESPONSE', response);
    if (response.body) {
      const customObject = response.body;
      logger.info('Custom Object Retrieved:', customObject);
      return customObject;
    } else {
      throw new CustomError(
        HTTP_STATUS_BAD_REQUEST,
        `No custom object found for the given container and key.`
      );
    }
  } catch (error) {
    throw new CustomError(HTTP_STATUS_BAD_REQUEST, `Bad request: ${error}`);
  }
};
