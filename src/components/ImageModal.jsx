import Modal from 'react-modal';
import styles from './ImageModal.module.css';

const ImageModal = ({ data, onClose }) => (
  <Modal
    isOpen={!!data}
    onRequestClose={onClose}
    className={styles.modal}
    overlayClassName={styles.overlay}
    ariaHideApp={false}
  >
    <div>
      <img src={data?.urls?.regular} alt={data?.alt_description} />
      <p>Author: {data?.user?.name}</p>
      <p>Likes: {data?.likes}</p>
      <button onClick={onClose} className={styles.closeButton}>
        X
      </button>
    </div>
  </Modal>
);

export default ImageModal;
