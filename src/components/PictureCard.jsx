import React from 'react';
import ReactPlayer from 'react-player';

const PictureCard = (props) => {
  const {pictureData, onClick, cardDesc} = props;

  const checkFileType = (fileName) => {
    if (fileName.toLowerCase().includes('jpg')) {
      return 'JPG File';
    } else if (fileName.toLowerCase().includes('png')) {
      return 'PNG File';
    } else if (fileName.toLowerCase().includes('mp4')) {
      return 'MP4 File';
    } else {
      return 'Other File Type';
    }
  };

  const bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

  return (
    <div className="picture" key={pictureData.cardId} onClick={onClick}>
      <div>
        <p>Files Size {bytesToSize(pictureData.fileSize)}</p>
      </div>

      {pictureData.fileUrl.toLowerCase().includes('mp4') ? (
                <ReactPlayer
                  url={pictureData.fileUrl}
                  loop={true}
                  playing={true}
                  controls={true}
                />
            ) : (
                <div>
                  <img
                    src={
                            pictureData.fileUrl !== '' ?
                                pictureData.fileUrl :
                                'https://via.placeholder.com/400'
                    }
                    alt={pictureData.cardId}
                  />
                </div>
            )}

      <div>
        <span>{checkFileType(pictureData.fileUrl)}</span>
        <h3>{cardDesc}</h3>
      </div>
    </div>
  );
};

export default PictureCard;
