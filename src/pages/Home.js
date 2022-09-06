import React from 'react';
import {useEffect, useState} from 'react';
import PictureCard from '../components/PictureCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/button';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

const API_URL = 'https://random.dog/woof.json';
const Home = () => {
  const navigate = useNavigate();
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const saveToLocalStorage = async (img) => {
    const favDataRaw = localStorage.getItem('favorites');
    let favorites = [];
    if (favDataRaw !== null) {
      favorites = JSON.parse(favDataRaw);
    }

    if (favorites.filter((x) => x.fileUrl == img.fileUrl).length == 0) {
      favorites.push(img);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      await Swal.fire({
        title: 'Success',
        type: 'success',
        text: 'Your image has been saved.',
      });
    }
    console.log(favorites);
  };
  const getPictures = async (pictureCount) => {
    setIsLoading(true);
    const mockData = [];
    for (let i = 0; i < pictureCount; i++) {
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      mockData.push({
        cardId: i,
        fileSize: data.fileSizeBytes,
        fileUrl: data.url,
      });
    }
    setIsLoading(false);
    setPictures(mockData);
    return mockData;
  };

  useEffect(() => {
    getPictures(5).then(() => {
      //  setPictures((oldArray) => [...oldArray, data.url]);
    });
  }, []);
  return (
    <div className="app">
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
                            Select your favorite pictures
                    </h1>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        text={'Retake 5 Pictures'}
                        onClick={() => getPictures(5)}
                      />

                      <Button
                        text={'Go to the favorites'}
                        onClick={() => navigate('/favorites')}
                      />
                    </div>
                  </div>
                  {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="container">
                          {pictures.map((picture) => (
                            <PictureCard
                              pictureData={picture}
                              key={picture.key}
                              cardDesc={'Click to Add Your Favorites'}
                              onClick={() => saveToLocalStorage(picture)}
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

export default Home;
