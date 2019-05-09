import {playMode} from './config'

const state = {
  story: JSON.parse(localStorage.getItem('story')) || {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}

export default state
