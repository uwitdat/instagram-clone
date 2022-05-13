import React, { useState } from 'react'
import commentReplyStyles from '../../styles/replies-to-comment.module.scss';
import moment from 'moment';

const RepliesToComment = ({ replies, replyTo }) => {

  const [showReplies, setShowReplies] = useState(false)

  return (
    <React.Fragment>
      {replies.length > 0 ? (
        replies.length === 1 ? (
          <p className={commentReplyStyles.showReplies}
            onClick={() => setShowReplies(!showReplies)}>
            – View {replies.length}
            {' '}
            Reply
          </p>
        ) : (
          <p className={commentReplyStyles.showReplies}
            onClick={() => setShowReplies(!showReplies)}>
            – View {replies.length}
            {' '}
            Replies
          </p>
        )
      ) : null}
      {showReplies ? (
        <section className={commentReplyStyles.container}>
          {replies.map((reply) => (
            <div key={reply.id} className={commentReplyStyles.reply}>
              <div>
                <img src={reply.repliedBy.avatar ? reply.repliedBy.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'} alt='user' />
              </div>
              <div>
                <h4><strong>{reply.repliedBy.userName}</strong> <span>@{replyTo}</span> {reply.replyContent}</h4>
                <p>{moment(reply.createdAt).fromNow()}</p>
              </div>
            </div>
          ))}
        </section>
      ) : null}

    </React.Fragment>
  )
}

export default RepliesToComment;