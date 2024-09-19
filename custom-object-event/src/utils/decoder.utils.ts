const decodeToString = (encodedMessageBody: string) => {
    const buff = Buffer.from(encodedMessageBody, 'base64');
    return buff.toString().trim();
  };
  
  export const decodeToJson = (encodedMessageBody: string) => {
    const decodedString = decodeToString(encodedMessageBody);
    return JSON.parse(decodedString);
  };