import ApiHandler, {SERVER_URL} from "./util/service-util";

const feedApi = new ApiHandler(`${SERVER_URL}/feeds`);

export const fetchAllFeedsByCourse = async (courseId) => feedApi.fetchAll(courseId)

export const postFeedForCourse = async (courseId, feed) => feedApi.post(courseId, feed)

export const fetchFeedById = async (feedId) => feedApi.fetchById(feedId)

export const putUpdatedFeed = async (courseId, feedId, feed) => feedApi.put(`${courseId}/${feedId}`, feed)

export const deleteFeedFromCourse = async (feedId) => feedApi.remove(feedId)

const api = {
    fetchAllFeedsByCourse,
    fetchFeedById,
    postFeedForCourse,
    putUpdatedFeed,
    deleteFeedFromCourse,
}

export default api;
