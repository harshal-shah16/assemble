import ApiHandler, {SERVER_URL} from "./util/service-util";

const courseApi = new ApiHandler(`${SERVER_URL}/courses`);

export const fetchAllEnrollments = async () =>
    courseApi.fetchAll('');

export const postCourseForUser = async (course) =>
    courseApi.post('', course)

export const putUpdatedCourse = async (courseId, course) =>
    courseApi.put(courseId, course)



const api = {
    fetchAllEnrollments,
    postCourseForUser,
    putUpdatedCourse,
}

export default api;
