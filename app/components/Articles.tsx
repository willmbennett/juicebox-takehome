"use client"
import { Button } from "@mui/material";
import { useState } from "react";
import { classifyArticle, fetchData } from "../helper";
import { Article } from "../types";
import { ArticleCard } from "./ArticleCard";

export const Articles = () => {
    const [classifiedArticles, setClassifiedArticles] = useState<Article[]>([]);

    const fetchAndClassifyArticles = async () => {
        const { articles } = await fetchData() as { articles: Article[] };

        for (const article of articles) {
            const classifiedArticle = await classifyArticle(article);
            console.log(classifiedArticle)
            setClassifiedArticles(prevState => [...prevState, classifiedArticle]);
        }
    };

    return (
        <>
            <Button variant="contained" onClick={fetchAndClassifyArticles}>Fetch Articles</Button>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-10">
                {classifiedArticles.map((article, index) => (<ArticleCard key={index} article={article} />
                ))}
            </div>
        </>
    );
};
