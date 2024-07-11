import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Article } from '../types';
import { ArticleContent } from './ArticleContent';

interface ArticleCardProps {
    article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    const { title, description, content, url, source, extractedEntities } = article;

    return (
        <Card variant="outlined" className="m-5 max-w-xl">
            <CardContent>
                <Typography variant="h5" component="div" className="font-bold">
                    {title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {source.name} - {new Date(article.publishedAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {description}
                </Typography>
                <Typography variant="body2" component="div" className='leading-7'>
                    <ArticleContent content={content} entities={extractedEntities} />
                </Typography>
                <Link href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Read more
                </Link>
            </CardContent>
        </Card>
    );
};