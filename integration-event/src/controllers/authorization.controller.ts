import { CustomObject } from '../types/customObject.types';
import { logger } from '../utils/logger.utils';

// Function to use refresh token to get a new access token
const refreshAccessToken = async (
  clientId?: string,
  clientSecret?: string,
  refreshToken?: string,
  tokenUrl?: string
): Promise<string | null> => {
  const body = {
    client_id: clientId || "",
    client_secret: clientSecret || "",
    refresh_token: refreshToken || "",
    grant_type: 'refresh_token',
  };

  try {
    logger.info(clientId);
    logger.info(clientSecret);
    logger.info(refreshToken);
    logger.info(tokenUrl);

    if(!tokenUrl){
      throw new Error(`Token URL is empty for Refresh Token`);
    }
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

async function getStoredAccessToken(
  accessToken?: string
): Promise<string | null> {
  return accessToken || "";
}

export const authorizationController = async (
  customObject: CustomObject
): Promise<string | null> => {
  let accessToken: string | null = '';
  if (customObject.value.auth.authType === 'refresh_token') {
    accessToken = await refreshAccessToken(
      customObject.value.auth.clientId,
      customObject.value.auth.clientSecret,
      customObject.value.auth.refreshToken,
      customObject.value.auth.authUrl
    );
  } else if (customObject.value.auth.authType === 'access_token') {
    logger.info('Auth Type = access_token');
    accessToken = await getStoredAccessToken(customObject.value.auth.accessToken);
  }
  return accessToken;
};
