import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'
import {SubmitButton} from '../../styledComponents'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showErrorMsg: false,
    errorMsg: '',
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  updateShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitForm = async event => {
    const {history} = this.props
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const fetchedDetails = await response.json()
    if (response.ok) {
      const jwtToken = fetchedDetails.jwt_token
      console.log(jwtToken)
      Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
      history.replace('/')
    } else {
      this.setState({showErrorMsg: true, errorMsg: fetchedDetails.error_msg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {
            username,
            password,
            showPassword,
            showErrorMsg,
            errorMsg,
          } = this.state
          const {isLight} = value
          const darkBgCls = !isLight ? 'login-dark-bg' : ''
          const loginFormDarkBg = !isLight ? 'lp-card-container-dark-bg' : ''
          const darkBgTextCls = !isLight ? 'login-dark-theme-text' : ''
          const websiteLogoUrl = isLight
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          return (
            <div className={`login-page-container ${darkBgCls}`}>
              <div className={`login-page-card-container ${loginFormDarkBg}`}>
                <form
                  onSubmit={this.onSubmitForm}
                  className="lp-form-container"
                >
                  <img
                    className="login-page-nxtwatch-logo"
                    alt="website logo"
                    src={websiteLogoUrl}
                  />
                  <div className="lp-input-container">
                    <label
                      htmlFor="username"
                      className={`lp-label-element ${darkBgTextCls}`}
                    >
                      USERNAME
                    </label>
                    <input
                      onChange={this.updateUsername}
                      value={username}
                      className="lp-input-element"
                      id="username"
                      placeholder="Username"
                      type="text"
                    />
                  </div>
                  <div className="lp-input-container">
                    <label
                      htmlFor="password"
                      className={`lp-label-element ${darkBgTextCls}`}
                    >
                      PASSWORD
                    </label>
                    {showPassword ? (
                      <input
                        onChange={this.updatePassword}
                        value={password}
                        className="lp-input-element"
                        id="password"
                        placeholder="Password"
                        type="text"
                      />
                    ) : (
                      <input
                        onChange={this.updatePassword}
                        value={password}
                        className="lp-input-element"
                        id="password"
                        placeholder="Password"
                        type="password"
                      />
                    )}
                  </div>
                  <div className="lp-checkbox-container">
                    <input
                      onChange={this.updateShowPassword}
                      value={showPassword}
                      id="show-pwd"
                      type="checkbox"
                    />
                    <label
                      className={`lp-show-pwd-element ${darkBgTextCls}`}
                      htmlFor="show-pwd"
                    >
                      Show Password
                    </label>
                  </div>
                  <SubmitButton type="submit">Login</SubmitButton>
                  {showErrorMsg && <p className="lp-error-msg">{errorMsg}</p>}
                </form>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Login
