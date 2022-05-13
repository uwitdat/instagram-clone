import React from 'react';
import followingStyles from '../../styles/following.module.scss';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { UNFOLLOW_USER } from '../../utils/mutations';


const Following = ({ currentUser, setCurrentUser, following, switchFollowing, handleViewProfile }) => {

  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  const handleUnfollowUser = async (followingId) => {
    try {
      const { data } = await unfollowUser({
        variables: {
          userId: currentUser.id,
          userIdToUnfollow: followingId
        }
      })
      if (data) {
        setCurrentUser({
          ...currentUser,
          following: currentUser.following.filter((follow) => follow.id !== followingId)
        })
      }
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className={switchFollowing ? `${followingStyles.container} ${followingStyles.enterFollowing}` : followingStyles.container}>
      <h2>Sort By Default</h2>
      <section>
        {following.map((following) => (
          <div className={followingStyles.following} key={following.id}>
            <div>
              <img
                src={following.avatar ? following.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'} alt={following.userAvatar}
                onClick={() => handleViewProfile(following.id, following)} />
              <div onClick={() => handleViewProfile(following.id, following)}>
                <h3>{following.userName}</h3>
                <p>{following.name}</p>
              </div>
            </div>

            {following.id === currentUser.id ? (null) : (
              <div>
                <button onClick={() => handleUnfollowUser(following.id)}>Following</button>
                <AiOutlineEllipsis />
              </div>
            )}

          </div>
        ))}
      </section>
    </div>
  )
}

export default Following