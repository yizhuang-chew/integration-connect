import { Request, Response } from 'express';
import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { decodeToJson } from '../utils/decoder.utils';

import {
  HTTP_STATUS_SUCCESS_ACCEPTED,
  HTTP_STATUS_BAD_REQUEST,
} from '../constants/http-status.constants';

import { doMessageValidation } from '../validators/message.validators';
import { customObjectController } from '../controllers/customObject.controller';
import { validationController } from '../controllers/validation.controller';
import { mappingController } from '../controllers/mapping.controller';
import { destinationCallController } from '../controllers/destinationCall.controller';

/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (request: Request, response: Response) => {
  try {
    logger.info('Event Received', request);
    // Message Validation
    doMessageValidation(request);

    // Get Message Type
    const encodedMessageBody = request.body.message.data;
    const messageInput = decodeToJson(encodedMessageBody);
    // const messageNotificationType = messageInput.notificationType;
    const messageNotificationType = messageInput.notificationType;
    const messageResourceType = messageInput.resource.typeId;
    const messageType = messageInput.type;
    logger.info(`MESSAGE: ${messageType}`)

    // Get Custom Object - ## Handle if it's multiple messageTypes
    const customObject = await customObjectController(messageNotificationType,messageResourceType,messageType);

    // Validation
    validationController(messageInput, customObject);

    // Output Mapping
    const destinationOutput = mappingController(messageInput, customObject);

    // Destination Call
    await destinationCallController(destinationOutput, customObject);

    response.status(HTTP_STATUS_SUCCESS_ACCEPTED).send();
  } catch (error) {
    if (error instanceof CustomError) {
      response.status(error.statusCode as number).send();
      logger.error(error);
      return;
    }
    throw new CustomError(HTTP_STATUS_BAD_REQUEST, `Bad request: ${error}`);
  }
};
