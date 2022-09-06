import React from 'react';
import {useEffect, useState} from 'react';
import PictureCard from '../components/PictureCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';
import Button from '../components/button';
import {useNavigate} from 'react-router-dom';

const Favorites = () => {
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const removeFromLocalStorage = async (img) => {
    const favDataRaw = localStorage.getItem('favorites');
    let favorites = [];
    if (favDataRaw !== null) {
      favorites = JSON.parse(favDataRaw);
    }
    const arrNdx = favorites.findIndex((x) => x.fileUrl == img.fileUrl);
    if (arrNdx >= 0) {
      console.log(arrNdx);
      favorites.splice(arrNdx, 1);

      localStorage.setItem('favorites', JSON.stringify(favorites));
      await Swal.fire({
        title: 'Success',
        type: 'success',
        text: 'Your image has been removed.',
      });

      console.log(favorites);
      await getPictures();
    }
  };

  const getPictures = async () => {
    setIsLoading(true);
    const mockData = [];
    const favDataRaw = localStorage.getItem('favorites');
    let favorites = [];
    if (favDataRaw !== null) {
      favorites = JSON.parse(favDataRaw);
    }

    for (let i = 0; i < favorites.length; i++) {
      mockData.push(favorites[i]);
    }
    setIsLoading(false);
    setPictures(mockData);
    return mockData;
  };

  useEffect(() => {
    getPictures().then(() => {
      //  setPictures((oldArray) => [...oldArray, data.url]);
    });
  }, []);
  return (
    <div className="app">
      <Button
        text={'Go to the HomePage'}
        onClick={() => navigate('/')}
      />
      {pictures?.length > 0 ? (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <h1 className="containerTitle">
                  Your favorite pictures
                </h1>

              </div>
              {isLoading ? (
                  <LoadingSpinner/>
              ) : (
                  <div className="container">
                    {pictures.map((picture) => (
                      <PictureCard
                        pictureData={picture}
                        key={picture.key}
                        onClick={() =>
                          removeFromLocalStorage(picture)
                        }
                        cardDesc={
                          'Click to Remove from Your Favorite list'
                        }
                      />
                      // also we can use picture.key
                    ))}
                  </div>
              )}
            </>
        ) : (
            <div className="empty">
              <h2>No picture found</h2>
            </div>
        )}
    </div>
  );
};

export default Favorites;
