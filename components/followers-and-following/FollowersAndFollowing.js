import React, { useState } from 'react';
import Overlay from '../Overlay';
import Followers from './Followers';
import Following from './Following';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useRouter } from 'next/router'
import followerStyles from '../../styles/followers-and-following.module.scss';
import { useAppContext } from '../../context';


const FollowersAndFollowing = ({
  userName,
  followers,
  following,
  showFollowers,
  handleHideFollowers,
  entryPoint,
  setFollowersEntryPoint,
  refetchFollowing
}) => {


  const [switchFollowing, setSwitchFollowing] = useState(false)
  const [switchFollowers, setSwitchFollowers] = useState(false)

  const handleSwitchToFollowing = () => {
    setFollowersEntryPoint(1)
    setSwitchFollowing(true)
  }

  const handleSwitchToFollowers = () => {
    setFollowersEntryPoint(0)
    setSwitchFollowers(true)

  }

  const handleClosePanel = () => {
    handleHideFollowers()
    setSwitchFollowing(false)
    setSwitchFollowers(false)
  }

  const router = useRouter()
  const [state] = useAppContext()

  const handleViewProfile = (id, user) => {
    handleClosePanel()
    if (id === state.currentUser.id) {
      router.push('/profile')
    } else {
      router.push({
        pathname: `/profile/${id}`,
        query: { postFromUser: JSON.stringify(user) }
      })
    }
  }

  return (
    <Overlay isShowing={showFollowers} currentTopPosition={0} height={'94.3vh'}> {/*TODO: change height value to something more dynamic */}
      <nav className={followerStyles.nav}>
        <div>
          <MdOutlineArrowBackIosNew onClick={handleClosePanel} />
          <h2>{userName}</h2>
        </div>
        <nav>
          <div onClick={handleSwitchToFollowers} id={entryPoint === 0 ? followerStyles.navItemActive : null}>
            {followers && followers.length === 1 ? (
              <h3>{followers.length} Follower</h3>
            ) : (
              <h3>{followers.length} Followers</h3>
            )}

          </div>
          <div onClick={handleSwitchToFollowing} id={entryPoint === 1 ? followerStyles.navItemActive : null}>

            <h3>{following.length} Following</h3>

          </div>
        </nav>
      </nav>

      <div className={followerStyles.panelContainer}>
        {entryPoint === 0 ? (
          <React.Fragment>
            <Followers followers={followers} switchFollowers={switchFollowers} handleViewProfile={handleViewProfile} />
            <Following refetchFollowing={refetchFollowing} following={following} switchFollowing={switchFollowing} handleViewProfile={handleViewProfile} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Following refetchFollowing={refetchFollowing} following={following} switchFollowing={switchFollowing} handleViewProfile={handleViewProfile} />
            <Followers followers={followers} switchFollowers={switchFollowers} handleViewProfile={handleViewProfile} />
          </React.Fragment>
        )}

      </div>
    </Overlay>
  )
}



export default FollowersAndFollowing