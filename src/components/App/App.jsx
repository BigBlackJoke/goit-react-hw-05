import { useState, useEffect, useMemo } from "react";
import css from "./App.module.css";
import axios from "axios"
import { fetchImages } from "../../gallery-api.js";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { useToggle } from "../../useToggle.js";
import ImageModal from "../ImageModal/ImageModal";
import ImageGallery from "../ImageGallery/ImageGallery";

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [imageSrc, setImageSrc] = useState("");
  const [imageDesc, setImageDesc] = useState("");
  const { isOpen, open, close } = useToggle();

  useEffect(() => {
    if (!query.trim()) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const { results, total_pages } = await fetchImages(query, page);
        setItems((prevState) => [...prevState, ...results]);
        setTotalPageNum(total_pages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, query]);

  const handleSearch = (topic) => {
    setQuery(topic);
    setPage(1);
    setItems([]);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  const handleImageClick = (imageSrc, imageDesc) => {
    setImageSrc(imageSrc);
    setImageDesc(imageDesc);
    open();
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      {error && <ErrorMessage />}

      {items.length > 0 && (
        <ImageGallery
          items={items}
          onClick={open}
          onOpenModal={handleImageClick}
        />
      )}
      {items.length > 0 && !loading && page < totalPageNum && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {loading && <Loader />}

      <ImageModal
        isOpen={isOpen}
        onClose={close}
        imageSrc={imageSrc}
        imageDesc={imageDesc}
      />
    </>
  );
}
