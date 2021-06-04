import Enzyme from 'enzyme'
import UnofficialSeventeenAdapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new UnofficialSeventeenAdapter() })

// mocking TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require('util')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
