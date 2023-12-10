import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaFire} from 'react-icons/fa'
import NxtWatchContext from '../../context/NxtWatchContext'
import HomePageOptions from '../HomePageOptions'
import TrendingVideoItem from '../TrendingVideoItem'
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

class Trending extends Component {
  state = {apiStatus: apiStatusList.initial, trendingVideosList: []}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusList.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        publishedAt: each.published_at,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
      }))
      this.setState({
        apiStatus: apiStatusList.success,
        trendingVideosList: updatedData,
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
          const {trendingVideosList} = this.state

          const renderLoadingView = () => (
            <div className="tr-loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
            </div>
          )

          const onClickSearchIcon = () => {
            this.setState(
              {apiStatus: apiStatusList.loading},
              this.getTrendingVideos,
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
            const trendingHeadDark = !isLight ? 'trp-gaming-head-dark' : ''
            const trendingIconBtnDarkBg = !isLight
              ? 'trp-gaming-icon-dark-btn'
              : ''
            const trendingHeadingDarkContainerBg = !isLight
              ? 'trp-gaming-icon-head-container-dark-bg'
              : ''
            return (
              <div className="trp-sucess-containerr">
                <div
                  className={`trp-gaming-icon-head-container ${trendingHeadingDarkContainerBg}`}
                >
                  <button
                    className={`trp-gaming-icon-btn ${trendingIconBtnDarkBg}`}
                    type="button"
                  >
                    <FaFire className="trp-gaming-icon" />
                  </button>
                  <h1 className={`trp-gaming-head ${trendingHeadDark}`}>
                    Trending
                  </h1>
                </div>
                <ul className="trp-videoss-container">
                  {trendingVideosList.map(each => (
                    <TrendingVideoItem
                      isLight={isLight}
                      key={each.id}
                      videoDetails={each}
                      updateActiveOption={updateActiveOption}
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
            <SavedContainer isLight={isLight} data-testid="trending">
              <Header />
              <div className="tr-page-main-container">
                <div className="tr-options-container">
                  <HomePageOptions />
                </div>
                <div className="tr-main-container">
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

export default Trending
