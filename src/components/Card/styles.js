import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const gutter = 0.05 * width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: gutter,
    alignItems: 'stretch',
    position: 'relative',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  image: {
    width: 0,
    height: 0,
    borderRadius: 8,
  },

  imageStub: {
    // flex: 1,
    // width: null,
    // height: null,
    borderRadius: 8,
    position: 'absolute',
    top: -10000,
    left: 0,
  },
})

export default styles
