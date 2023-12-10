import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  HeaderIconNameContainer,
  HeaderOptionIcon,
  HeaderOptionName,
  HeaderReachoutHead,
  HeaderReachoutDescription,
} from '../../styledComponents'

import './index.css'

const optionDetails = [
  {id: 1, text: 'home'},
  {id: 2, text: 'trending'},
  {id: 3, text: 'gaming'},
  {id: 4, text: 'saved-videos'},
  {id: 5, text: 'none'},
]

class HomePageOptions extends Component {
  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isLight, activeOptionId, updateActiveOption} = value

          const activeHomeOption = () => {
            updateActiveOption(optionDetails[0].id)
          }

          const activeTrendingOption = () => {
            updateActiveOption(optionDetails[1].id)
          }

          const activeGamingOption = () => {
            updateActiveOption(optionDetails[2].id)
          }

          const activeSavedOption = () => {
            updateActiveOption(optionDetails[3].id)
          }

          const hppOptionsDarkBgg = !isLight ? 'hpp-optionss-dark-bgg' : ''

          return (
            <div className={`hpp-options-container ${hppOptionsDarkBgg}`}>
              <ul className="hpp-options-list-container">
                <Link className="hpp-option-link-container" to="/">
                  <HeaderIconNameContainer
                    activeOption={activeOptionId === optionDetails[0].id}
                    isLight={isLight}
                    onClick={activeHomeOption}
                  >
                    <HeaderOptionIcon
                      activeOption={activeOptionId === optionDetails[0].id}
                    >
                      <IoMdHome className="hpp-option-icon" />
                    </HeaderOptionIcon>
                    <HeaderOptionName
                      activeOption={activeOptionId === optionDetails[0].id}
                      isLight={isLight}
                    >
                      Home
                    </HeaderOptionName>
                  </HeaderIconNameContainer>
                </Link>
                <Link className="hpp-option-link-container" to="/trending">
                  <HeaderIconNameContainer
                    activeOption={activeOptionId === optionDetails[1].id}
                    isLight={isLight}
                    onClick={activeTrendingOption}
                  >
                    <HeaderOptionIcon
                      activeOption={activeOptionId === optionDetails[1].id}
                    >
                      <FaFire className="hpp-option-icon" />
                    </HeaderOptionIcon>

                    <HeaderOptionName
                      activeOption={activeOptionId === optionDetails[1].id}
                      isLight={isLight}
                    >
                      Trending
                    </HeaderOptionName>
                  </HeaderIconNameContainer>
                </Link>
                <Link className="hpp-option-link-container" to="/gaming">
                  <HeaderIconNameContainer
                    activeOption={activeOptionId === optionDetails[2].id}
                    isLight={isLight}
                    onClick={activeGamingOption}
                  >
                    <HeaderOptionIcon
                      activeOption={activeOptionId === optionDetails[2].id}
                    >
                      <SiYoutubegaming className="hpp-option-icon" />
                    </HeaderOptionIcon>
                    <HeaderOptionName
                      activeOption={activeOptionId === optionDetails[2].id}
                      isLight={isLight}
                    >
                      Gaming
                    </HeaderOptionName>
                  </HeaderIconNameContainer>
                </Link>
                <Link className="hpp-option-link-container" to="/saved-videos">
                  <HeaderIconNameContainer
                    activeOption={activeOptionId === optionDetails[3].id}
                    isLight={isLight}
                    onClick={activeSavedOption}
                  >
                    <HeaderOptionIcon
                      activeOption={activeOptionId === optionDetails[3].id}
                    >
                      <MdPlaylistAdd className="hpp-option-icon" />
                    </HeaderOptionIcon>
                    <HeaderOptionName
                      activeOption={activeOptionId === optionDetails[3].id}
                      isLight={isLight}
                    >
                      Saved Videos
                    </HeaderOptionName>
                  </HeaderIconNameContainer>
                </Link>
              </ul>
              <div className="hpp-reachout-container">
                <HeaderReachoutHead isLight={isLight}>
                  CONTACT US
                </HeaderReachoutHead>
                <ul className="hpp-reachout-icons-container">
                  <img
                    className="header-reachout-logo"
                    alt="facebook logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  />
                  <img
                    className="header-reachout-logo"
                    alt="twitter logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  />
                  <img
                    className="header-reachout-logo"
                    alt="linked in logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  />
                </ul>
                <HeaderReachoutDescription isLight={isLight}>
                  Enjoy! Now to see your channels and recommendations!
                </HeaderReachoutDescription>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default HomePageOptions
