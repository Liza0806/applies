import ReactDOM from 'react-dom';
import cls from './Modal.module.scss';
import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={cls.backdrop}>
      <div className={cls.modal}>
        <button className={cls.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={cls.contentBlock}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
