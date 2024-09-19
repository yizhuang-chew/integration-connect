"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerCreateSubscription = createCustomerCreateSubscription;
exports.deleteCustomerCreateSubscription = deleteCustomerCreateSubscription;
const CUSTOMER_CREATE_SUBSCRIPTION_KEY = 'myconnector-customerCreateSubscription';
function createCustomerCreateSubscription(apiRoot, topicName, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body: { results: subscriptions }, } = yield apiRoot
            .subscriptions()
            .get({
            queryArgs: {
                where: `key = "${CUSTOMER_CREATE_SUBSCRIPTION_KEY}"`,
            },
        })
            .execute();
        if (subscriptions.length > 0) {
            const subscription = subscriptions[0];
            yield apiRoot
                .subscriptions()
                .withKey({ key: CUSTOMER_CREATE_SUBSCRIPTION_KEY })
                .delete({
                queryArgs: {
                    version: subscription.version,
                },
            })
                .execute();
        }
        yield apiRoot
            .subscriptions()
            .post({
            body: {
                key: CUSTOMER_CREATE_SUBSCRIPTION_KEY,
                destination: {
                    type: 'GoogleCloudPubSub',
                    topic: topicName,
                    projectId,
                },
                messages: [
                    {
                        resourceTypeId: 'customer',
                        types: ['CustomerCreated'],
                    },
                ],
            },
        })
            .execute();
    });
}
function deleteCustomerCreateSubscription(apiRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body: { results: subscriptions }, } = yield apiRoot
            .subscriptions()
            .get({
            queryArgs: {
                where: `key = "${CUSTOMER_CREATE_SUBSCRIPTION_KEY}"`,
            },
        })
            .execute();
        if (subscriptions.length > 0) {
            const subscription = subscriptions[0];
            yield apiRoot
                .subscriptions()
                .withKey({ key: CUSTOMER_CREATE_SUBSCRIPTION_KEY })
                .delete({
                queryArgs: {
                    version: subscription.version,
                },
            })
                .execute();
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uZWN0b3IvYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUtBLDRFQWlEQztBQUVELDRFQTJCQztBQWpGRCxNQUFNLGdDQUFnQyxHQUNwQyx3Q0FBd0MsQ0FBQztBQUUzQyxTQUFzQixnQ0FBZ0MsQ0FDcEQsT0FBbUMsRUFDbkMsU0FBaUIsRUFDakIsU0FBaUI7O1FBRWpCLE1BQU0sRUFDSixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLEdBQ2pDLEdBQUcsTUFBTSxPQUFPO2FBQ2QsYUFBYSxFQUFFO2FBQ2YsR0FBRyxDQUFDO1lBQ0gsU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxVQUFVLGdDQUFnQyxHQUFHO2FBQ3JEO1NBQ0YsQ0FBQzthQUNELE9BQU8sRUFBRSxDQUFDO1FBRWIsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzdCLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0QyxNQUFNLE9BQU87aUJBQ1YsYUFBYSxFQUFFO2lCQUNmLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxnQ0FBZ0MsRUFBRSxDQUFDO2lCQUNsRCxNQUFNLENBQUM7Z0JBQ04sU0FBUyxFQUFFO29CQUNULE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTztpQkFDOUI7YUFDRixDQUFDO2lCQUNELE9BQU8sRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUVELE1BQU0sT0FBTzthQUNWLGFBQWEsRUFBRTthQUNmLElBQUksQ0FBQztZQUNKLElBQUksRUFBRTtnQkFDSixHQUFHLEVBQUUsZ0NBQWdDO2dCQUNyQyxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLG1CQUFtQjtvQkFDekIsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLFNBQVM7aUJBQ1Y7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSO3dCQUNFLGNBQWMsRUFBRSxVQUFVO3dCQUMxQixLQUFLLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztxQkFDM0I7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7YUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNmLENBQUM7Q0FBQTtBQUVELFNBQXNCLGdDQUFnQyxDQUNwRCxPQUFtQzs7UUFFbkMsTUFBTSxFQUNKLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsR0FDakMsR0FBRyxNQUFNLE9BQU87YUFDZCxhQUFhLEVBQUU7YUFDZixHQUFHLENBQUM7WUFDSCxTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFVBQVUsZ0NBQWdDLEdBQUc7YUFDckQ7U0FDRixDQUFDO2FBQ0QsT0FBTyxFQUFFLENBQUM7UUFFYixJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDN0IsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRDLE1BQU0sT0FBTztpQkFDVixhQUFhLEVBQUU7aUJBQ2YsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLGdDQUFnQyxFQUFFLENBQUM7aUJBQ2xELE1BQU0sQ0FBQztnQkFDTixTQUFTLEVBQUU7b0JBQ1QsT0FBTyxFQUFFLFlBQVksQ0FBQyxPQUFPO2lCQUM5QjthQUNGLENBQUM7aUJBQ0QsT0FBTyxFQUFFLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztDQUFBIn0=