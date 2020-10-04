import React from 'react';
import { connect } from 'react-redux';
import { closeMessageModal } from '../../redux/actions';
import Spinner from './Spinner';
import './MessageModal.css';
function MessageModal({ messageModal, dispatch }) {
    const { open, loading, message } = messageModal;
    const handleClose = () => {
        dispatch(closeMessageModal());
    }
    return (<div className="modal fade show MessageModal" style={{ display: open ? 'block' : 'none' }} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div className="modal-dialog" role="document">
            <div className="modal-content">
                {!loading && message && <div className="modal-header">
                    <button onClick={handleClose} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
                {loading && <div className="modal-body">
                    <div><Spinner />&nbsp;Đang xử lí...</div>
                </div>}
            </div>
        </div>
    </div>)
}

const mapStateToProps = state => ({
    messageModal: state.messageModal
})

const mapDispatchToProps = dispatch => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageModal);