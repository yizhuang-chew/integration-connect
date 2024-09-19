import { CustomObject } from '../types/customObject.types';
import { logger } from '../utils/logger.utils';

// Function to use refresh token to get a new access token
const refreshAccessToken = async (
  clientId: string,
  clientSecret: string,
  refreshToken: string,
  tokenUrl: string
): Promise<string | null> => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  };

  try {
    logger.info(clientId);
    logger.info(clientSecret);
    logger.info(refreshToken);
    logger.info(tokenUrl);
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(body).toString(),
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh access token: ${response.statusText}`);
    }
    const tokenData = await response.json();

    logger.info(`accesstoken${tokenData.access_token} `);
    return tokenData.access_token;
  } catch (error) {
    logger.error('Error refreshing access token:', error);
    return null;
  }
};

export const authorizationController = async (
  customObject: CustomObject
): Promise<string | null> => {
  const accessToken = await refreshAccessToken(
    customObject.value.clientId,
    customObject.value.clientSecret,
    customObject.value.refreshToken,
    customObject.value.authUrl
  );
  return accessToken;
};
