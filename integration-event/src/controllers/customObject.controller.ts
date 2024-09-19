import { CustomObject } from '../types/customObject.types';
import { createApiRoot } from '../client/create.client';

import { logger } from '../utils/logger.utils';
import CustomError from '../errors/custom.error';
import {
  HTTP_STATUS_SUCCESS_ACCEPTED,
  HTTP_STATUS_BAD_REQUEST,
} from '../constants/http-status.constants';

const customObject = {
  container: 'integration-layer',
  key: 'commercetools-to-google-mapping',
  value: {
    integrationId: '1',
    // commercetoolsEntity
    commercetoolsEvent: 'ProductPublished',
    destinationSystem: 'Google Shopping',
    authUrl: 'https://oauth2.googleapis.com/token',
    authType: 'refresh_token',
    destinationUrl:
      'https://content-merchantapi.googleapis.com/products/v1beta/accounts/5440101408/productInputs:insert?dataSource=accounts/5440101408/dataSources/10437578379&alt=json',
    // externalEntity: 'Tiktok',
    integrationType: 'to-external',
    clientId:
      '80926492852-cgkdi7k4gnohn69iikhc54ohoqsbuiu6.apps.googleusercontent.com', //TODO - move to secured place
    clientSecret: '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', //TODO- move to secured plac
    accessToken:
      'ya29.a0AcM612w68rAh4_Nr-pjJt8ycVVmEK8cBalCP98uDFjgt2864nDzv4TKclWjzsl9rs4jeQsZge4Nb3PI92Czxa4YfTSdO9EXUzr3TnD3GysRMEL1KW9rJJnGWF_DHpTCNB6IaR9RgHuRbQOQWr-7L1M1xFxQVRzbAYO8pR6aKaCgYKASESARISFQHGX2MiNIE2EU9bzjycSYN730nF_A0175',
    refreshToken:
      '1//0gvXVFt0SsVqNCgYIARAAGBASNwF-L9IrruVEFuuO4eb5b1YjGQ0mbxrRn96ROvWZZaxnRtN2zglhYGt5D9FBzZPa-kW2m5_-yjs',
    fieldsMapping: [
      {
        destinationField: 'channel',
        defaultValue: 'ONLINE',
      },
      {
        destinationField: 'offerId',
        defaultValue: 'product-123',
      },
      {
        destinationField: 'contentLanguage',
        defaultValue: 'en',
      },
      {
        destinationField: 'feedLabel',
        defaultValue: 'SG',
      },
      {
        commercetoolsField: 'productProjection.name["en-US"]',
        destinationField: 'attributes.title',
        //defaultValue: '123',
      },
      {
        commercetoolsField: 'productProjection.description["en-US"]',
        destinationField: 'attributes.description',
        // defaultValue: 'test',
      },

      {
        commercetoolsField: 'productProjection.masterVariant.images[0].url',
        destinationField: 'attributes.imageLink',
      },
      {
        commercetoolsField: 'productProjection.slug["en-US"]',
        destinationField: 'attributes.link',
      },
      {
        commercetoolsField:
          'productProjection.masterVariant.prices[0].value.currencyCode',
        destinationField: 'attributes.price.currencyCode',
      },
      {
        commercetoolsField:
          'productProjection.masterVariant.prices[0].value.centAmount',
        destinationField: 'attributes.price.amountMicros',
        transform: '(value) => value * 1000',
      },
      {
        commercetoolsField:
          'productProjection.masterVariant.availability.isOnStock',
        destinationField: 'attributes.availability',
        transform: "(value) => (value ? 'IN_STOCK' : 'OUT_OF_STOCK')",
      },
    ],
  },
};

// Mapping function to process the input
export const customObjectController = async (
  messageNotificationType: string,
  messageResourceType: string,
  messageType: string
): Promise<CustomObject> => {
  try {
    const response = await createApiRoot()
      .customObjects()
      .withContainer({ container: 'integration-layer' })
      .get({
        queryArgs: {
          where: `value(eventType="${messageNotificationType}") and value(event="${messageResourceType}") and value(eventMessageTypes="${messageType}")`,
        },
      })
      .execute();

    // Return the custom object if found
    if (response && response.body && response.body.results.length > 0) {
      logger.info('Custom Object Found', response.body.results[0]);
      return response.body.results[0]; // Return the first matching custom object - TODO Handle if multiple
    } else {
      throw new CustomError(HTTP_STATUS_BAD_REQUEST, `No Custom Object`);
    }
  } catch (error) {
    throw new CustomError(HTTP_STATUS_BAD_REQUEST, `Bad request: ${error}`);
  }
};
