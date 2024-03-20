import { Button, Modal } from 'react-bootstrap'

const DialogBox = ({
  showDialog,
  cancel,
  confirm,
  title,
  message,
  prompt
}) => {
  return (
    <Modal show={showDialog}>
      <Modal.Header>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>{ message }</b>
        <br/> { prompt }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={cancel}>
          No
        </Button>
        <Button variant="danger" onClick={confirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default DialogBox
