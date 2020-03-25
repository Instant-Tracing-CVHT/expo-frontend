import { human, systemWeights } from 'react-native-typography'

export default {
  colors: {
    black: "#000",
    grey: "#777",
    purple: "#5D66D3",
    green: "#69B549",
    yellow: "#E5AE1E",
    red: "#EF8368",
    divider: "#0000001a"
  },
  typography: {
    h1: {
      ...human.largeTitle,
      ...systemWeights.semibold,
      fontSize: 30,
      lineHeight: 34,
    }
  },
  spacing: 8,
  gutters: 24,
  actionHeight: 44,
};