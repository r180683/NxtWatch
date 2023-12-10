import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import NxtWatchContext from '../../context/NxtWatchContext'
import HomePageOptions from '../HomePageOptions'
import GamingVideoItem from '../GamingVideoItem'
import Header from '../Header'
import {
  SavedContainer,
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

class Gaming extends Component {
  state = {apiStatus: apiStatusList.initial, gamingVideosList: []}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusList.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      this.setState({
        apiStatus: apiStatusList.success,
        gamingVideosList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isLight, updateActiveOption} = value

          const {gamingVideosList} = this.state

          const renderLoadingView = () => (
            <div className="gp-loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
            </div>
          )

          const onClickSearchIcon = () => {
            this.setState(
              {apiStatus: apiStatusList.loading},
              this.getGamingVideos,
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
                  We are having some trouble to complete your request.
                </FailureDescription>
                <FailureDescription>Please try again.</FailureDescription>
                <FailureRetryBtn onClick={onClickSearchIcon} type="button">
                  Retry
                </FailureRetryBtn>
              </FailureContainer>
            )
          }

          const renderSuccessView = () => {
            const gamingHeadDark = !isLight ? 'gp-gaming-head-dark' : ''
            const gamingIconBtnDarkBg = !isLight
              ? 'gp-gaming-icon-dark-btn'
              : ''
            const gameHeadingDarkContainerBg = !isLight
              ? 'gp-gaming-icon-head-container-dark-bg'
              : ''
            return (
              <div className="gp-sucess-containerr">
                <div
                  className={`gp-gaming-icon-head-container ${gameHeadingDarkContainerBg}`}
                >
                  <button
                    className={`gp-gaming-icon-btn ${gamingIconBtnDarkBg}`}
                    type="button"
                  >
                    <SiYoutubegaming className="gp-gaming-icon" />
                  </button>
                  <h1 className={`gp-gaming-head ${gamingHeadDark}`}>Gaming</h1>
                </div>
                <ul className="gp-videoss-container">
                  {gamingVideosList.map(each => (
                    <GamingVideoItem
                      updateActiveOption={updateActiveOption}
                      isLight={isLight}
                      key={each.id}
                      videoDetails={each}
                    />
                  ))}
                </ul>
              </div>
            )
          }

          const renderGamingPageVideos = () => {
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
            <SavedContainer isLight={isLight} data-testid="gaming">
              <Header />
              <div className="gaming-page-main-container">
                <div className="gaming-options-container">
                  <HomePageOptions />
                </div>
                <div className="gp-main-container">
                  {renderGamingPageVideos()}
                </div>
              </div>
            </SavedContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Gaming
