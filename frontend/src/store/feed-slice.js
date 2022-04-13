import {createAsyncThunk, createEntityAdapter, createSlice,} from "@reduxjs/toolkit";
import feedService from "../services/feed-service";
import {statuses} from "./state-types";

const feedAdapter = createEntityAdapter({
                                            selectId: (feed) => feed.feedId,
                                            sortComparer: (a, b) => a.createdAt.localeCompare(
                                                b.createdAt)
                                        });

export const feedSelector = feedAdapter.getSelectors(state => state.feeds);

export const findAllFeedsForCourse = createAsyncThunk(
    "feed/findAllFeedsForCourse",
    async (courseId) => {
        return await feedService.fetchAllFeedsByCourse(courseId);
    }
);

export const createFeedForCourse = createAsyncThunk(
    "feed/createFeedForCourse",
    async ({courseId, feedName}) => {
        return feedService.postFeedForCourse(courseId, {feedName});
    }
);

export const findFeedById = createAsyncThunk(
    "feed/findFeedById",
    async (feedId) => {
        return feedService.fetchFeedById(feedId);
    }
);

export const updateFeedById = createAsyncThunk(
    "feed/updateFeedById",
    async ({courseId, feedId, feed}) => {
        return await feedService.putUpdatedFeed(courseId, feedId, feed);
    }
);



export const feedThunks = {
    findAllFeedsForCourse,
    createFeedForCourse,
    findFeedById,
    updateFeedById,
};

const feedSlice = createSlice({
                                  name: "feeds",
                                  initialState: feedAdapter.getInitialState({
                                                                                status: statuses.IDLE,
                                                                                error: null,
                                                                            }),
                                  reducers: {},
                                  extraReducers: {
                                      // |=============|
                                      // |Create Feed  |
                                      // |=============|
                                      [createFeedForCourse.fulfilled]: (state, action) => {
                                          state.status = statuses.SUCCESS;
                                          feedAdapter.addOne(state, action.payload);
                                      },
                                      [createFeedForCourse.pending]: (state) => {
                                          state.status = statuses.LOADING;
                                      },
                                      [createFeedForCourse.rejected]: (state, action) => {
                                          state.status = statuses.FAILED;
                                          state.error = action.payload;
                                      },

                                      // |===========================|
                                      // | Find all Feeds For Course |
                                      // |===========================|
                                      [findAllFeedsForCourse.pending]: (state) => {
                                          state.status = statuses.LOADING;
                                      },
                                      [findAllFeedsForCourse.fulfilled]: (state, action) => {
                                          state.status = statuses.SUCCESS;
                                          // Add any fetched posts to the array
                                          feedAdapter.removeAll(state);
                                          feedAdapter.addMany(state, action.payload);
                                      },
                                      [findAllFeedsForCourse.rejected]: (state, action) => {
                                          state.status = statuses.FAILED;
                                          state.error = action.payload;
                                      },
                                      // |================|
                                      // |Find Feed by Id|
                                      // |================|
                                      [findFeedById.pending]: (state, action) => {
                                          state.status = statuses.LOADING;
                                      },
                                      [findFeedById.fulfilled]: (state, action) => {
                                          state.status = statuses.SUCCESS;
                                          feedAdapter.addOne(state, action.payload);
                                      },
                                      [findFeedById.rejected]: (state, action) => {
                                          state.status = statuses.FAILED;
                                          state.error = action.payload;
                                      },

                                      // |================|
                                      // |Update Feed by Id|
                                      // |================|
                                      [updateFeedById.fulfilled]: (state, action) => {
                                          state.status = statuses.SUCCESS;
                                      },
                                      [updateFeedById.pending]: (state, action) => {
                                          state.status = statuses.LOADING;
                                      },
                                      [updateFeedById.rejected]: (state, action) => {
                                          state.status = statuses.FAILED;
                                          state.error = action.payload;
                                      },
                                  },
                              });

export default feedSlice;
