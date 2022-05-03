import React, { useState } from 'react';
import commentStyles from '../../styles/comments.module.scss';
import Overlay from '../Overlay'
import { useAppContext } from '../../context/index';
import { useMutation } from '@apollo/client';
// import { CREATE_COMMENT_FOR_POST, CREATE_REPLY_TO_COMMENT } from '../../utils/mutations';
import { useRouter } from 'next/router';
import RepliesToComment from './RepliesToComment';
import Comment from './Comment';
import Input from './Input';
import CommentDetails from './CommentDetails';
import axios from 'axios';

const Comments = ({ showComments, setShowComments, currentTopPosition, comments, post, postFromUser, refetchComments }) => {

  const [state] = useAppContext();
  const [newComment, setNewComment] = useState('');
  const [cursorIndex, setCursorIndex] = useState('');
  const [cursorIndexReply, setCursorIndexReply] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [showEmojisForReply, setShowEmojisForReply] = useState(false);

  const [reply, setReply] = useState({
    replyingTo: null,
    replyContent: '',
    commentId: null
  });

  // const [createCommentForPost] = useMutation(CREATE_COMMENT_FOR_POST);
  // const [replyToComment] = useMutation(CREATE_REPLY_TO_COMMENT);

  const router = useRouter();

  const handleCloseComments = () => {
    setShowComments(false);
    resetValues();
  }

  const resetValues = () => {
    setReply({
      replyingTo: null,
      replyContent: '',
      commentId: null
    });

    setNewComment('');
    setShowEmojis(false);
    setCursorIndex('');
    setShowEmojisForReply(false);
    setCursorIndexReply('');
  }


  const handleGoToProfile = (comment) => {
    if (comment.commentedBy.id === state.currentUser.id) {
      router.push('/profile');
    } else {
      router.push({
        pathname: `/profile/${comment.commentedBy}`,
        query: { postFromUser: JSON.stringify(comment.commentedBy) }
      });
    }
  }

  const handleSubmitComment = async () => {
    if (newComment === '') return;

    const createCommentInput = {
      commentContent: newComment,
      commentOnPostId: Number(post.id),
      commentedByUserId: Number(state.currentUser.id)
    }

    const { data } = await axios.post('http://localhost:5000/comments/new-comment', createCommentInput)
    if (data.success) {
      console.log('RES =>', data.data)
      refetchComments();
      resetValues();
    } else {
      console.log('ERROR =>', data.errorMessage)
    }
  }

  const submitReply = async () => {
    if (reply.replyContent === '') return;

    const replyToCommentInput = {
      replyContent: reply.replyContent,
      replyToCommentId: Number(reply.commentId),
      replyFromUserId: Number(state.currentUser.id)
    }

    const { data } = await axios.post('http://localhost:5000/comments/new-reply', replyToCommentInput)
    if (data.success) {
      console.log('RES =>', data.data)
      refetchComments();
      resetValues();
    } else {
      console.log('ERROR =>', data.errorMessage)
    }
  }

  const handleInitReply = (comment) => {
    setReply({
      ...reply,
      replyingTo: comment.user.userName,
      commentId: comment.id
    })
    setShowEmojisForReply(true);
  }


  return (
    <Overlay isShowing={showComments} currentTopPosition={currentTopPosition} height={'100vh'}> {/*TODO: change height value to something more dynamic */}

      <CommentDetails post={post} postFromUser={postFromUser} handleCloseComments={handleCloseComments} />

      <div className={commentStyles.commentContent}>
        {comments && comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <Comment comment={comment} handleGoToProfile={handleGoToProfile} handleInitReply={handleInitReply} />

            <RepliesToComment
              replies={comment.replyToComments}
              replyTo={comment.user.userName} />
          </React.Fragment>
        ))}
      </div>

      <Input
        resetValues={resetValues}
        reply={reply}
        setReply={setReply}
        newComment={newComment}
        setNewComment={setNewComment}
        showEmojis={showEmojis}
        setShowEmojis={setShowEmojis}
        showEmojisForReply={showEmojisForReply}
        setShowEmojisForReply={setShowEmojisForReply}
        state={state}
        handleSubmitComment={handleSubmitComment}
        submitReply={submitReply}
        cursorIndex={cursorIndex}
        setCursorIndex={setCursorIndex}
        cursorIndexReply={cursorIndexReply}
        setCursorIndexReply={setCursorIndexReply}
      />
    </Overlay>
  )
}

export default Comments