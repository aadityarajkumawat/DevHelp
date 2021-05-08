import {
  Alert as A,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";
import { connect } from "react-redux";

const Alert = ({ alert }) =>
  alert.length > 0 &&
  alert.map((alertItem) => (
    <A status="error" w="450px" margin="auto" mb="20px">
      <AlertIcon />
      <AlertTitle mr={2}>Alert:</AlertTitle>
      <AlertDescription>{alertItem.msg}</AlertDescription>
    </A>
  ));

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

export default connect(mapStateToProps, null)(Alert);
