// Define types for field mapping and custom object structure
export type FieldMapping = {
    commercetoolsField?: string;
    destinationField: string;
    defaultValue?: any;
    transform?: string;
  };
  
  export type CustomObject = {
    container: string;
    key: string;
    value: {
      integrationId: string;
      commercetoolsEvent: string;
      destinationSystem: string;
      authUrl: string;
      accessToken: string;
      refreshToken: string;
      destinationUrl: string;
      integrationType: string;
      fieldsMapping: FieldMapping[];
      clientId: string;
      clientSecret: string;
    };
  };
  