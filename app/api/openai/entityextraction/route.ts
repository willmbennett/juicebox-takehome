import { openai } from '@/app/openai';
import { Article } from '@/app/types';
import { NextResponse, type NextRequest } from 'next/server'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export async function POST(
    request: NextRequest
) {
    try {
        const requestBody = await request.text();
        const { article } = JSON.parse(requestBody) as {article: Article}

        const messages: ChatCompletionMessageParam[] = [
            {
                role: "system", content: "You are an expert in parsing entities from news articles. You recieve articles and you return a list of parsed entities in this format: {entity: string, entityType: string}. Entity types can be PERSON, ORGANIZATION, CONCEPT, or LOCATION"
            },
            {
                role: "user", content: `Please extract entities from each article: ${JSON.stringify(article.content)} and return it in json format: {entities:  {entity: string, entityType: string}[]} .`
            }
        ]

        console.log(messages)

        const completion = await openai.chat.completions.create({
            messages,
            model: "gpt-4o",
            response_format: { type: "json_object" }
        });
        const optimizedData = completion.choices[0].message.content;
        if (optimizedData) {
            const parsedData = JSON.parse(optimizedData);
            return NextResponse.json({ ...article, extractedEntities: parsedData.entities }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Faled to parse the entities.' }, { status: 400 });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}
