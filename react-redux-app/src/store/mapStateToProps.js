import COMPONENT from '../components/WithReduxPage'

function mapStateToProps (component) {
    if (COMPONENT) {
        return function (state) {
            return {
                value: state
            }
        }
    } else {
        return undefined
    }
}

export default mapStateToProps