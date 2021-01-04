import React, { Fragment } from "react";
import { connect } from "react-redux";
import { removePopup } from "../../actions/popupAction";

const PopupModal = ({ popup, removePopup }) => {
  return (
    <Fragment>
      {popup.mounted ? (
        <div className="popup-modal-container">
          <h4>{popup.heading}</h4>
          <div className="popup-msg">{popup.message}</div>
          <div className="confirm-act">
            <button onClick={removePopup}>Ok</button>
          </div>
        </div>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  popup: state.popup,
});

export default connect(mapStateToProps, { removePopup })(PopupModal);
