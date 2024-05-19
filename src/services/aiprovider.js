const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.VUE_APP_AI_API_KEY);

export const AIProvider = {
    async generateProductDescription(product) {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        //const prompt = "Scrivi la descrizione del prodotto '" + product + "' per uno store online, formatta il tuo testo utilizzando i tag HTML. Scrivi in italiano"
        const prompt = "Write a description for the product '" + product + "' for an online store in italian, format using HTML tags"

        const result = await model.generateContent(prompt);
        const response = await result.response;
        var text = response.text().replace('```html\n', '').replace('\n```', '');
        return text;
    },

    async generateCategoryDescription(category) {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        //const prompt = "Scrivi la descrizione della categoria '" + category + "' per uno store online, formatta il tuo testo utilizzando i tag HTML. Scrivi in italiano"
        const prompt = "Write a description for the category '" + category + "' for an online store in italian, format using HTML tags"

        const result = await model.generateContent(prompt);
        const response = await result.response;
        var text = response.text().replace('```html\n', '').replace('\n```', '');
        return text;
    }
};