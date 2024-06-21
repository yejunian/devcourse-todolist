import { Button, Modal } from 'react-bootstrap';

import Todo from './Todo';

type TodoModalProps = {
  show: boolean;
  todo: Todo;
  onClose: () => void;
};

function TodoModal({ show = false, todo, onClose }: TodoModalProps) {
  const handleClose = () => onClose();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>TODO 상세 정보</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ul>
          <li>{todo.title}</li>
          <li>{todo.done ? '완료됨' : '대기 중'}</li>
        </ul>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TodoModal;
