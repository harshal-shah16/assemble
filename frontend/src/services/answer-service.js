import ApiHandler, {SERVER_URL} from "./util/service-util";

const answersApi = new ApiHandler(`${SERVER_URL}/answers`);

export const deleteAnswerFromPost = async (courseId, answerId) =>
    answersApi.remove(`${courseId}/${answerId}`);

export const createAnswerForPost = async (courseId, postId, answer) =>
    answersApi.post(`${courseId}/${postId}`, answer);

export const putUpdatedAnswer = async (courseId, answerId, answer) =>
    answersApi.put(`${courseId}/${answerId}`, answer);

export const putUpdatedAnswerLike = async (courseId, answerId, userId) => 
    answersApi.put(`${courseId}/${answerId}/likes/${userId}`, {});

export const deleteAnswerLike = async (courseId, answerId, userId) => 
    answersApi.remove(`${courseId}/${answerId}/likes/${userId}`, {});

const api = {
    deleteAnswerFromPost,
    createAnswerForPost,
    putUpdatedAnswer,
    putUpdatedAnswerLike,
    deleteAnswerLike
}

export default api;
