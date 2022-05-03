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
                <img src={reply.user.avatar} alt='user' />
              </div>
              <div>
                <h4><strong>{reply.user.userName}</strong> <span>@{replyTo}</span> {reply.replyContent}</h4>
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