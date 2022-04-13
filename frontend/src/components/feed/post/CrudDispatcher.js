import {postThunks} from "../../../store/post-slice";

export default class CrudDispatcher {
    dispatch;
    post;

    constructor(post, dispatch) {
        this.post = post;
        this.dispatch = dispatch;
    }

    /************************************** POST *************************************************/
    handleUpdatePost = (post, newContent) => {
        const newPost = {...post, postBody: newContent};
        this.dispatch(postThunks.updatePostById(
            {courseId: this.post.courseId, postId: this.post.postId, post: newPost})
        )
      }

    handleDeletePost = () => {
        this.dispatch(postThunks.deletePostFromFeed(
            {courseId: this.post.courseId, postId: this.post.postId}));
    }

    /************************************** QUESTION ***********************************************/

    handleQuestionUpdate(newContent) {
        this.dispatch(postThunks.updateQuestionById(
            {courseId: this.post.courseId, postId: this.post.postId, question: newContent}))
    }

    /************************************** ANSWERS ***********************************************/
    handleUpdateAnswer = (answer, newContent) => {
        const newAnswer = {...answer, content: newContent};
        this.dispatch(postThunks.updateAnswerById(
            {
                courseId: this.post.courseId,
                answerId: answer.answerId,
                answer: newAnswer
            }));
    }

    handleCreateAnswer = (content) => {
        this.dispatch(postThunks.createAnswerForPost(
            {
                courseId: this.post.courseId,
                postId: this.post.postId, answer: {content}
            }));
    }

    handleDeleteAnswer = (answerId) => {
        this.dispatch(postThunks.deleteAnswerFromPost(
            {courseId: this.post.courseId, answerId}));
    }

    handleDeleteComment = (commentId) => {
        this.dispatch(postThunks.deleteCommentFromPost(
            {courseId: this.post.courseId, commentId}));
    }

    /************************************** COMMENTS **********************************************/
    handleUpdateComment = (comment, newContent) => {
        const newComment = {...comment, content: newContent};
        this.dispatch(postThunks.updateCommentById(
            {
                courseId: this.post.courseId,
                commentId: comment.commentId,
                comment: newComment
            })
        )
    }

    handleCreateComment = (content) => {
        this.dispatch(postThunks.createCommentForPost(
            {
                courseId: this.post.courseId,
                postId: this.post.postId,
                comment: {content}
            }));
    }

    handleDeleteComment = (commentId) => {
        this.dispatch(postThunks.deleteCommentFromPost(
            {courseId: this.post.courseId, commentId}));
    }

    /************************************** LIKES **********************************************/
    handleUpdatePostLike = (courseId, postId, userId) => {

        this.dispatch(postThunks.updatePostLikeById(
            {courseId: courseId, postId: postId, userId: userId})
        )
    }

    handleDeletePostLike = (courseId, postId, userId) => {
        this.dispatch(postThunks.deletePostLikeById(
            {courseId: courseId, postId: postId, userId: userId})
        )
    }

    handleUpdateAnswerLike = (courseId, answerId, userId) => {
        this.dispatch(postThunks.updateAnswerLikeById(
            {courseId, postId: this.post.postId, userId, answerId})
        )
    }

    handleDeleteAnswerLike = (courseId, answerId, userId) => {
        this.dispatch(postThunks.deleteAnswerLikeById(
            {courseId: courseId, postId: this.post.postId, userId: userId, answerId: answerId})
        )
    }

    handleUpdateCommentLike = (courseId, commentId, userId) => {
        this.dispatch(postThunks.updateCommentLikeById(
            {courseId: courseId, postId: this.post.postId, userId: userId, commentId: commentId})
        )
    }

    handleDeleteCommentLike = (courseId, commentId, userId) => {
        this.dispatch(postThunks.deleteCommentLikeById(
            {courseId, postId: this.post.postId, userId: userId, commentId})
        )
    }
}
