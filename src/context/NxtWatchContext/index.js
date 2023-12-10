import React from 'react'

const NxtWatchContext = React.createContext({
  isLight: true,
  updateTheme: () => {},
  activeOptionId: 1,
  updateActiveOption: () => {},
  savedVideosList: [],
  updateSavedVideos: () => {},
})

export default NxtWatchContext
