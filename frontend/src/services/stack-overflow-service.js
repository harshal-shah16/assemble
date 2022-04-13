// key = TBfDJvanyNTDI4BvbGl5kw((

const STACK_OVERFLOW_URL = "https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&body=";

export const findStackOverflowPosts = (body) =>
    fetch(`${STACK_OVERFLOW_URL}${body}/&site=stackoverflow&key=TBfDJvanyNTDI4BvbGl5kw((`)
        .then(response => response.json())

const api = {
    findStackOverflowPosts,
}

export default api;
