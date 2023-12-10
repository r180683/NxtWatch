import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import './index.css'

const optionDetails = [
  {id: 1, text: 'home'},
  {id: 2, text: 'trending'},
  {id: 3, text: 'gaming'},
  {id: 4, text: 'saved-videos'},
  {id: 5, text: 'none'},
]

const TrendingVideoItem = props => {
  const {videoDetails, isLight, updateActiveOption} = props
  const {
    id,
    title,
    viewCount,
    thumbnailUrl,
    publishedAt,
    channel,
  } = videoDetails
  const {name, profileImageUrl} = channel

  const onClickVideoItem = () => {
    updateActiveOption(optionDetails[4].id)
  }

  const trpViewsDark = !isLight ? 'trp-views-dark' : ''

  return (
    <Link
      onClick={onClickVideoItem}
      className="trp-video-item-container"
      to={`/videos/${id}`}
    >
      <li className="trp-video-item-li-container">
        <img
          className="trp-video-item-image"
          alt="video thumbnail"
          src={thumbnailUrl}
        />
        <div className="trp-video-detailss-container">
          <p className={`trp-video-item-headingg ${trpViewsDark}`}>{title}</p>
          <p className="trp-video-item-channel-name">{name}</p>
          <div className="trp-video-views-container">
            <p className="trp-video-item-views">{`${viewCount} views`}</p>
            <BsDot className="trp-video-dot" />
            <p className="trp-video-item-views">
              {formatDistanceToNow(new Date(publishedAt))}
            </p>
          </div>
        </div>
        <div className="trp-mobile-view-video-details-container">
          <img
            className="trp-mobile-view-profile-image"
            alt="profile"
            src={profileImageUrl}
          />
          <div>
            <p className={`trp-video-item-headingg ${trpViewsDark}`}>{title}</p>
            <div className="trp-mobile-view-view-container">
              <p className="trp-video-item-views">{name}</p>
              <BsDot className="trp-video-dot" />
              <p className="trp-video-item-views">{`${viewCount} views`}</p>
              <BsDot className="trp-video-dot" />
              <p className="trp-video-item-views">
                {formatDistanceToNow(new Date(publishedAt))}
              </p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendingVideoItem
