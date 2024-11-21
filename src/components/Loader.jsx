import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <Oval
      height={50}
      width={50}
      color="#1e90ff"
      visible={true}
      ariaLabel="loading"
    />
  </div>
);

export default Loader;
