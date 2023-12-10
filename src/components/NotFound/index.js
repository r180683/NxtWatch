import {Component} from 'react'
import NxtWatchContext from '../../context/NxtWatchContext'
import HomePageOptions from '../HomePageOptions'
import Header from '../Header'
import {
  HomeContainer,
  FailureHeading,
  FailureDescription,
} from '../../styledComponents'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isLight} = value
          const notFoundUrl = isLight
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
          return (
            <HomeContainer isLight={isLight}>
              <Header />
              <div className="nf-page-main-container">
                <div className="nf-options-container">
                  <HomePageOptions />
                </div>
                <div className="not-found-main-container">
                  <img className="nf-image" alt="not found" src={notFoundUrl} />
                  <FailureHeading isLight={isLight}>
                    Page Not Found
                  </FailureHeading>
                  <FailureDescription isLight={isLight}>
                    we are sorry, the page you requested could not be found.
                  </FailureDescription>
                </div>
              </div>
            </HomeContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default NotFound
