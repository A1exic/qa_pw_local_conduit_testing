import { camelCaseToPhrase, capitalize } from './stringHelpers';
import path from 'path';

export function parseTestTreeHierarchy(fileName, logger) {
  const testFolder = 'tests';

  const normalizedFileName = fileName.split(path.sep).join('/');

  const testFolderIndex = normalizedFileName.lastIndexOf(`/${testFolder}/`);

  if (testFolderIndex === -1) {
    logger.debug(
      `Could not find '${testFolder}' folder in path: ${normalizedFileName}`,
    );
    return ['Unknown', 'Unknown'];
  }

  const relativePath = normalizedFileName.substring(
    testFolderIndex + testFolder.length + 2,
  );

  let attributes = relativePath
    .split('/')
    .map(attribute => capitalize(camelCaseToPhrase(attribute)));

  if (attributes[2]?.includes('.spec.js')) {
    attributes = attributes.slice(0, 2);
  }

  attributes = attributes.map(attr => attr.replace(/\.spec\.js$/i, '').trim());

  logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

  return attributes;
}
