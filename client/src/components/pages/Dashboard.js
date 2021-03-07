import React, { useEffect } from "react";
import { connect } from "react-redux";
import { removeNav } from "../../actions/navAction";
import { clearPost } from "../../actions/getPostAction";
import DashboardHome from "./DashboardHome";
import { Flex } from "@chakra-ui/react";
import { useRouteMatch } from "react-router-dom";

const Dashboard = ({ removeNav, clearPost, history }) => {
  useEffect(() => {
    removeNav();
    clearPost();

    // eslint-disable-next-line
  }, []);

  const match = useRouteMatch();
  console.log({ match });

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
