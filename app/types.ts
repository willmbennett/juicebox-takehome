
export type EntityType = 'PERSON' | 'ORGANIZATION' | 'CONCEPT' | 'LOCATION';

export type entityType = { entity: string, entityType: EntityType }
type sourceType = {
    id: string | null;
    name: string;
}


export type Article = {
    source: sourceType
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    extractedEntities?: entityType[]
}
