import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoIosSearch} from 'react-icons/io'
import NxtWatchContext from '../../context/NxtWatchContext'
import HomePageOptions from '../HomePageOptions'
import NxtWatchAd from '../NxtWatchAd'
import HomeVideoItem from '../HomeVideoItem'

import {
  HomeContainer,
  FailureContainer,
  FailureImage,
  FailureHeading,
  FailureDescription,
  FailureRetryBtn,
} from '../../styledComponents'

import Header from '../Header'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    showAd: true,
    apiStatus: apiStatusList[0],
    homeVideosList: [],
    search: '',
  }

  componentDidMount = () => {
    this.getHomeVideosList()
  }

  getHomeVideosList = async () => {
    this.setState({apiStatus: apiStatusList.loading})
    const {search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(each => ({
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({
        apiStatus: apiStatusList.success,
        homeVideosList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  updateShowAd = () => {
    this.setState({showAd: false})
  }

  updateSearchValue = event => {
    this.setState({search: event.target.value})
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isLight, updateActiveOption} = value
          const {showAd, search} = this.state
          const homePageAllVideosDarkBg = !isLight
            ? 'home-all-videos-dark-bg'
            : ''
          const hpSearchIconDarkBg = !isLight ? 'hp-search-icon-dark-bg' : ''
          const hpSearchContDarkBg = !isLight
            ? 'hp-search-container-dark-bg'
            : ''
          const hpSearchEleDarkBg = !isLight ? 'hp-search-ele-dark-bg' : ''

          const renderLoadingView = () => (
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
            </div>
          )

          const clickSearchResultsRetryBtn = () => {
            this.setState(
              {apiStatus: apiStatusList.loading},
              this.getHomeVideosList,
            )
          }

          const onClickSearchIcon = () => {
            this.setState(
              {apiStatus: apiStatusList.loading},
              this.getHomeVideosList,
            )
          }

          const renderNoSearchResultsView = () => (
            <FailureContainer isLight={isLight}>
              <FailureImage
                alt="no videos"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              />
              <FailureHeading isLight={isLight}>
                No Search results found
              </FailureHeading>
              <FailureDescription>
                Try different key words or remove search filter
              </FailureDescription>
              <FailureRetryBtn
                onClick={clickSearchResultsRetryBtn}
                type="button"
              >
                Retry
              </FailureRetryBtn>
            </FailureContainer>
          )

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
                <FailureRetryBtn
                  onClick={clickSearchResultsRetryBtn}
                  type="button"
                >
                  Retry
                </FailureRetryBtn>
              </FailureContainer>
            )
          }

          const renderSuccessView = () => {
            const {homeVideosList} = this.state
            return (
              <ul className="hp-alll-videos-container">
                {homeVideosList.map(each => (
                  <HomeVideoItem
                    updateActiveOption={updateActiveOption}
                    isLight={isLight}
                    key={each.id}
                    videoDetails={each}
                  />
                ))}
              </ul>
            )
          }

          const renderHomeVideosList = () => {
            const {homeVideosList, apiStatus} = this.state
            switch (apiStatus) {
              case apiStatusList.loading:
                return renderLoadingView()
              case apiStatusList.success:
                if (homeVideosList.length === 0) {
                  return renderNoSearchResultsView()
                }
                return renderSuccessView()
              case apiStatusList.failure:
                return renderFailureView()
              default:
                return ''
            }
          }

          return (
            <HomeContainer isLight={isLight} data-testid="home">
              <Header />
              <div className="home-page-main-container">
                <div className="hp-options-container">
                  <HomePageOptions />
                </div>
                <div
                  className={`home-page-ad-videos-container ${homePageAllVideosDarkBg}`}
                >
                  {showAd && (
                    <NxtWatchAd
                      showAd={showAd}
                      updateShowAd={this.updateShowAd}
                    />
                  )}
                  <div
                    className={`hp-input-search-container ${hpSearchContDarkBg}`}
                  >
                    <input
                      onChange={this.updateSearchValue}
                      value={search}
                      placeholder="Search"
                      className={`hp-input-container ${hpSearchEleDarkBg}`}
                      type="search"
                    />
                    <div
                      className={`hp-search-container ${hpSearchIconDarkBg}`}
                    >
                      <button
                        data-testid="searchButton"
                        className="hppppp-search-btn"
                        type="button"
                        onClick={onClickSearchIcon}
                      >
                        <IoIosSearch className="hp-search-icon" />
                      </button>
                    </div>
                  </div>
                  {renderHomeVideosList()}
                </div>
              </div>
            </HomeContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
