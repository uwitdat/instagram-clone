import React, { useState, useRef, useEffect } from 'react';
import commentStyles from '../styles/comments.module.scss';
import { FiSend } from 'react-icons/fi';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { RiHeartLine } from 'react-icons/ri';
import moment from 'moment';
import Overlay from './Overlay';
import { useAppContext } from '../context';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT_FOR_POST, CREATE_REPLY_TO_COMMENT } from '../utils/mutations';
import { useRouter } from 'next/router';
import RepliesToComment from './RepliesToComment';
import { EmojiPicker } from './EmojiPicker';

const Comments = ({ showComments, setShowComments, currentTopPosition, comments, post, postFromUser, refetchComments }) => {

  const handleCloseComments = () => {
    setShowComments(false);

    setNewComment('')
    setShowEmojis(false)
    setCursorIndex('')

    setReply({
      replyingTo: null,
      replyContent: '',
      commentId: null
    });
    setShowEmojisForReply(false)
    setCursorIndexReply('')
  }

  const [newComment, setNewComment] = useState('');

  const [state] = useAppContext();
  const [createCommentForPost] = useMutation(CREATE_COMMENT_FOR_POST)

  const router = useRouter();

  const handleGoToProfile = (comment) => {
    if (comment.commentedBy.id === state.currentUser.id) {
      router.push('/profile')
    } else {
      router.push({
        pathname: `/profile/${comment.commentedBy}`,
        query: { postFromUser: JSON.stringify(comment.commentedBy) }
      })
    }
  }

  const handleSubmitComment = async () => {
    if (newComment === '') return;

    try {
      const { data } = await createCommentForPost({
        variables: {
          createCommentInput: {
            commentContent: newComment,
            commentOnPostId: Number(post.id),
            commentedByUserId: Number(state.currentUser.id)
          }
        }
      })
      if (data) {
        refetchComments();
        setNewComment('');
        setShowEmojis(false);
        setCursorIndex('');
      }
    } catch (err) {
      console.log(err)
    }
  }

  const inputRef = useRef(null)
  const spanRef = useRef(null)
  const btnRef = useRef(null)
  const [spanWidth, setSpanWidth] = useState(null)


  const [reply, setReply] = useState({
    replyingTo: null,
    replyContent: '',
    commentId: null
  });

  const handleInitReply = (comment) => {
    setReply({
      ...reply,
      replyingTo: comment.commentedBy.userName,
      commentId: comment.id
    })
    setShowEmojisForReply(true)
  }

  const [replyToComment] = useMutation(CREATE_REPLY_TO_COMMENT);

  const submitReply = async () => {
    if (reply.replyContent === '') return;

    try {
      const { data } = await replyToComment({
        variables: {
          replyToCommentInput: {
            replyContent: reply.replyContent,
            replyToCommentId: Number(reply.commentId),
            replyFromUserId: Number(state.currentUser.id)
          }
        }
      })
      if (data) {
        setReply({
          replyingTo: null,
          replyContent: '',
          commentId: null
        });
        refetchComments()
        setShowEmojisForReply(false)
        setCursorIndexReply('')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const resetReply = () => {
    setReply({
      replyingTo: null,
      replyContent: '',
      commentId: null
    });
    setShowEmojisForReply(false)
    setCursorIndexReply('')
  }

  useEffect(() => {
    if (reply.replyingTo) {

      inputRef.current.focus()
      setSpanWidth(spanRef.current.getBoundingClientRect().width)
      setNewComment('')
      setShowEmojis(false)
      setCursorIndex('')
    }
  }, [reply])


  const [cursorIndex, setCursorIndex] = useState('');
  const [cursorIndexReply, setCursorIndexReply] = useState('');

  const [showEmojis, setShowEmojis] = useState(false);
  const [showEmojisForReply, setShowEmojisForReply] = useState(false);

  const handleShowEmojis = () => setShowEmojis(true);

  const setInputIndex = (e) => {
    setCursorIndex(e.target.selectionStart);
  }

  const setInputIndexReply = (e) => {
    setCursorIndexReply(e.target.selectionStart);
  }

  const handleSetCommentValue = (e) => {
    setCursorIndex(e.target.selectionStart);
    setNewComment(e.target.value)
    setCursorIndex(e.target.selectionStart);
  }

  const handleAddEmoji = (value) => {
    setNewComment(newComment.slice(0, cursorIndex) + value + newComment.slice(cursorIndex));
  };

  const handleAddEmojiReply = (value) => {
    setReply({
      ...reply,
      replyContent: reply.replyContent.slice(0, cursorIndexReply) + value + reply.replyContent.slice(cursorIndexReply)
    });
  };

  const handleSetReplyValue = (e) => {
    setCursorIndexReply(e.target.selectionStart);
    setReply({
      ...reply,
      replyContent: e.target.value
    })
    setCursorIndexReply(e.target.selectionStart);
  }


  return (
    <Overlay isShowing={showComments} currentTopPosition={currentTopPosition} height={'100vh'}> {/*TODO: change height value to something more dynamic */}
      <nav className={commentStyles.nav}>
        <MdOutlineArrowBackIosNew onClick={handleCloseComments} />
        <h3>Comments</h3>
        <FiSend />
      </nav>

      <section className={commentStyles.postDetails}>
        <div>
          <img src={postFromUser.avatar} alt={postFromUser.avatar} />
        </div>
        <div>
          <p><strong>{postFromUser.userName}</strong> {post.postDescription}</p>
          <p>{moment(post.createdAt).fromNow()}</p>
        </div>
      </section>

      <div className={commentStyles.commentContent}>
        {comments && comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <section className={commentStyles.postDetails}>
              <div>
                <img onClick={() => handleGoToProfile(comment)} src={comment.commentedBy.avatar ? comment.commentedBy.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'} alt={comment.commentedBy.avatar} />
              </div>
              <div>
                <p><strong onClick={() => handleGoToProfile(comment)}>{comment.commentedBy.userName}</strong> {comment.commentContent}</p>
                <p>{moment(comment.createdAt).fromNow()} <span onClick={() => handleInitReply(comment)}>Reply</span></p>
              </div>
              <div>
                <RiHeartLine />
              </div>
            </section>

            <RepliesToComment
              replies={comment.replies}
              replyTo={comment.commentedBy.userName} />
          </React.Fragment>
        ))}
      </div>

      <div className={commentStyles.navContainer}>
        {reply.replyingTo ? (
          <div className={commentStyles.replyPanel}>
            <p>Replying to {reply.replyingTo}</p>
            <span onClick={resetReply}>X</span>
          </div>
        ) : null}
        {showEmojis ? (
          <EmojiPicker
            handleAddValue={handleAddEmoji}
          />
        ) : null}
        {showEmojisForReply ? (
          <EmojiPicker
            handleAddValue={handleAddEmojiReply}
          />
        ) : null}

        <nav className={commentStyles.footerNav}>
          <img src={state && state.currentUser ? state.currentUser.avatar : null} alt={'https://media.wired.com/photos/5926dc8ecfe0d93c474319dd/master/pass/PikachuTA-EWEATA.jpg'} />
          {reply.replyingTo ? (
            <React.Fragment>
              <span ref={spanRef}>@{reply.replyingTo}</span>
              <input
                style={spanWidth ? { paddingLeft: spanWidth + 25 } : { paddingLeft: '1rem' }}
                ref={inputRef}
                onChange={(e) => handleSetReplyValue(e)}
                value={reply.replyContent}
                onBlur={setInputIndexReply}
              />

              <button onClick={submitReply} ref={btnRef}>Reply</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <input
                onChange={(e) => handleSetCommentValue(e)}
                value={newComment}
                onBlur={setInputIndex}
                onFocus={handleShowEmojis}
                placeholder={`Add a comment as ${state.currentUser.userName}`}
              />

              <button onClick={handleSubmitComment}>Post</button>
            </React.Fragment>
          )}
        </nav>
      </div>
    </Overlay>
  )
}

export default Comments