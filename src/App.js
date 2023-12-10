import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import NxtWatchContext from './context/NxtWatchContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Gaming from './components/Gaming'
import Login from './components/Login'
import NotFound from './components/NotFound'
import SavedVideos from './components/SavedVideos'
import Trending from './components/Trending'
import VideoItemDetails from './components/VideoItemDetails'
import './App.css'

const optionDetails = [
  {id: 1, text: 'home'},
  {id: 2, text: 'trending'},
  {id: 3, text: 'gaming'},
  {id: 4, text: 'saved-videos'},
  {id: 5, text: 'none'},
]

// Replace your code here
class App extends Component {
  state = {
    isLight: true,
    activeOptionId: optionDetails[0].id,
    savedVideosList: [],
  }

  updateTheme = () => {
    this.setState(prevState => ({isLight: !prevState.isLight}))
  }

  updateActiveOption = id => {
    this.setState({activeOptionId: id})
  }

  updateSavedVideos = videoDetailsObj => {
    const {savedVideosList} = this.state
    const {id} = videoDetailsObj
    let flag = 0
    let updatedSavedVideos = savedVideosList.filter(each => {
      if (each.id === id) {
        flag = 1
        return false
      }
      return true
    })
    if (flag === 0) {
      updatedSavedVideos = [...updatedSavedVideos, videoDetailsObj]
    }
    console.log(updatedSavedVideos)
    this.setState({savedVideosList: updatedSavedVideos})
  }

  render() {
    const {isLight, activeOptionId, savedVideosList} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          isLight,
          updateTheme: this.updateTheme,
          activeOptionId,
          updateActiveOption: this.updateActiveOption,
          savedVideosList,
          updateSavedVideos: this.updateSavedVideos,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
