import React, { useState } from 'react';
import Overlay from '../Overlay';
import Followers from './Followers';
import Following from './Following';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useRouter } from 'next/router'
import followerStyles from '../../styles/followers-and-following.module.scss';


const FollowersAndFollowing = ({ showFollowers, handleHideFollowers, entryPoint, setFollowersEntryPoint }) => {


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

  const handleViewProfile = (id) => {
    handleClosePanel()
    router.push({
      pathname: '/profile',
      query: { user: id }
    })
  }

  return (
    <Overlay isShowing={showFollowers} currentTopPosition={0} height={'93.5vh'}> {/*TODO: change height value to something more dynamic */}
      <nav className={followerStyles.nav}>
        <div>
          <MdOutlineArrowBackIosNew onClick={handleClosePanel} />
          <h2>some_user</h2>
        </div>
        <nav>
          <div onClick={handleSwitchToFollowers} id={entryPoint === 0 ? followerStyles.navItemActive : null}>
            <h3>1,000 Followers</h3>
          </div>
          <div onClick={handleSwitchToFollowing} id={entryPoint === 1 ? followerStyles.navItemActive : null}>
            <h3>450 Following</h3>
          </div>
        </nav>
      </nav>

      <div className={followerStyles.panelContainer}>
        {entryPoint === 0 ? (
          <React.Fragment>
            <Followers switchFollowers={switchFollowers} handleViewProfile={handleViewProfile} />
            <Following switchFollowing={switchFollowing} handleViewProfile={handleViewProfile} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Following switchFollowing={switchFollowing} handleViewProfile={handleViewProfile} />
            <Followers switchFollowers={switchFollowers} handleViewProfile={handleViewProfile} />
          </React.Fragment>
        )}

      </div>
    </Overlay>
  )
}



export default FollowersAndFollowing