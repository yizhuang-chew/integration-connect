import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

const INTEGRATION_SETUP_CONTAINER =
  'integration_setup';

  const INTEGRATION_SETUP_KEY =
  'integration_event';

export async function createCustomObject(
  apiRoot: ByProjectKeyRequestBuilder,
  topicType: string,
  topicName: string,
  projectId: string,
): Promise<void> {
  await apiRoot
    .customObjects()
    .post({
      body: {
        container: INTEGRATION_SETUP_CONTAINER,
        key: INTEGRATION_SETUP_KEY,
        value: {
          topicType: topicType,
          topicName,
          projectId,
        }
      },
    })
    .execute();
}

export async function deleteCustomObject(
  apiRoot: ByProjectKeyRequestBuilder
): Promise<void> {
  const {
    body: { results: customObjects },
  } = await apiRoot
    .customObjects()
    .get({
      queryArgs: {
        where: `container="${INTEGRATION_SETUP_CONTAINER}" AND key="${INTEGRATION_SETUP_KEY}"`,
      },
    })
    .execute();

  if (customObjects.length > 0) {
    const customObject = customObjects[0];

    await apiRoot
      .customObjects()
      .withContainerAndKey({container: INTEGRATION_SETUP_CONTAINER, key: INTEGRATION_SETUP_KEY})
      .delete({
        queryArgs: {
          version: customObject.version,
        },
      })
      .execute();
  }
}
