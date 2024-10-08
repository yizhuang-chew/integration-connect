import { Request, Response } from 'express';

import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';

import { decodeToJson } from '../utils/decoder.utils';

const INTEGRATION_SETUP_CONTAINER = 'integration_setup';

const INTEGRATION_SETUP_KEY = 'integration_event';

import {
  HTTP_STATUS_SUCCESS_ACCEPTED,
  HTTP_STATUS_BAD_REQUEST,
} from '../constants/http-status.constants';

import { doMessageValidation } from '../validators/message.validators';

import { retrieveCustomObject } from './retrieveCustomObject.controller';

import { subscriptionController } from './subscription.controller';
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

    // TODO - Handle all changes
    const encodedMessageBody = request.body.message.data;
    const messageBody = decodeToJson(encodedMessageBody);

    logger.info('messageBody', messageBody);

    const resource = messageBody.resource;

    logger.info('resource', resource);

    const resourceUserProvidedIdentifiers =
      messageBody.resourceUserProvidedIdentifiers;
    logger.info(
      'resourceUserProvidedIdentifiers',
      resourceUserProvidedIdentifiers
    );

    const integrationEventDetails = await retrieveCustomObject(
      INTEGRATION_SETUP_CONTAINER,
      INTEGRATION_SETUP_KEY
    );

    logger.info('integrationEventDetails', integrationEventDetails);

    const topicName = integrationEventDetails.value.topicName;
    const projectId = integrationEventDetails.value.projectId;
    const topicType = integrationEventDetails.value.topicType;

    logger.info(`topicName: ${topicName}`);
    logger.info(`projectId: ${projectId}`);
    logger.info(`topicType: ${topicType}`);

    const changeCustomObject = await retrieveCustomObject(
      resourceUserProvidedIdentifiers.containerAndKey.container,
      resourceUserProvidedIdentifiers.containerAndKey.key,
    );
    logger.info('CHANGE CUSTOM OBJECT', changeCustomObject);

    const integrationKey = changeCustomObject.value.integrationName;
    const eventType = changeCustomObject.value.integration?.eventType;
    const event = changeCustomObject.value.integration?.event;
    const eventMessageTypes = changeCustomObject.value.integration?.eventMessageTypes?.split(';');

    logger.info(`eventType: ${eventType}`);
    logger.info(`event: ${event}`);
    logger.info(`eventMessageTypes: ${eventMessageTypes}`);
    logger.info(`integrationKey: ${integrationKey}`);

    // UPDATE SUBSCRIPTION
    const createEventSubscription = await subscriptionController(
      projectId,
      topicName,
      integrationKey,
      eventType,
      event,
      eventMessageTypes
    ); // Properly typed array of strings:);
  
    logger.info('Event Created', createEventSubscription);

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
