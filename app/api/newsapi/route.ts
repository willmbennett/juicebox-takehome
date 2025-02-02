import { NextResponse } from "next/server";

export async function GET() {
    console.log("GET request received");

    const API_KEY = process.env.NEWSAPI_API_KEY;

    if (!API_KEY) {
        console.error("No API Key found");
        return NextResponse.json({ error: "No API Key found" }, { status: 400 });
    }

    console.log("API Key retrieved");

    // The recommended node SDK is a bit outdated so I'm just going to fetch the articles
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    console.log(url);

    try {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.statusText}`);
        }

        const data = await res.json();

        return NextResponse.json({ articles: data.articles });
    } catch (error: any) {
        console.error("Error occurred: ", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}