import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const optionDetails = [
  {id: 1, text: 'home'},
  {id: 2, text: 'trending'},
  {id: 3, text: 'gaming'},
  {id: 4, text: 'saved-videos'},
  {id: 5, text: 'none'},
]

const HomeVideoItem = props => {
  const {videoDetails, isLight, updateActiveOption} = props
  const {
    id,
    title,
    publishedAt,
    thumbnailUrl,
    channel,
    viewCount,
  } = videoDetails
  const {name, profileImageUrl} = channel
  const HomePageDarkVideoHeading = !isLight ? 'hp-video-head-dark' : ''
  const HomePageDarkVideoDescription = !isLight
    ? 'hp-video-description-dark'
    : ''

  const onClickVideoItemDetails = () => {
    updateActiveOption(optionDetails[4].id)
  }

  return (
    <Link
      onClick={onClickVideoItemDetails}
      className="hp-video-link-container"
      to={`/videos/${id}`}
    >
      <li className="hp-each-video-container">
        <img
          className="hp-each-video-thumbnail"
          alt="video thumbnail"
          src={thumbnailUrl}
        />
        <div className="hp-video-profile-description-container">
          <img
            className="hp-profile-image"
            alt="channel logo"
            src={profileImageUrl}
          />
          <div className="hp-profile-description-container">
            <p className={`hp-video-profile-title ${HomePageDarkVideoHeading}`}>
              {title}
            </p>
            <p
              className={`hp-video-profile-name ${HomePageDarkVideoDescription}`}
            >
              {name}
            </p>
            <div className="hp-video-views-container">
              <p
                className={`hp-video-profile-views ${HomePageDarkVideoDescription}`}
              >{`${viewCount} views`}</p>
              <BsDot
                className={`hp-video-dot ${HomePageDarkVideoDescription}`}
              />
              <p
                className={`hp-video-profile-views ${HomePageDarkVideoDescription}`}
              >
                {formatDistanceToNow(new Date(publishedAt))}
              </p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default HomeVideoItem
