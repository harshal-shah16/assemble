import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import postService from "../services/post-service"
import {statuses} from "./state-types";
import answerService from "../services/answer-service"
import commentService from "../services/comment-service"
import questionService from "../services/question-service"

// Adapter for CRUD operations on state
const postsAdapter = createEntityAdapter({
                                             // If id is not in field called 'id', we specify it
                                             // this way
                                             selectId: (post) => post.postId,
                                             // Keep the "all IDs" array sorted based on post titles
                                             sortComparer: (a, b) => -1 * a.createdAt.localeCompare(
                                                 b.createdAt),
                                         });
// Export the selectors from on the post reducer
export const postSelectors = postsAdapter.getSelectors(state => state.posts);

// Asynchronous service actions
export const createPostForFeed =
    createAsyncThunk('posts/createPostForFeed',
                     async ({feedId, postTitle, postBody}) => {
                         return postService.postPostForFeed(feedId, {postTitle, postBody});
                     });

export const deletePostFromFeed =
    createAsyncThunk('posts/deletePostFromFeed', async ({courseId, postId}) => {
        return postService.deletePostFromFeed(courseId, postId)
    });

export const findAllPostsForFeed =
    createAsyncThunk('posts/findAllPostsForCourse', async ({feedId}) => {
        return await postService.fetchAllPostsByFeed(feedId)
    });

export const findPostById =
    createAsyncThunk('posts/findPostById', async (postId) => {
        return await postService.fetchPostById(postId);
    });

export const updatePostById =
    createAsyncThunk('posts/updatePostById',
                     async ({courseId, postId, post}) => {
                         return await postService.putUpdatedPost(courseId, postId, post);
                     });
// |======================================Question===============================================|
export const updateQuestionById =
    createAsyncThunk('questions/updateQuestionById',
                     async ({courseId, postId, question}) => {
                         return await questionService.putUpdatedQuestion(courseId, postId,
                                                                         question);
                     });

// |======================================Answer===============================================|
export const updateAnswerById =
    createAsyncThunk('answers/updateAnswerById',
                     async ({courseId, answerId, answer}) => {
                         return await answerService.putUpdatedAnswer(courseId, answerId,
                                                                     answer);
                     });

export const createAnswerForPost =
    createAsyncThunk('answers/createAnswerForPost',
                     async ({courseId, postId, answer}) => {
                         return answerService.createAnswerForPost(courseId, postId, answer);
                     });

export const deleteAnswerFromPost =
    createAsyncThunk('answers/deleteAnswerFromPost',
                         async ({courseId, answerId}) => {
                                          return answerService.deleteAnswerFromPost(courseId, answerId);
                    });                     
// |======================================Comment===============================================|
export const updateCommentById =
    createAsyncThunk('comments/updateCommentById',
                     async ({courseId, commentId, comment}) => {
                         return await commentService.putUpdatedComment(courseId, commentId,
                                                                       comment);
                     });

export const createCommentForPost =
    createAsyncThunk('comments/createCommentForPost',
                     async ({courseId, postId, comment}) => {
                         return commentService.createCommentForPost(courseId, postId,
                                                                    comment);
                     });

export const deleteCommentFromPost =
    createAsyncThunk('comments/deleteCommentFromPost',
                     async ({courseId, commentId}) => {
                         return commentService.deleteCommentFromPost(courseId, commentId);
                     });

// |======================================Likes===============================================|

export const updatePostLikeById =
    createAsyncThunk('posts/updatePostLikeById', async ({courseId, postId, userId}) => {
        return await postService.putUpdatedPostLike(courseId, postId, userId);
    });

export const deletePostLikeById =
    createAsyncThunk('posts/deletePostLikeById', async ({courseId, postId, userId}) => {
        return await postService.deletePostLike(courseId, postId, userId);
    });

export const updateAnswerLikeById =
    createAsyncThunk('posts/updateAnswerLikeById', async ({courseId, postId, userId, answerId}) => {
        return await answerService.putUpdatedAnswerLike(courseId, answerId, userId);
    });

export const deleteAnswerLikeById =
    createAsyncThunk('posts/deleteAnswerLikeById', async ({courseId, postId, userId, answerId}) => {
        return await answerService.deleteAnswerLike(courseId, answerId, userId);
    });

export const updateCommentLikeById =
    createAsyncThunk('posts/updateCommentLikeById',
                     async ({courseId, postId, userId, commentId}) => {
                         return await commentService.putUpdatedCommentLike(courseId, commentId,
                                                                           userId);
                     });

export const deleteCommentLikeById =
    createAsyncThunk('posts/deleteCommentLikeById',
                     async ({courseId, postId, userId, commentId}) => {
                         return await commentService.deleteCommentLike(courseId, commentId, userId);
                     });

export const postThunks = {
    findAllPostsForFeed,
    findPostById,
    createPostForFeed,
    deletePostFromFeed,
    updatePostById,

    updateQuestionById,

    updatePostLikeById,
    deletePostLikeById,
    updateAnswerLikeById,
    deleteAnswerLikeById,

    updateAnswerById,
    createAnswerForPost,
    deleteAnswerFromPost,

    updateCommentById,
    createCommentForPost,
    deleteCommentFromPost,
    updateCommentLikeById,
    deleteCommentLikeById,

}

// Post slice
const postsSlice = createSlice({
                                   name: 'posts',
                                   initialState: postsAdapter.getInitialState({
                                                                                  status: statuses.IDLE,
                                                                                  error: null,
                                                                                  createStatus: statuses.IDLE,
                                                                              }),
                                   reducers: {},
                                   extraReducers: {
                                       // |=============|
                                       // | Create post |
                                       // |=============|
                                       [createPostForFeed.fulfilled]: (state, action) => {

                                           postsAdapter.addOne(state, action.payload)
                                           state.status = statuses.SUCCESS

                                       },

                                       [createPostForFeed.pending]: (state) => {
                                           state.status = statuses.LOADING;
                                       },
                                       [createPostForFeed.rejected]: (state, action) => {
                                           state.status = statuses.FAILED;
                                           state.error = action.payload;
                                       },
                                       // |=============|
                                       // | Delete post |
                                       // |=============|
                                       [deletePostFromFeed.fulfilled]: (state, action) => {
                                           state.status = statuses.SUCCESS
                                           postsAdapter.removeOne(state,
                                                                  action.payload.postId);
                                       },
                                       [deletePostFromFeed.rejected]: (state, action) => {
                                           state.status = statuses.FAILED
                                           state.error = action.payload
                                       },
                                       [deletePostFromFeed.pending]: (state) => {
                                           state.status = statuses.LOADING;
                                       },
                                       // |================|
                                       // | Find all posts |
                                       // |================|
                                       [findAllPostsForFeed.pending]: (state) => {
                                           state.status = statuses.LOADING;
                                       },
                                       [findAllPostsForFeed.fulfilled]: (state, action) => {
                                           state.status = statuses.SUCCESS
                                           // Add any fetched posts to the array
                                           postsAdapter.setAll(state, action.payload);
                                       },
                                       [findAllPostsForFeed.rejected]: (state, action) => {
                                           state.status = statuses.FAILED
                                           state.error = action.payload
                                       },
                                       // |==================|
                                       // | Find single post |
                                       // |==================|
                                       [findPostById.pending]: (state, action) => {
                                           state.status = statuses.LOADING;
                                       },
                                       [findPostById.fulfilled]: (state, action) => {
                                           state.status = statuses.SUCCESS
                                           postsAdapter.addOne(state, action.payload);
                                       },
                                       [findPostById.rejected]: (state, action) => {
                                           state.status = statuses.FAILED
                                           state.error = action.payload
                                       },
                                       // |=============|
                                       // | Update post |
                                       // |=============|
                                       [updatePostById.pending]: (state, action) => {
                                           state.status = statuses.LOADING
                                       },
                                       [updatePostById.fulfilled]: (state, action) => {
                                           postsAdapter.updateOne(state, {
                                               id: action.payload.postId,
                                               changes: {
                                                   postBody: action.payload.postBody
                                               }
                                           });
                                           state.status = statuses.SUCCESS
                                       },
                                       [updatePostById.rejected]: (state, action) => {
                                           state.error = action.payload
                                       },

                                       // |=============|
                                       // | Update post Likes|
                                       // |=============|
                                       [updatePostLikeById.pending]: (state, action) => {
                                           const post = postsAdapter.getSelectors()
                                               .selectById(state,
                                                           action.meta.arg.postId);
                                           postsAdapter.updateOne(state, {
                                               id: post.postId,
                                               changes: {
                                                   likes: {
                                                       userIds: [...post.likes.userIds,
                                                                 action.meta.arg.userId]
                                                   }

                                               }
                                           });
                                       },
                                       [updatePostLikeById.fulfilled]: (state, action) => {
                                           postsAdapter.updateOne(state, {
                                               id: action.payload.postId,
                                               changes: {
                                                   likes: action.payload.likes

                                               }
                                           });
                                           state.status = statuses.SUCCESS
                                       },
                                       [updatePostLikeById.rejected]: (state, action) => {
                                           state.error = action.payload
                                       },

                                       // |=============|
                                       // | Delete post Likes|
                                       // |=============|
                                       [deletePostLikeById.pending]: (state, action) => {
                                           const post = postsAdapter.getSelectors()
                                               .selectById(state,
                                                           action.meta.arg.postId);
                                           postsAdapter.updateOne(state, {
                                               id: post.postId,
                                               changes: {
                                                   likes: {
                                                       userIds: post.likes.userIds.filter(
                                                           uid => uid !==
                                                                  action.meta.arg.userId),
                                                   },
                                               }
                                           });
                                           state.status = statuses.LOADING
                                       },
                                       [deletePostLikeById.fulfilled]: (state, action) => {
                                           postsAdapter.updateOne(state, {
                                               id: action.payload.postId,
                                               changes: {
                                                   likes: action.payload.likes

                                               }
                                           });
                                           state.status = statuses.SUCCESS
                                       },
                                       [updatePostLikeById.rejected]: (state, action) => {
                                           state.error = action.payload
                                       },

                                       // |=============|
                                       // | Update Question |
                                       // |=============|
                                       [updateQuestionById.pending]: (state, action) => {
                                           const post =
                                               {
                                                   ...postsAdapter.getSelectors()
                                                       .selectById(state, action.meta.arg.postId)
                                               };
                                           postsAdapter.updateOne(state, {
                                               id: action.meta.arg.postId,
                                               changes: {
                                                   ...post,
                                                   question: {
                                                       ...post.question,
                                                       resolved: !post.question.resolved
                                                   },
                                               }
                                           });
                                       },
                                       [updateQuestionById.fulfilled]: (state, action) => {
                                           const post =
                                               {
                                                   ...postsAdapter.getSelectors()
                                                       .selectById(state, action.payload.postId)
                                               };
                                           postsAdapter.updateOne(state, {
                                               id: action.payload.postId,
                                               changes: {
                                                   ...post,
                                                   question:
                                                       {
                                                           ...action.payload,
                                                           answers: [...post.question.answers]
                                                       },
                                               }
                                           });
                                           state.status = statuses.SUCCESS
                                       },
                                       [updateQuestionById.rejected]: (state, action) => {
                                           state.status = statuses.FAILED
                                       },

                                       // |=============|
                                       // | Create Answer |
                                       // |=============|
                                       [createAnswerForPost.fulfilled]: (state, action) => {
                                           const post =
                                               postsAdapter.getSelectors()
                                                   .selectById(state, action.payload.postId)
                                           postsAdapter.updateOne(state, {
                                               // Id to decrypt post from hash map
                                               id: action.payload.postId,
                                               // Changed properties on the post
                                               changes: {
                                                   question: {
                                                       ...post.question,
                                                       answers:
                                                           [...post.question?.answers,
                                                            action.payload]
                                                   }
                                               }
                                           });
                                           state.createStatus = statuses.SUCCESS
                                           state.status = statuses.SUCCESS
                                       },
                                       [createAnswerForPost.pending]: (state) => {
                                           state.status = statuses.LOADING;
                                           state.createStatus = statuses.LOADING
                                       },
                                       [createAnswerForPost.rejected]: (state, action) => {
                                           state.createStatus = statuses.FAILED
                                       },
                                       // |=============|
                                       // | Update Answer |
                                       // |=============|
                                       [updateAnswerById.pending]: (state, action) => {
                                           state.status = statuses.LOADING

                                       },
                                       [updateAnswerById.fulfilled]: (state, action) => {
                                           // We need the post because server only sent us the
                                           // single answer
                                           const post =
                                               postsAdapter.getSelectors()
                                                   .selectById(state, action.payload.postId)
                                           postsAdapter.updateOne(state, {
                                               // Id to decrypt post from hash map
                                               id: action.payload.postId,
                                               // Changed properties on the post
                                               changes: {
                                                   question: {
                                                       // Every from before
                                                       ...post.question,
                                                       // Override answers
                                                       answers:
                                                       // Any other answers except for the one
                                                       // being updated
                                                           [...post.question.answers?.filter(
                                                               a => a.answerId
                                                                    !== action.payload.answerId),
                                                               // Adds back the updated answer
                                                            action.payload]
                                                   }
                                               }
                                           });
                                           state.status = statuses.SUCCESS
                                       },

                                       [updateAnswerById.rejected]: (state, action) => {
                                           state.error = action.payload
                                       },




                                       // |=============|
                                       // | Delete Answer |
                                       // |=============|
                                    [deleteAnswerFromPost.pending]: (state, action) => {
                                        state.status = statuses.LOADING

                                    },
                                    [deleteAnswerFromPost.fulfilled]: (state, action) => {
                                        // We need the post because server only sent us the
                                        // single answer
                                        const post =
                                            postsAdapter.getSelectors()
                                                .selectById(state, action.payload.postId)
                                        postsAdapter.updateOne(state, {
                                            // Id to decrypt post from hash map
                                            id: action.payload.postId,
                                            // Changed properties on the post
                                            changes: {
                                                question: {
                                                    // Every from before
                                                    ...post.question,
                                                    // Override answers
                                                    answers:
                                                    // Any other answers except for the one
                                                    // being updated
                                                        [...post.question.answers?.filter(
                                                            a => a.answerId
                                                                 !== action.payload.answerId),
                                                        ]
                                                }
                                            }
                                        });
                                        state.status = statuses.SUCCESS
                                    },

                                    [deleteAnswerFromPost.rejected]: (state, action) => {
                                        state.error = action.payload
                                    },




                                       // |====================|
                                       // | Update Answer Likes|
                                       // |====================|
                                       [updateAnswerLikeById.pending]: (state, action) => {
                                           const post = postsAdapter.getSelectors()
                                               .selectById(state,
                                                           action.meta.arg.postId);
                                           postsAdapter.updateOne(state, {
                                               // Id to decrypt post from hash map
                                               id: post.postId,
                                               // Changed properties on the post
                                               changes: {
                                                   question: {
                                                       // Every from before
                                                       ...post.question,
                                                       // Override answers
                                                       answers:
                                                       // Any other answers except for the one
                                                       // being updated
                                                           [...post.question.answers?.map(
                                                               a => a.answerId
                                                                    === action.meta.arg.answerId ?
                                                                   {
                                                                       ...a,
                                                                       likes: {
                                                                           userIds: [...a.likes.userIds,
                                                                                     action.meta.arg.userId]
                                                                       }
                                                                   }
                                                                                                 : a),
                                                           ]
                                                   }
                                               }
                                           });

                                       },

                                       [updateAnswerLikeById.fulfilled]: (state, action) => {

                                           const post =
                                               postsAdapter.getSelectors()
                                                   .selectById(state, action.payload.postId)
                                           postsAdapter.updateOne(state, {
                                               // Id to decrypt post from hash map
                                               id: action.payload.postId,
                                               // Changed properties on the post
                                               changes: {
                                                   question: {
                                                       // Every from before
                                                       ...post.question,
                                                       // Override answers
                                                       answers:
                                                       // Any other answers except for the one
                                                       // being updated
                                                           [...post.question.answers?.filter(
                                                               a => a.answerId
                                                                    !== action.payload.answerId),
                                                               // Adds back the updated answer
                                                            action.payload]
                                                   }
                                               }
                                           });
                                           state.status = statuses.SUCCESS
                                       },

                                       [updateAnswerLikeById.rejected]: (state, action) => {
                                           state.error = action.payload
                                       },

                                       // |====================|
                                       // | Delete Answer Likes|
                                       // |====================|
                                       [deleteAnswerLikeById.pending]: (state, action) => {
                                           const post = postsAdapter.getSelectors()
                                               .selectById(state,
                                                           action.meta.arg.postId);
                                           postsAdapter.updateOne(state, {
                                               // Id to decrypt post from hash map
                                               id: post.postId,
                                               // Changed properties on the post
                                               changes: {
                                                   question: {
                                                       // Every from before
                                                       ...post.question,
                                                       // Override answers
                                                       answers:
                                                       // Any other answers except for the one
                                                       // being updated
                                                           [...post.question.answers?.map(
                                                               a => a.answerId
                                                                    === action.meta.arg.answerId ?
                                                                   {
                                                                       ...a,
                                                                       likes: {
                                                                           userIds: a.likes.userIds.filter(
                                                                               uid => uid !==
                                                                                      action.meta.arg.userId)
                                                                       }
                                                                   }
                                                                                                 : a),
                                                           ]
                                                   }
                                               }
                                           });
                                       },

                                       [deleteAnswerLikeById.fulfilled]: (state, action) => {

                                           const post =
                                               postsAdapter.getSelectors()
                                                   .selectById(state, action.payload.postId)
                                           postsAdapter.updateOne(state, {
                                               // Id to decrypt post from hash map
                                               id: action.payload.postId,
                                               // Changed properties on the post
                                               changes: {
                                                   question: {
                                                       // Every from before
                                                       ...post.question,
                                                       // Override answers
                                                       answers:
                                                       // Any other answers except for the one
                                                       // being updated
                                                           [...post.question.answers?.filter(
                                                               a => a.answerId
                                                                    !== action.payload.answerId),
                                                               // Adds back the updated answer
                                                            action.payload]
                                                   }
                                               }
                                           });
                                           state.status = statuses.SUCCESS
                                       },

                                       [deleteAnswerLikeById.rejected]: (state, action) => {
                                           state.error = action.payload
                                       },

                                       // |=============|
                                       // | Create Comment |
                                       // |=============|
                                       [createCommentForPost.fulfilled]: (state, action) => {
                                           const post =
                                               {
                                                   ...postsAdapter.getSelectors()
                                                       .selectById(state, action.payload.postId)
                                               };
                                           postsAdapter.updateOne(state, {
                                               id: action.payload.postId,
                                               changes: {
                                                   comments:
                                                       [...post.comments,
                                                        action.payload]

                                               }
                                           });
                                           state.status = statuses.SUCCESS
                                       },
                                       [createCommentForPost.pending]: (state) => {
                                           state.status = statuses.LOADING;
                                       },
                                       [createCommentForPost.rejected]: (state, action) => {
                                           state.status = statuses.FAILED;
                                           state.error = action.payload;
                                       },

                                       // |====================|
                                       // | Update Comment Likes|
                                       // |====================|
                                       [updateCommentLikeById.pending]: (state, action) => {
                                           state.status = statuses.LOADING
                                       },

                                       [updateCommentLikeById.fulfilled]: (state, action) => {

                                           const post =
                                               postsAdapter.getSelectors()
                                                   .selectById(state, action.payload.postId)
                                           postsAdapter.updateOne(state, {
                                               // Id to decrypt post from hash map
                                               id: action.payload.postId,
                                               // Changed properties on the post
                                               changes: {
                                                   comments:
                                                       [...post.comments?.filter(
                                                           a => a.commentId
                                                                !== action.payload.commentId),
                                                           // Adds back the updated comment
                                                        action.payload]

                                               }
                                           });
                                           state.status = statuses.SUCCESS
                                       },

                                       [updateCommentLikeById.rejected]: (state, action) => {
                                           state.error = action.payload
                                       },

                                       // |====================|
                                       // | Delete Comment Likes|
                                       // |====================|
                                       [deleteCommentLikeById.pending]: (state, action) => {
                                           state.status = statuses.LOADING
                                       },

                                       [deleteCommentLikeById.fulfilled]: (state, action) => {

                                           const post =
                                               postsAdapter.getSelectors()
                                                   .selectById(state, action.payload.postId)
                                           postsAdapter.updateOne(state, {
                                               // Id to decrypt post from hash map
                                               id: action.payload.postId,
                                               // Changed properties on the post
                                               changes: {
                                                   comments:
                                                       [...post.comments?.filter(
                                                           a => a.commentId
                                                                !== action.payload.commentId),
                                                           // Adds back the updated comment
                                                        action.payload]

                                               }
                                           });
                                           state.status = statuses.SUCCESS
                                       },

                                       [deleteCommentLikeById.rejected]: (state, action) => {
                                           state.error = action.payload
                                       },

                                       // |=============|
                                       // | Update Comment |
                                       // |=============|
                                       [updateCommentById.pending]: (state, action) => {
                                           state.status = statuses.LOADING;
                                       },
                                       [updateCommentById.fulfilled]: (state, action) => {

                                           const post =
                                               {
                                                   ...postsAdapter.getSelectors()
                                                       .selectById(state, action.payload.postId)
                                               };
                                           postsAdapter.updateOne(state, {
                                               id: action.payload.postId,
                                               changes: {
                                                   comments:
                                                       [...post.comments?.filter(
                                                           a => a.commentId
                                                                !== action.payload.commentId),
                                                        action.payload]

                                               }
                                           });
                                           state.status = statuses.SUCCESS

                                       },
                                       [updateCommentById.rejected]: (state, action) => {
                                           state.error = action.payload
                                       },
                                       [deleteCommentFromPost.pending]: (state) => {
                                           state.status = statuses.LOADING;
                                       },
                                       [deleteCommentFromPost.fulfilled]: (state, action) => {
                                           // TODO you need to get the post some how to filter out
                                           // the comment!
                                           const post =
                                               {
                                                   ...postsAdapter.getSelectors()
                                                       .selectById(state, action.payload.postId)
                                               };
                                           postsAdapter.updateOne(state, {
                                               id: action.payload.postId,
                                               changes: {
                                                   comments:
                                                       [...post.comments?.filter(
                                                           a => a.commentId
                                                                !== action.payload.commentId),
                                                       ]
                                               }
                                           });
                                           state.status = statuses.SUCCESS
                                       },
                                       [deleteCommentFromPost.rejected]: (state, action) => {
                                           state.error = action.payload
                                       },
                                   },
                               });

export const postActions = postsSlice.actions;

export default postsSlice;
