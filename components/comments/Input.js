import React, { useEffect, useRef, useState } from 'react'
import { EmojiPicker } from '../EmojiPicker';
import commentStyles from '../../styles/comments.module.scss';

const Input = ({
  currentUser,
  resetValues,
  reply,
  setReply,
  newComment,
  setNewComment,
  showEmojis,
  showEmojisForReply,
  handleSubmitComment,
  submitReply,
  setShowEmojis,
  cursorIndex,
  setCursorIndex,
  cursorIndexReply,
  setCursorIndexReply
}) => {

  const inputRef = useRef(null);
  const spanRef = useRef(null);
  const btnRef = useRef(null);
  const [spanWidth, setSpanWidth] = useState(null);

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


  useEffect(() => {
    if (reply.replyingTo) {

      inputRef.current.focus();
      setSpanWidth(spanRef.current.getBoundingClientRect().width);
      setNewComment('');
      setShowEmojis(false);
      setCursorIndex('');
    }
  }, [reply])

  return (
    <div className={commentStyles.navContainer}>
      {reply.replyingTo ? (
        <div className={commentStyles.replyPanel}>
          <p>Replying to {reply.replyingTo}</p>
          <span onClick={resetValues}>X</span>
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
        <img src={currentUser.avatar ? currentUser.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'} alt={'###'} />
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
              placeholder={`Add a comment as ${currentUser.userName}`}
            />
            <button onClick={handleSubmitComment}>Post</button>
          </React.Fragment>
        )}
      </nav>
    </div>
  )
}

export default Input