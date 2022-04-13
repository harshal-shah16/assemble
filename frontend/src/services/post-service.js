import ApiHandler, {SERVER_URL} from "./util/service-util";

const postsApi = new ApiHandler(`${SERVER_URL}/posts`);

export const deletePostFromFeed = async (courseId, postId) => postsApi.remove(`${courseId}/${postId}`);

export const fetchAllPostsByFeed = async feedId => postsApi.fetchAll(feedId);

export const fetchPostById = async postId => postsApi.fetchById(postId);

export const postPostForFeed = async (feedId, post) => postsApi.post(feedId, post);

export const putUpdatedPost = async (courseId, postId, post) => postsApi.put(`${courseId}/${postId}`, post);

export const putUpdatedPostLike = async (courseId, postId, userId) => postsApi.put(`${courseId}/${postId}/likes/${userId}`, {});

export const deletePostLike = async (courseId, postId, userId) => postsApi.remove(`${courseId}/${postId}/likes/${userId}`, {});


const api = {
    deletePostFromFeed,
    fetchAllPostsByFeed,
    fetchPostById,
    postPostForFeed,
    putUpdatedPost,
    putUpdatedPostLike,
    deletePostLike

}

export default api;
