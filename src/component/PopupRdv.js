import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function PopupRdv({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Prendre un rendez-vous</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nom complet</Form.Label>
            <Form.Control type="text" placeholder="Votre nom" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control type="tel" placeholder="+243..." />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type d’examen</Form.Label>
            <Form.Select>
              <option>Analyse sanguine</option>
              <option>Échographie</option>
              <option>Consultation générale</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" className="w-100">
            Envoyer la demande
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
