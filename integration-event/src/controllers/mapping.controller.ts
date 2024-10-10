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

  const setValueAtPath = (obj: Record<string, any>, path: string, value: any) => {
    const destFieldPath = path.split('.');
    let destObj = obj;

    for (let i = 0; i < destFieldPath.length - 1; i++) {
      const field = destFieldPath[i];

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

    const finalField = destFieldPath[destFieldPath.length - 1];
    if (Array.isArray(destObj)) {
      destObj.push(value);
    } else {
      destObj[finalField] = value;
    }
  };

  customObject.value.fieldsMapping.forEach((fieldMapping: FieldMapping) => {
    const { commercetoolsField, destinationField, defaultValue, transform } = fieldMapping;

    if (!destinationField) {
      throw new Error(`Missing destinationField for mapping: ${JSON.stringify(fieldMapping)}`);
    }

    let valuesToMap: any[] = [];

    if (defaultValue) {
      valuesToMap.push(defaultValue);
    } else if (commercetoolsField) {
      const sourceFieldHasWildcard = commercetoolsField.includes('[*]');
      if (sourceFieldHasWildcard) {
        const beforeWildcard = commercetoolsField.split('[*]')[0];
        const afterWildcard = commercetoolsField.split('[*]')[1];
        const arrayToMap = getValueFromPath(input, beforeWildcard);
        logger.info("ARRAY",arrayToMap);

        if (Array.isArray(arrayToMap)) {
          arrayToMap.forEach((arrayElement: any) => {
            const valueToMap = getValueFromPath(arrayElement, afterWildcard.slice(1));
            if (valueToMap !== undefined) {
              valuesToMap.push(valueToMap);
            }
          });
        }
      } else {
        const valueToMap = getValueFromPath(input, commercetoolsField);
        if (valueToMap !== undefined) {
          valuesToMap.push(valueToMap);
        }
      }
    } else {
      throw new Error(`Missing commercetoolsField for mapping: ${JSON.stringify(fieldMapping)}`);
    }

    if (transform && typeof transform === 'string') {
      const transformFn = stringToFunction(transform);
      if (transformFn) {
        try {
          valuesToMap = valuesToMap.map((value) => transformFn(value));
        } catch (error) {
          logger.error(`Error applying transform for "${destinationField}":`, error);
        }
      }
    }

    if (destinationField.includes('[*]')) {
      valuesToMap.forEach((value, index) => {
        const wildcardDestinationField = destinationField.replace('[*]', `[${index}]`);
        setValueAtPath(output, wildcardDestinationField, value);
      });
    } else {
      setValueAtPath(output, destinationField, valuesToMap[0]);
    }
  });

  return output;
};
