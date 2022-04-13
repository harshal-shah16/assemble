import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import courseService from "../services/course-service"
import {statuses} from "./state-types"
import feedService from "../services/feed-service";
import courseRoleService from "../services/course-role-service";
import {deleteCommentFromPost} from "./post-slice";

const courseAdapter = createEntityAdapter({
                                              selectId: (course) => course.courseId,
                                              sortComparer: (a, b) =>
                                                  -1 * a.createdAt.localeCompare(b.createdAt),
                                          });

export const courseSelectors = courseAdapter.getSelectors(state => state.courses);

export const createCourseForUser =
    createAsyncThunk('courses/createCourseForUser', async ({course}) => {
        return courseService.postCourseForUser(course)
    })

export const findAllEnrollments =
    createAsyncThunk('courses/findAllEnrollments', async () => {
        return await courseService.fetchAllEnrollments()
    });

export const updateCourseById =
    createAsyncThunk('/courses/updateCourseById', async ({courseId, course}) => {
        return await courseService.putUpdatedCourse(courseId, course)
    })


// |======================================Feeds===============================================|


export const createFeedForCourse =
    createAsyncThunk("feed/createFeedForCourse",async ({courseId, feed}) => {
        return feedService.postFeedForCourse(courseId, feed);
    }
);


export const updateFeedById =
    createAsyncThunk("feed/updateFeedById",async ({courseId, feedId, feed}) => {
        return await feedService.putUpdatedFeed(courseId, feedId, feed);
    }
);


// |======================================CourseRoles===============================================|

export const createEnrollmentForUser =
    createAsyncThunk('courses/createEnrollmentForUser', async ({courseId, email, courseRole}) => {
        return courseRoleService.subscribeUserToCourse(courseId, email, courseRole)
    })

export const deleteEnrollmentForUser =
    createAsyncThunk('courses/deleteEnrollmentForUser', async ({courseId, userId}) => {
        return courseRoleService.unsubscribeUserFromCourse(courseId, userId)
    })


export const courseThunks = {
    createCourseForUser,
    findAllEnrollments,
    updateCourseById,

    createFeedForCourse,
    updateFeedById,

    createEnrollmentForUser,
    deleteEnrollmentForUser
}

const courseSlice = createSlice({
                                    name: "courses",
                                    initialState: {
                                        ...courseAdapter.getInitialState({
                                                                             status: statuses.IDLE,
                                                                             error: null,
                                                                         }), courseSelected: {}
                                    },
                                    reducers: {
                                        courseSelected(state, action) {
                                            state.selectedCourse = action.payload
                                        }
                                    },
                                    extraReducers: {

                                        // |=============|
                                        // |Create course|
                                        // |=============|
                                        [createCourseForUser.fulfilled]: (state, action) => {
                                            state.status = statuses.SUCCESS
                                            courseAdapter.addOne(state,
                                                                 action.payload);
                                        },
                                        [createCourseForUser.pending]: (state) => {
                                            state.status = statuses.LOADING;
                                        },
                                        [createCourseForUser.rejected]: (state, action) => {
                                            state.status = statuses.FAILED;
                                            state.error = action.payload;
                                        },

                                        // |=============|
                                        // | Delete Course|
                                        // |=============|

                                        [deleteEnrollmentForUser.fulfilled]: (state, action) => {
                                            state.status = statuses.SUCCESS
                                            courseAdapter.removeOne(state,
                                                                    action.payload.courseId)
                                        },
                                        [deleteEnrollmentForUser.rejected]: (state, action) => {
                                            state.status = statuses.FAILED
                                            state.error = action.payload
                                        },

                                        [deleteEnrollmentForUser.pending]: (state) => {
                                            state.status = statuses.LOADING;
                                        },

                                        // |==================|
                                        // | Find Courses by User (this will be gone)|
                                        // |==================|
                                        [findAllEnrollments.pending]: (state) => {
                                            state.status = statuses.LOADING;
                                        },

                                        [findAllEnrollments.fulfilled]: (state, action) => {
                                            state.status = statuses.SUCCESS;
                                            courseAdapter.removeAll(state);
                                            courseAdapter.addMany(state, action.payload)
                                        },
                                        [findAllEnrollments.rejected]: (state, action) => {
                                            state.status = statuses.FAILED;
                                            state.error = action.payload
                                        },

                                        // |================|
                                        // |Update Course by Id|
                                        // |================|
                                        [updateCourseById.fulfilled]: (state, action) => {
                                            // changed this part to make material table onUpdate/onDelete re-render
                                            state.status = statuses.SUCCESS
                                            courseAdapter.updateOne(state, {
                                                id: action.payload.courseId,
                                                changes: {
                                                    courseName: action.payload.courseName,
                                                    status: action.payload.status

                                                }
                                            });
                                        },
                                        [updateCourseById.pending]: (state) => {
                                            state.status = statuses.LOADING;
                                        },
                                        [updateCourseById.rejected]: (state, action) => {
                                            state.status = statuses.FAILED;
                                            state.error = action.payload
                                        },

                                        // |=============|
                                        // |Create Feed  |
                                        // |=============|
                                        [createFeedForCourse.fulfilled]: (state, action) => {
                                            const course = courseAdapter.getSelectors().selectById(state, action.payload.courseId)
                                            courseAdapter.updateOne(state, {
                                                id: action.payload.courseId,
                                                changes: {
                                                    feeds:
                                                        [...course.feeds,
                                                            action.payload]
                                                }
                                            });
                                            state.status = statuses.SUCCESS

                                        },
                                        [createFeedForCourse.pending]: (state) => {
                                            state.status = statuses.LOADING;
                                        },
                                        [createFeedForCourse.rejected]: (state, action) => {
                                            state.status = statuses.FAILED;
                                            state.error = action.payload;
                                        },

                                        // |================|
                                        // |Update Feed by Id|
                                        // |================|
                                        [updateFeedById.fulfilled]: (state, action) => {
                                            const course = courseAdapter.getSelectors().selectById(state, action.payload.courseId)
                                            courseAdapter.updateOne(state, {
                                                id: action.payload.courseId,
                                                changes: {
                                                    feeds:
                                                        [...course.feeds?.filter(f => f.feedId !== action.payload.feedId),
                                                            action.payload]
                                                }
                                            });
                                            state.status = statuses.SUCCESS
                                        },
                                        [updateFeedById.pending]: (state, action) => {
                                            state.status = statuses.LOADING;
                                        },
                                        [updateFeedById.rejected]: (state, action) => {
                                            state.status = statuses.FAILED;
                                            state.error = action.payload;
                                        },

                                        // |=================================|
                                        // |Create Course Role (Enrollment)  |
                                        // |=================================|
                                        [createEnrollmentForUser.fulfilled]: (state, action) => {
                                            const course = courseAdapter.getSelectors().selectById(state, action.payload.courseId)
                                            courseAdapter.updateOne(state, {
                                                id: action.payload.courseId,
                                                changes: {
                                                    courseRoles:
                                                        [...course.courseRoles,
                                                            action.payload]
                                                }
                                            });
                                            state.status = statuses.SUCCESS
                                        },
                                        [createEnrollmentForUser.pending]: (state) => {
                                            state.status = statuses.LOADING;
                                        },
                                        [createEnrollmentForUser.rejected]: (state, action) => {
                                            state.status = statuses.FAILED;
                                            state.error = action.payload;
                                        },

                                        // |=================================|
                                        // |Delete Course Role (Unenroll)  |
                                        // |=================================|
                                        [deleteEnrollmentForUser.fulfilled]: (state, action) => {
                                            const course = courseAdapter.getSelectors().selectById(state, action.payload.courseId)
                                            courseAdapter.updateOne(state, {
                                                id: action.payload.courseId,
                                                changes: {
                                                    courseRoles:
                                                        [...course.courseRoles?.filter(c =>
                                                            c.userId !== action.payload.userId)]
                                                }
                                            });
                                            state.status = statuses.SUCCESS
                                        },
                                        [deleteEnrollmentForUser.pending]: (state) => {
                                            state.status = statuses.LOADING;
                                        },
                                        [deleteEnrollmentForUser.rejected]: (state, action) => {
                                            state.status = statuses.FAILED;
                                            state.error = action.payload
                                        },

                                    }

                                })

export const courseActions = courseSlice.actions

export default courseSlice
