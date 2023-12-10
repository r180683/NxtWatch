import {IoIosClose} from 'react-icons/io'
import {NxtwatchAdContainer} from '../../styledComponents'
import './index.css'

const NxtWatchAd = props => {
  const {updateShowAd} = props

  const closeAd = () => {
    updateShowAd()
  }

  const adlogoUrl =
    'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  return (
    <NxtwatchAdContainer data-testid="banner">
      <div className="hp-ad-details-container">
        <img className="hp-ad-logo" alt="nxt watch logo" src={adlogoUrl} />
        <p className="hp-ad-logo-description">
          Buy Nxt Watch Premium prepaid plans with UPI
        </p>
        <button className="hp-ad-btn" type="button">
          GET IT NOW
        </button>
      </div>
      <button
        data-testid="close"
        className="hp-ad-close-btn"
        type="button"
        onClick={closeAd}
      >
        <IoIosClose className="hp-ad-close-icon" />
      </button>
    </NxtwatchAdContainer>
  )
}

export default NxtWatchAd
