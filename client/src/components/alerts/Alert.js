import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alert }) =>
    alert.length > 0 &&
    alert.map((alertItem) => (
        <div className='alert alert-danger' role='alert'>
            <strong>Alert:</strong> {alertItem.msg}
        </div>
    ));

const mapStateToProps = (state) => {
    return {
        alert: state.alert,
    };
};

export default connect(mapStateToProps, null)(Alert);
