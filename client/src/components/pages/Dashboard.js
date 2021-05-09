import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { clearPost } from "../../actions/getPostAction";
import { removeNav } from "../../actions/navAction";
import DashboardHome from "./DashboardHome";

const Dashboard = ({ removeNav, clearPost, history }) => {
  useEffect(() => {
    removeNav();
    clearPost();

    // eslint-disable-next-line
  }, []);

  const match = useRouteMatch();

  return (
    <Flex>
      <DashboardHome routing={history} user={match} />
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
