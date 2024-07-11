"use client";
import { Button } from "@mui/material";
import { useState } from "react";
import { classifyArticle, fetchData } from "../helper";
import { Article } from "../types";
import { ArticleCard } from "./ArticleCard";

export const Articles = () => {
    const [classifiedArticles, setClassifiedArticles] = useState<Article[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchAndClassifyArticles = async () => {
        try {
            // Start by fetching 20 recent articles from the news API
            const articles = await fetchData();

            // Then iterate through the articles and extract classifications
            for (const article of articles) {
                try {
                    const classifiedArticle = await classifyArticle(article);
                    // Once the article is classified add it to the list
                    setClassifiedArticles(prevState => [...prevState, classifiedArticle]);
                } catch (classificationError: any) {
                    setError(`Error classifying article: ${classificationError.message}`);
                    break;
                }
            }
        } catch (fetchError: any) {
            setError(`Error fetching articles: ${fetchError.message}`);
        }
    };

    // Create a function to clear the articles and errors
    const clearArticles = () => {
        setClassifiedArticles([]);
        setError(null);
    };

    return (
        <>
            <div className="flex gap-2">
                <Button variant="contained" onClick={fetchAndClassifyArticles}>Fetch Articles</Button>
                {classifiedArticles.length > 0 && <Button variant="text" onClick={clearArticles}>Clear</Button>}
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-10">
                {classifiedArticles.map((article, index) => (
                    <ArticleCard key={index} article={article} />
                ))}
            </div>
        </>
    );
};