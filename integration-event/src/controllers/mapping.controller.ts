import { FieldMapping } from '../types/customObject.types';
import { CustomObject } from '../types/customObject.types';
import { logger } from '../utils/logger.utils';

// Safely converts a transform string to a function
const stringToFunction = (transform: string): ((value: any) => any) | null => {
  try {
    // Ensure the transform string is wrapped properly for function construction
    // For arrow functions, it should be directly used as is
    const wrappedFunction = `(${transform})`;
    // Evaluate the function string to create a function
    return eval(wrappedFunction);
  } catch (error) {
    logger.error('Error converting string to function:', error);
    return null;
  }
};

// Mapping function to process the input
export const mappingController = (
  input: any,
  customObject: CustomObject
): Record<string, any> => {
  const output: Record<string, any> = {};

  // Iterate through the field mappings and map fields accordingly
  customObject.value.fieldsMapping.forEach((fieldMapping: FieldMapping) => {
    const { commercetoolsField, destinationField, defaultValue, transform } =
      fieldMapping;

    let valueToMap: any;

    // If a commercetoolsField exists, extract its value from the input
    if (commercetoolsField) {
      const fieldPath = commercetoolsField.split('.');

      // Use reduce to traverse the object tree and extract the value
      valueToMap = fieldPath.reduce((acc: any, field: string) => {
        // Handle array indexing with string keys (e.g., name["en-US"]) and numeric indices (e.g., prices[0])
        const arrayMatch = field.match(/(.*)\[(["']?)(.*?)\2\]/);
        if (arrayMatch) {
          const [, arrayField, , key] = arrayMatch;
          // Convert key to number if it is numeric
          const index = isNaN(Number(key)) ? key : Number(key);
          if (acc && typeof acc[arrayField] === 'object') {
            // Check if acc[arrayField] is an array or an object
            if (Array.isArray(acc[arrayField])) {
              return acc[arrayField][index as number];
            } else {
              return acc[arrayField][index as string];
            }
          }
          return undefined;
        }
        // Handle standard object fields
        return acc ? acc[field] : undefined;
      }, input);

      logger.info(`Extracted value for "${commercetoolsField}": ${valueToMap}`); // Log extracted value
    }

    // Use defaultValue if commercetoolsField doesn't exist or is undefined
    if (valueToMap == null && defaultValue !== undefined) {
      valueToMap = defaultValue;
    }

    // Convert transform string to function and apply it if provided
    if (transform && typeof transform === 'string') {
      const transformFn = stringToFunction(transform);
      if (transformFn) {
        try {
          valueToMap = transformFn(valueToMap);
          logger.info(
            `Transformed value for "${destinationField}": ${valueToMap}`
          ); // Log transformed value
        } catch (error) {
          logger.error(
            `Error applying transform function for "${destinationField}":`,
            error
          );
        }
      } else {
        logger.error(`Failed to create transform function from: ${transform}`);
      }
    }

    // Now map the value to the destination field
    if (valueToMap !== undefined) {
      const destFieldPath = destinationField.split('.');
      let destObj: Record<string, any> = output;

      // Traverse the destination path to set the value in the correct place
      for (let i = 0; i < destFieldPath.length - 1; i++) {
        const field = destFieldPath[i];

        // Handle array indexing (e.g., skus[])
        if (field.endsWith('[]')) {
          const arrayField = field.slice(0, -2);
          if (!destObj[arrayField]) destObj[arrayField] = [];
          const newObj = {}; // Create a new object if array is empty
          destObj[arrayField].push(newObj);
          destObj = newObj; // Move into the newly added object
        } else {
          if (!destObj[field]) destObj[field] = {};
          destObj = destObj[field]; // Move into the nested object
        }
      }

      // Set the final value
      const finalField = destFieldPath[destFieldPath.length - 1];
      destObj[finalField] = valueToMap;

      logger.info(
        `Final mapped value for "${destinationField}": ${valueToMap}`
      ); // Log final mapped value
    }
  });

  return output;
};
