import { connect } from "react-redux";
import COMPONENT from "../components/WithReduxPage";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

const WithREduxPage1 = connect(
  mapStateToProps(COMPONENT),
  mapDispatchToProps(COMPONENT)
)(COMPONENT);

export default WithREduxPage1;
