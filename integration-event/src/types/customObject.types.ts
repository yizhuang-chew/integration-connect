// Define types for field mapping and custom object structure
export type FieldMapping = {
  commercetoolsField?: string;
  destinationField?: string;
  defaultValue?: any;
  transform?: string;
};

export type IntegrationDetails = {
  destinationSystem?: string;
  destinationUrl?: string;
  eventType?: string;
  event?: string;
  eventMessageTypes?: string;
};

export type AuthDetails = {
  authType?: string;
  authUrl?: string;
  clientId?: string;
  clientSecret?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type CustomObject = {
  container: string;
  key: string;
  value: {
    integrationName: string;
    integration: IntegrationDetails;
    // commercetoolsEvent: string;
    // destinationSystem: string;
    // authUrl: string;
    // authType: string;
    // accessToken: string;
    // refreshToken: string;
    // destinationUrl: string;
    // integrationType: string;
    auth: AuthDetails;
    fieldsMapping: FieldMapping[];
    // clientId: string;
    // clientSecret: string;
  };
};
