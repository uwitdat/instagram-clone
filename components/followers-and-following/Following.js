import React from 'react';
import followingStyles from '../../styles/following.module.scss';
import { AiOutlineEllipsis } from 'react-icons/ai';

const followingDummy = [
  {
    userId: 1,
    userAvatar: 'https://chicagophotovideo.com/wp-content/uploads/2018/01/chicago-headshot-and-portrait-photographer.jpg',
    userName: 'Handsen_09',
    name: 'kyle hansen'
  },
  {
    userId: 2,
    userAvatar: 'https://media.wired.com/photos/5926dc8ecfe0d93c474319dd/master/pass/PikachuTA-EWEATA.jpg',
    userName: 'Ron Jon',
    name: 'alvin wilson'
  },
  {
    userId: 3,
    userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot',
    userName: 'Ron Jon the tst king',
    name: 'alvin wilson morrizon the iv'
  },
  {
    userId: 4,
    userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309',
    userName: 'Marly williams',
    name: 'mar_bar_'
  },

]

const Following = ({ switchFollowing, handleViewProfile }) => {


  return (
    <div className={switchFollowing ? `${followingStyles.container} ${followingStyles.enterFollowing}` : followingStyles.container}>
      <h2>Sort By Default</h2>
      <section>
        {followingDummy.map((follower) => (
          <div className={followingStyles.following} key={follower.userId}>
            <div>
              <img onClick={() => handleViewProfile(follower.userId)} src={follower.userAvatar} alt={follower.userAvatar} />
              <div onClick={() => handleViewProfile(follower.userId)}>
                <h3>{follower.userName}</h3>
                <p>{follower.name}</p>
              </div>
            </div>
            <div>
              <button>Following</button>
              <AiOutlineEllipsis />
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Following