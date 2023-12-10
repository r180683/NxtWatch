import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {IoIosClose} from 'react-icons/io'
import 'reactjs-popup/dist/index.css'
import {BsSun} from 'react-icons/bs'
import {FaMoon} from 'react-icons/fa'
import {AiOutlineMenu} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import NxtWatchContext from '../../context/NxtWatchContext'
import HomePageOptions from '../HomePageOptions'
import {
  PopupBoxHead,
  PopupBoxBtnsContainer,
  PopupBoxCancelButton,
  PopupMenuCancelButton,
  PopupBoxConfirmButton,
} from '../../styledComponents'
import './index.css'

const Header = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isLight, updateTheme, updateActiveOption} = value
      const websiteUrl = isLight
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      const headerContCls = !isLight ? 'header-container-dark-bg' : ''
      const logoutCls = !isLight ? 'logout-bnt-white-color' : ''
      const menuWhiteCls = !isLight ? 'header-icon-white-color' : ''

      const popUpBoxDarkBg = !isLight ? 'popup-content-dark-bg' : ''
      const popUpMenuDrakBg = !isLight ? 'pop-up-menu-dark-bg' : ''

      const changeTheme = () => {
        updateTheme()
      }

      const clickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      const activeHomePage = () => {
        updateActiveOption(1)
      }

      return (
        <div className={`header-container ${headerContCls}`}>
          <Link to="/">
            <img
              className="header-website-logo"
              alt="website logo"
              src={websiteUrl}
              onClick={activeHomePage}
            />
          </Link>
          <ul className="header-items-container">
            <li className="header-item-container">
              <button
                onClick={changeTheme}
                className="header-item-btn-container"
                type="button"
                data-testid="theme"
              >
                {isLight ? (
                  <FaMoon className="header-icon" />
                ) : (
                  <BsSun className="header-icon header-icon-white-color" />
                )}
              </button>
            </li>
            <li className="header-item-container">
              <Popup
                className="popup-content"
                modal
                trigger={
                  <button className="pop-up-menu-btn" type="button">
                    <AiOutlineMenu
                      className={`header-menu-desktop header-icon ${menuWhiteCls}`}
                    />
                  </button>
                }
              >
                {close => (
                  <div
                    className={`pop-up-drop-down-menu-container ${popUpMenuDrakBg}`}
                  >
                    <PopupMenuCancelButton
                      isLight={isLight}
                      type="button"
                      className="trigger-button"
                      onClick={() => close()}
                    >
                      <IoIosClose className="pop-up-box-menu-cancel-icon" />
                    </PopupMenuCancelButton>
                    <HomePageOptions />
                  </div>
                )}
              </Popup>

              <img
                className="header-item-profile"
                alt="profile"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              />
            </li>

            <Popup
              modal
              className={`popup-content ${popUpBoxDarkBg}`}
              trigger={
                <li className="header-item-container">
                  <FiLogOut
                    className={`header-menu-desktop header-icon ${menuWhiteCls}`}
                  />
                  <button
                    className={`header-logout-btn ${logoutCls}`}
                    type="button"
                  >
                    Logout
                  </button>
                </li>
              }
            >
              {close => (
                <div className="pop-up-logout-cont">
                  <PopupBoxHead isLight={isLight}>
                    Are you sure, you want to logout
                  </PopupBoxHead>
                  <PopupBoxBtnsContainer>
                    <PopupBoxCancelButton
                      isLight={isLight}
                      type="button"
                      className="trigger-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </PopupBoxCancelButton>
                    <PopupBoxConfirmButton
                      onClick={clickLogout}
                      type="button"
                      className="trigger-button"
                    >
                      Confirm
                    </PopupBoxConfirmButton>
                  </PopupBoxBtnsContainer>
                </div>
              )}
            </Popup>
          </ul>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default withRouter(Header)
