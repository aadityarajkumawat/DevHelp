import React, { useEffect } from "react";
import { connect } from "react-redux";
import { removeNav } from "../../actions/navAction";
import { clearPost } from "../../actions/getPostAction";
import DashboardSideBar from "./DashboardSideBar";
import DashboardHome from "./DashboardHome";
import { Flex } from "@chakra-ui/react";

const Dashboard = ({ removeNav, clearPost, history }) => {
  useEffect(() => {
    removeNav();
    clearPost();

    // eslint-disable-next-line
  }, []);

  return (
    <Flex>
      <DashboardHome routing={history} />
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    post: state.post,
  };
};

export default connect(mapStateToProps, {
  removeNav,
  clearPost,
})(Dashboard);
