import { CustomObject } from '../types/customObject.types';
import {
  HTTP_STATUS_SUCCESS_ACCEPTED,
  HTTP_STATUS_BAD_REQUEST,
} from '../constants/http-status.constants';
import CustomError from '../errors/custom.error';

import { logger } from '../utils/logger.utils';
import { authorizationController } from '../controllers/authorization.controller';

// Mapping function to process the input
export const destinationCallController = async (
  output: any,
  customObject: CustomObject
): Promise<Response | null> => {
  try {
    const accessToken = await authorizationController(customObject);

    const destinationUrl = `${customObject.value.integration.destinationUrl}`;
    logger.info(`Sending request to: ${destinationUrl}`);
    logger.info('Request body:', output);

    logger.info(`TOKEN ${accessToken}`);
    const response: Response = await fetch(destinationUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(output), // Send the mapped request body as JSON
    });

    const responseData = await response.json();
    logger.info('Final Output', responseData);
    return responseData;
  } catch (error) {
    throw new CustomError(
      HTTP_STATUS_BAD_REQUEST,
      `Integration Failed: ${error}`
    );
  }
};
