import { articles_url, country_code, category, API_key } from './rest_config'
export async function getarticles() {

    try {
        let articles = await fetch(`${articles_url} ? country=${country_code}&category=${category}`, {
            headers: {
                'X-API-KEY': API_key
            }
        });
        let result = await articles.json();

        articles = null;

        return result.articles;

    } catch (error) {

        throw error;

    }
}