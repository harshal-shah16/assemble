import ApiHandler, {SERVER_URL} from "./util/service-util";

const commentsApi = new ApiHandler(`${SERVER_URL}/comments`);

export const deleteCommentFromPost = async (courseId, commentId) => commentsApi.remove(
    `${courseId}/${commentId}`);

export const createCommentForPost = async (courseId, postId, comment) =>
    commentsApi.post(`${courseId}/${postId}`, comment);

export const putUpdatedComment = async (courseId, commentId, comment) => commentsApi.put(
    `${courseId}/${commentId}`, comment);

export const putUpdatedCommentLike = async (courseId, commentId, userId) => 
    commentsApi.put(`${courseId}/${commentId}/likes/${userId}`, {});

export const deleteCommentLike = async (courseId, commentId, userId) => 
    commentsApi.remove(`${courseId}/${commentId}/likes/${userId}`, {});

const api = {
    deleteCommentFromPost,
    createCommentForPost,
    putUpdatedComment,
    putUpdatedCommentLike,
    deleteCommentLike

}

export default api;
