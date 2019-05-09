export const story = state => state.story || JSON.parse(localStorage.getItem('story'))
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
  if (state.currentIndex < 0) {
    return ''
  } else {
    return state.playList.episodeUrl[state.currentIndex]
  }
}
