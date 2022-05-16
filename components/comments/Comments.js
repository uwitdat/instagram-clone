import React, { useState } from 'react';
import commentStyles from '../../styles/comments.module.scss';
import Overlay from '../Overlay'
import { useAppContext } from '../../context/index';
import { useMutation, useLazyQuery } from '@apollo/client';
import { CREATE_COMMENT_FOR_POST, CREATE_REPLY_TO_COMMENT } from '../../utils/mutations';
import { GET_POSTS_FROM_USER } from '../../utils/queries';
import { useRouter } from 'next/router';
import RepliesToComment from './RepliesToComment';
import Comment from './Comment';
import Input from './Input';
import CommentDetails from './CommentDetails';

const Comments = ({ currentUser, showComments, setShowComments, currentTopPosition, post, setPosts, postFromUser, resetUser }) => {

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


  const [createCommentForPost] = useMutation(CREATE_COMMENT_FOR_POST);
  const [replyToComment] = useMutation(CREATE_REPLY_TO_COMMENT);

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
    if (comment.commentedBy.id === currentUser.id) {
      router.push('/profile');
    } else {
      router.push({
        pathname: `/profile/${comment.commentedBy}`,
        query: { postFromUser: JSON.stringify(comment.commentedBy) }
      });
    }
  }

  const [postsByUser] = useLazyQuery(GET_POSTS_FROM_USER)

  const handleSubmitComment = async () => {
    if (newComment === '') return;

    try {
      const { data } = await createCommentForPost({
        variables: {
          createCommentInput: {
            commentContent: newComment,
            commentOnPostId: Number(post.id),
            commentedByUserId: Number(currentUser.id),
            commentToUserId: Number(postFromUser.id)
          }
        }
      })
      if (data) {
        // make fetch for comments by post id
        // console.log(data)
        // setPost({
        //   ...post,
        //   comments: [data.createCommentForPost, ...post.comments]
        // })

        if (setPosts !== undefined) {
          const { data } = await postsByUser({
            variables: {
              userId: postFromUser.id
            }
          })
          if (data && data.postsByUser) {
            setPosts(data.postsByUser);
          }
        }


        // refetchPosts();
        if (resetUser !== undefined) {
          resetUser();
        }

        resetValues();
      }
    } catch (err) {
      console.log(err);
    }
  }


  const submitReply = async () => {
    if (reply.replyContent === '') return;

    try {
      const { data } = await replyToComment({
        variables: {
          replyToCommentInput: {
            replyContent: reply.replyContent,
            replyToCommentId: Number(reply.commentId),
            replyFromUserId: Number(currentUser.id)
          }
        }
      })
      if (data) {

        if (setPosts !== undefined) {
          const { data } = await postsByUser({
            variables: {
              userId: postFromUser.id
            }
          })
          if (data && data.postsByUser) {
            setPosts(data.postsByUser);
          }
        }



        // const findIdx = (comment) => comment.id === reply.commentId;

        // const idx = post.comments.findIndex(findIdx);

        // setPost({
        //   ...post,
        //   comments: Object.assign([...post.comments], {
        //     [idx]: {
        //       ...post.comments[idx],
        //       replies: [data.replyToComment, ...post.comments[idx].replies]
        //     }
        //   })
        // });
        if (resetUser !== undefined) {
          resetUser();
        }

        resetValues();
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleInitReply = (comment) => {
    setReply({
      ...reply,
      replyingTo: comment.commentedBy.userName,
      commentId: comment.id
    })
    setShowEmojisForReply(true);
  }


  return (
    <Overlay isShowing={showComments} currentTopPosition={currentTopPosition} height={'100vh'}> {/*TODO: change height value to something more dynamic */}

      <CommentDetails post={post} postFromUser={postFromUser} handleCloseComments={handleCloseComments} />

      <div className={commentStyles.commentContent}>
        {post.comments && post.comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <Comment comment={comment} handleGoToProfile={handleGoToProfile} handleInitReply={handleInitReply} />

            <RepliesToComment
              replies={comment.replies}
              replyTo={comment.commentedBy.userName} />
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
        currentUser={currentUser}
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