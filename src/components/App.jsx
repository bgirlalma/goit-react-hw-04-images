import { useEffect, useState } from "react";
import { GlobalStyled } from "./global.styled";
import { FetchItem } from "./Api";
import { Searchbar } from './Searchbar/searchbar';
import { Gallery } from "./Gallery/gallery";
import { LoadMore } from "./LoadMore/loadMore";

export const App = () => {
  const [query, setQuery] = useState('');
  const [image, setImage] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);

  useEffect(() => {
    const saveSearch = localStorage.getItem('save-search');
    if (saveSearch !== null) {
      try {
        setQuery(JSON.parse(saveSearch));
      } catch (error) {
        console.log('Opps! Помилочка!', error);
      }
    }
  }, []);

  useEffect(() => {

      try {
        localStorage.setItem('save-search', JSON.stringify(query))
      } catch (error) {
        console.log('Помилка збереження данних!', error)
      }
    }, [query])

  const fetchImagesByQuery = async (newQuery, page = 1) => {
    try {
      const queryImage = await FetchItem(newQuery, page);
      return queryImage;
    } catch (error) {
      console.log('Error fetching images:', error)
      return [];
    }
  }

  const changeQuery = async (newQuery) => {
    const queryImage = await fetchImagesByQuery(newQuery);
   
    return (
    setQuery(newQuery),
    setImage(queryImage),
    setPage(1),
    setShowLoadMoreButton(queryImage.length >= 12))
}

const loadMoreImages = async () => {
  setLoader(true);
  try {
    const newImages = await fetchImagesByQuery(query, page + 1);
    setImage(prevImage => [...prevImage, ...newImages]);
    setPage(prevPage => [prevPage + 1]);
    setLoader(false);
    setShowLoadMoreButton(newImages.length >= 12)
  } catch (error) {
    console.log('Неможливо завантажити картики!', error);
    setLoader(false)
  }
}


  return (
    <div>
      <Searchbar changeQuery={changeQuery} />
      <Gallery images={image} />
      {showLoadMoreButton && (
        <LoadMore
          loadMoreImages={loadMoreImages}
          loaderVisible={loader}
        />
      )}
      <GlobalStyled />
    </div>
  );
};
