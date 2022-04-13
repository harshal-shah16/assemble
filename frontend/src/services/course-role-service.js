import ApiHandler, {SERVER_URL} from "./util/service-util";

const courseRoleApi = new ApiHandler(`${SERVER_URL}/roles`);


export const subscribeUserToCourse = async (courseId, email, courseRole) =>
    courseRoleApi.post(`${courseId}/${email}`, courseRole)


export const unsubscribeUserFromCourse = async (courseId, userId) =>
    courseRoleApi.remove(`${courseId}/${userId}`);


const api = {
    subscribeUserToCourse,
    unsubscribeUserFromCourse,
}

export default api;
