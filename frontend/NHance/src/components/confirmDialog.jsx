// components/ConfirmDialog.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDialog = ({ show, onHide, onConfirm, title = "Are you sure?", confirmText = "Confirm" }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{title}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;