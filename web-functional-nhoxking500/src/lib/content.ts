const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL)=> {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        return Promise.resolve(data.content);
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
    if(!content.startsWith("<speak>"))
        throw Error("This is not valid SML");
    return content.match(/<s>(.*?)<\/s>/g)?.map((s) => s.replace(/<\/?s>/g,"")) ?? [];
};

export { fetchContent, parseContentIntoSentences };
