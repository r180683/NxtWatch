import {Component} from 'react'
import {MdPlaylistAdd} from 'react-icons/md'
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
} from '../../styledComponents'
import './index.css'

class SavedVideos extends Component {
  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isLight, updateActiveOption, savedVideosList} = value
          console.log('save')
          console.log(savedVideosList)

          const renderNoSavedVideos = () => (
            <FailureContainer isLight={isLight}>
              <FailureImage
                alt="no saved videos"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              />
              <FailureHeading isLight={isLight}>
                No saved videos found
              </FailureHeading>
              <FailureDescription>
                You can save your videos while watching them
              </FailureDescription>
            </FailureContainer>
          )

          const renderSuccessView = () => {
            console.log(savedVideosList)
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
                    <MdPlaylistAdd className="trp-gaming-icon" />
                  </button>
                  <h1 className={`trp-gaming-head ${trendingHeadDark}`}>
                    Saved Videos
                  </h1>
                </div>
                <ul className="trp-videoss-container">
                  {savedVideosList.map(each => (
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

          const renderSavedPageVideos = () => {
            console.log(savedVideosList)
            if (savedVideosList.length === 0) {
              return renderNoSavedVideos()
            }
            return renderSuccessView()
          }

          return (
            <SavedContainer isLight={isLight} data-testid="savedVideos">
              <Header />
              <div className="tr-page-main-container">
                <div className="tr-options-container">
                  <HomePageOptions />
                </div>
                <div className="tr-main-container">
                  {renderSavedPageVideos()}
                </div>
              </div>
            </SavedContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default SavedVideos
