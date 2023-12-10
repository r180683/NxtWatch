import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import {BsDot} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import {MdThumbUp, MdPlaylistAdd, MdPlaylistAddCheck} from 'react-icons/md'
import {GoThumbsup} from 'react-icons/go'
import {HiOutlineThumbDown, HiThumbDown} from 'react-icons/hi'
import NxtWatchContext from '../../context/NxtWatchContext'
import HomePageOptions from '../HomePageOptions'
import Header from '../Header'
import {
  SavedContainer,
  VidCustomButton,
  FailureContainer,
  FailureImage,
  FailureHeading,
  FailureDescription,
  FailureRetryBtn,
} from '../../styledComponents'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusList.initial,
    videoDetails: {},
    isLike: false,
    isDislike: false,
  }

  componentDidMount = () => {
    this.getVideoDetailsList()
  }

  getVideoDetailsList = async () => {
    this.setState({apiStatus: apiStatusList.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.video_details.id,
        title: fetchedData.video_details.title,
        videoUrl: fetchedData.video_details.video_url,
        thumbnailUrl: fetchedData.video_details.thumbnail_url,
        viewCount: fetchedData.video_details.view_count,
        publishedAt: fetchedData.video_details.published_at,
        description: fetchedData.video_details.description,
        channel: {
          name: fetchedData.video_details.channel.name,
          profileImageUrl: fetchedData.video_details.channel.profile_image_url,
          subscriberCount: fetchedData.video_details.channel.subscriber_count,
        },
      }
      this.setState({
        apiStatus: apiStatusList.success,
        videoDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isLight, updateSavedVideos, savedVideosList} = value

          const renderLoadingView = () => (
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
            </div>
          )

          const clickSearchResultsRetryBtn = () => {
            this.setState(
              {apiStatus: apiStatusList.loading},
              this.getVideoDetailsList,
            )
          }

          const renderFailureView = () => {
            const failureUrl = isLight
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            return (
              <FailureContainer isLight={isLight}>
                <FailureImage alt="failure view" src={failureUrl} />
                <FailureHeading isLight={isLight}>
                  Oops! Something Went Wrong
                </FailureHeading>
                <FailureDescription>
                  We are having some trouble to complete your request. Please
                  try again.
                </FailureDescription>
                <FailureRetryBtn
                  onClick={clickSearchResultsRetryBtn}
                  type="button"
                >
                  Retry
                </FailureRetryBtn>
              </FailureContainer>
            )
          }

          const updateVideoLike = () => {
            this.setState(prevState => ({
              isLike: !prevState.isLike,
              isDislike: false,
            }))
          }

          const updateVideoDislike = () => {
            this.setState(prevState => ({
              isDislike: !prevState.isDislike,
              isLike: false,
            }))
          }

          const updateVideoSave = () => {
            const {videoDetails} = this.state
            updateSavedVideos(videoDetails)
          }

          const renderSuccessView = () => {
            const {videoDetails, isLike, isDislike} = this.state
            const {
              id,
              videoUrl,
              title,
              channel,
              viewCount,
              publishedAt,
              description,
            } = videoDetails
            const isSavedVideo = savedVideosList.find(each => each.id === id)
            const {name, profileImageUrl, subscriberCount} = channel
            const vidTitleDark = !isLight ? 'vid-title-dark' : ''
            return (
              <div className="vid-containerr">
                <div className="video-items-details-video-container">
                  <ReactPlayer
                    className="video-items-details-video"
                    url={videoUrl}
                    width="100%"
                  />
                </div>
                <div className="vid-video-full-details-container">
                  <p className={`vid-title ${vidTitleDark}`}>{title}</p>
                  <div className="vidd-options-container">
                    <div className="vid-options-views-container">
                      <p className="vid-options-view-head">{`${viewCount} views`}</p>
                      <BsDot className="vid-options-dot-icon" />
                      <p className="vid-options-view-head">
                        {formatDistanceToNow(new Date(publishedAt))}
                      </p>
                    </div>
                    <div className="vid-like-save-container">
                      <div className="vid-likes-container">
                        <VidCustomButton
                          type="button"
                          active={isLike}
                          onClick={updateVideoLike}
                        >
                          {isLike ? (
                            <MdThumbUp className="vid-like-icon" />
                          ) : (
                            <GoThumbsup className="vid-like-icon" />
                          )}
                          Like
                        </VidCustomButton>
                      </div>
                      <div className="vid-likes-container">
                        <VidCustomButton
                          type="button"
                          active={isDislike}
                          onClick={updateVideoDislike}
                        >
                          {isDislike ? (
                            <HiThumbDown className="vid-like-icon" />
                          ) : (
                            <HiOutlineThumbDown className="vid-like-icon" />
                          )}
                          Dislike
                        </VidCustomButton>
                      </div>
                      <div className="vid-likes-container">
                        <VidCustomButton
                          type="button"
                          active={isSavedVideo}
                          onClick={updateVideoSave}
                        >
                          {isSavedVideo ? (
                            <MdPlaylistAddCheck className="vid-like-icon" />
                          ) : (
                            <MdPlaylistAdd className="vid-like-icon" />
                          )}

                          {isSavedVideo ? 'Saved' : 'Save'}
                        </VidCustomButton>
                      </div>
                    </div>
                  </div>
                  <hr className="vid-hr-line" />
                  <div className="vid-channel-subs-container">
                    <img
                      alt="channel logo"
                      className="vid-profile-img"
                      src={profileImageUrl}
                    />
                    <div className="vid-channel-description-container">
                      <p className={`vid-channel-namee ${vidTitleDark}`}>
                        {name}
                      </p>
                      <p className="vid-channel-subs">{`${subscriberCount} subscribers`}</p>
                      <p className={`vid-channel-descriptionn ${vidTitleDark}`}>
                        {description}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`vid-mobile-channel-descriptionn ${vidTitleDark}`}
                  >
                    {description}
                  </p>
                </div>
              </div>
            )
          }

          const renderVideoItemDetails = () => {
            const {apiStatus} = this.state
            switch (apiStatus) {
              case apiStatusList.loading:
                return renderLoadingView()
              case apiStatusList.success:
                return renderSuccessView()
              case apiStatusList.failure:
                return renderFailureView()
              default:
                return ''
            }
          }

          return (
            <SavedContainer isLight={isLight} data-testid="videoItemDetails">
              <Header />
              <div className="vid-page-main-container">
                <div className="vid-options-container">
                  <HomePageOptions />
                </div>
                {renderVideoItemDetails()}
              </div>
            </SavedContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default withRouter(VideoItemDetails)
