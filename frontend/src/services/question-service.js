import ApiHandler, {SERVER_URL} from "./util/service-util";

const questionsApi = new ApiHandler(`${SERVER_URL}/questions`);

const putUpdatedQuestion = (courseId, postId, question) => questionsApi.put(`${courseId}/${postId}`,
                                                                        question);

const api = {
    putUpdatedQuestion
}

export default api;
