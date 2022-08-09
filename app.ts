import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';


export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        const { rmqMessagesByQueue } = event as any;
        if (!rmqMessagesByQueue) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    error: 'No messages found',
                }),
            };
        }
        for (const queueName in rmqMessagesByQueue) {
            const messageCnt = rmqMessagesByQueue[queueName].length;
            console.log(`Total messages received from event source: ${messageCnt}`);

            for (const message of rmqMessagesByQueue[queueName]) {
                const data = Buffer.from(message.data, 'base64').toString('utf8');
                console.log("decoded data: ", data);
                // do something 
            }
        }
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
            }),
        };
    } catch (err) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }

    return response;
};
