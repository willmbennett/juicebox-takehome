import { EntityType, entityType } from "../types";

interface ArticleContentProps { content: string, entities?: entityType[] }

const highlightClasses: Record<EntityType, string> = {
    PERSON: "bg-pink-300 text-pink-900",
    ORGANIZATION: "bg-orange-300 text-orange-900",
    CONCEPT: "bg-yellow-300 text-yellow-900",
    LOCATION: "bg-green-300 text-green-900"
};

export const ArticleContent = ({ content, entities }: ArticleContentProps) => {
    if (!entities || entities.length === 0) {
        return [content];
    }

    const parts: React.ReactNode[] = [];
    let remainingContent = content;

    entities.forEach(({ entity, entityType }) => {
        const entityIndex = remainingContent.indexOf(entity);

        if (entityIndex !== -1) {
            if (entityIndex > 0) {
                const beforeEntity = remainingContent.slice(0, entityIndex);
                parts.push(beforeEntity);
            }

            const highlightedEntity = (
                <span key={entity + entityIndex} className={highlightClasses[entityType] + " px-2 py-1 rounded-md"}>
                    {entity} <span className="font-bold">{entityType.slice(0, 3)}</span>
                </span>
            );
            parts.push(highlightedEntity);

            remainingContent = remainingContent.slice(entityIndex + entity.length);
        }
    });

    if (remainingContent.length > 0) {
        parts.push(remainingContent);
    }

    return parts;
};
