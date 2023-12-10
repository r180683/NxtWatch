import {Link} from 'react-router-dom'
import './index.css'

const optionDetails = [
  {id: 1, text: 'home'},
  {id: 2, text: 'trending'},
  {id: 3, text: 'gaming'},
  {id: 4, text: 'saved-videos'},
  {id: 5, text: 'none'},
]

const GamingVideoItem = props => {
  const {videoDetails, isLight, updateActiveOption} = props
  const {id, title, viewCount, thumbnailUrl} = videoDetails

  const onClickVideoItem = () => {
    updateActiveOption(optionDetails[4].id)
  }

  const videoTitleColor = !isLight ? 'gp-video-title-dark' : ''
  return (
    <Link
      onClick={onClickVideoItem}
      className="gp-vd-link-container"
      to={`/videos/${id}`}
    >
      <li className="gp-vd-li-container">
        <img className="gp-video" alt="video thumbnail" src={thumbnailUrl} />
        <p className={`gp-video-titlee ${videoTitleColor}`}>{title}</p>
        <div className="gp-video-view-countt-container">
          <p className="gp-video-description">{`${viewCount} Watching `}</p>
          <p className="gp-video-description">Worldwide</p>
        </div>
      </li>
    </Link>
  )
}

export default GamingVideoItem
