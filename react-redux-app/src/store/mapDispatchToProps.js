import { bindActionCreators } from "redux";
import { loading } from "./actions";
import COMPONENT from "../components/WithReduxPage";

function mapDispatchToProps(component) {
  if (COMPONENT) {
    return function (dispatch) {
      return {
        loading: bindActionCreators(loading, dispatch),
      };
    };
  }
}

export default mapDispatchToProps;
