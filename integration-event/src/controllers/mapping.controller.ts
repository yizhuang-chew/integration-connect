import { FieldMapping } from '../types/customObject.types';
import { CustomObject } from '../types/customObject.types';
import { logger } from '../utils/logger.utils';

// Safely converts a transform string to a function
const stringToFunction = (transform: string): ((value: any) => any) | null => {
  try {
    const wrappedFunction = `(${transform})`;
    return eval(wrappedFunction);
  } catch (error) {
    logger.error('Error converting string to function:', error);
    return null;
  }
};

export const mappingController = (
  input: any,
  customObject: CustomObject
): Record<string, any> => {
  const output: Record<string, any> = {};

  // Helper function to safely access nested properties, including wildcard support for arrays
  const getValueFromPath = (obj: any, path: string) => {
    const fieldPath = path.split('.');
    return fieldPath.reduce((acc: any, field: string) => {
      const arrayMatch = field.match(/(.*)\[(["']?)(.*?)\2\]/);
      if (arrayMatch) {
        const [, arrayField, , key] = arrayMatch;
        const index = isNaN(Number(key)) ? key : Number(key);
        if (acc && typeof acc[arrayField] === 'object') {
          if (Array.isArray(acc[arrayField])) {
            return acc[arrayField][index as number];
          } else {
            return acc[arrayField][index as string];
          }
        }
        return undefined; // Field is missing
      }
      return acc ? acc[field] : undefined; // Field is missing
    }, obj);
  };

  // Helper function to set a value at a nested path, handling array wildcards like `[*]`
  const setValueAtPath = (obj: Record<string, any>, path: string, value: any) => {
    const destFieldPath = path.split('.');
    let destObj = obj;

    for (let i = 0; i < destFieldPath.length - 1; i++) {
      const field = destFieldPath[i];

      // Handle array indexing and wildcard `[*]`
      const arrayMatch = field.match(/(.*)\[(\*|\d+)\]/);
      if (arrayMatch) {
        const arrayField = arrayMatch[1];
        const index = arrayMatch[2] === '*' ? null : Number(arrayMatch[2]);

        if (!destObj[arrayField]) destObj[arrayField] = [];
        if (index !== null) {
          if (!destObj[arrayField][index]) destObj[arrayField][index] = {};
          destObj = destObj[arrayField][index];
        } else {
          if (!Array.isArray(destObj[arrayField])) destObj[arrayField] = [];
          destObj = destObj[arrayField];
        }
      } else {
        if (!destObj[field]) destObj[field] = {};
        destObj = destObj[field];
      }
    }

    // Set the final value at the correct location
    const finalField = destFieldPath[destFieldPath.length - 1];
    if (Array.isArray(destObj)) {
      destObj.push(value); // Push value into the array
    } else {
      destObj[finalField] = value;
    }
  };

  // Iterate through the field mappings and map fields accordingly
  customObject.value.fieldsMapping.forEach((fieldMapping: FieldMapping) => {
    const { commercetoolsField, destinationField, defaultValue, transform } = fieldMapping;

    // Check for missing commercetoolsField or destinationField
    if (!commercetoolsField || !destinationField) {
      logger.warn(`Missing field mapping: commercetoolsField=${commercetoolsField}, destinationField=${destinationField}`);
      return; // Skip this mapping entry
    }

    // Handle wildcard in the source field path (e.g., "product.prices[*].value")
    const sourceFieldHasWildcard = commercetoolsField.includes('[*]');
    const destinationFieldHasWildcard = destinationField.includes('[*]');

    let valuesToMap: any[] = [];

    if (sourceFieldHasWildcard) {
      // Split the path at the wildcard and process each element in the source array
      const beforeWildcard = commercetoolsField.split('[*]')[0];
      const afterWildcard = commercetoolsField.split('[*]')[1];
      const arrayToMap = getValueFromPath(input, beforeWildcard);

      if (Array.isArray(arrayToMap)) {
        arrayToMap.forEach((arrayElement: any) => {
          const valueToMap = getValueFromPath(arrayElement, afterWildcard.slice(1));
          if (valueToMap !== undefined) {
            valuesToMap.push(valueToMap);
          } else {
            logger.warn(`Missing field in source: ${commercetoolsField}`);
          }
        });
      } else {
        logger.warn(`Expected array but got undefined or non-array value for: ${commercetoolsField}`);
      }
    } else {
      // No wildcard, handle as normal
      const valueToMap = getValueFromPath(input, commercetoolsField);
      if (valueToMap !== undefined) {
        valuesToMap.push(valueToMap);
      } else {
        logger.warn(`Missing field in source: ${commercetoolsField}`);
      }
    }

    // Use defaultValue if no value was found
    if (valuesToMap.length === 0 && defaultValue !== undefined) {
      valuesToMap.push(defaultValue);
    }

    // Transform values if a transform function is provided
    if (transform && typeof transform === 'string') {
      const transformFn = stringToFunction(transform);
      if (transformFn) {
        try {
          valuesToMap = valuesToMap.map((value) => transformFn(value));
        } catch (error) {
          logger.error(`Error applying transform function for "${destinationField}":`, error);
        }
      }
    }

    // Set values in the destination object
    if (destinationFieldHasWildcard) {
      if (valuesToMap.length === 1) {
        // If there's only one value in the source but the destination expects an array
        const wildcardDestinationField = destinationField.replace('[*]', `[0]`);
        setValueAtPath(output, wildcardDestinationField, valuesToMap[0]);
      } else {
        // Handle multiple values mapping to multiple indices
        valuesToMap.forEach((value, index) => {
          const wildcardDestinationField = destinationField.replace('[*]', `[${index}]`);
          setValueAtPath(output, wildcardDestinationField, value);
        });
      }
    } else {
      if (valuesToMap.length > 0) {
        setValueAtPath(output, destinationField, valuesToMap[0]);
      }
    }
  });

  return output;
};
