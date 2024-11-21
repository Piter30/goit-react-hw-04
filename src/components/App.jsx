import { useState, useRef } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import LoadMoreBtn from './LoadMoreBtn';
import ImageModal from './ImageModal';
import ErrorMessage from './ErrorMessage';
import styles from './App.module.css';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [modalData, setModalData] = useState(null);

  const galleryEndRef = useRef(null);

  const handleSearch = async searchQuery => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    fetchImages(searchQuery, 1);
  };

  const fetchImages = async (searchQuery, pageNum) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: searchQuery,
            page: pageNum,
            per_page: 12,
          },
          headers: {
            Authorization: `Client-ID rI24l-Pg0mFzlZjDN_wHlyR6x5e3SkrrAjCa-onxa6o`,
          },
        }
      );
      setImages(prevImages => [...prevImages, ...response.data.results]);

      setTimeout(() => {
        galleryEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err) {
      console.error(err);
      setError('Coś poszło nie tak. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const openModal = imageData => setModalData(imageData);

  const closeModal = () => setModalData(null);

  return (
    <div className={styles.container}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalData && <ImageModal data={modalData} onClose={closeModal} />}
      <div ref={galleryEndRef}></div>
    </div>
  );
};

export default App;
