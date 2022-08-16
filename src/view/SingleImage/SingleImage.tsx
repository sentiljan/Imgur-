import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import "./SingleImage.style.scss";
import { Images } from "../Imgur/Imgur";

interface ImageType {
  id: number;
  title: string;
  description: string;
  ups: number;
  downs: number;
  score: number;
  images: Images[];
}

export const SingleImage = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageData, setImageData] = useState<ImageType>();
  const { imageId } = useParams();

  const getImageData = useCallback(() => {
    const options = {
      method: "GET",
      url: `https://api.imgur.com/3/gallery/${imageId}`,
      headers: {
        Authorization: "Client-ID d1dce7b51e5344a",
      },
    };

    setLoading(true);
    axios
      .request(options)
      .then(function (response) {
        setImageData(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [imageId]);

  useEffect(() => {
    getImageData();
  }, [getImageData]);
  return (
    <div>
      {!loading && (
        <div className="singleImage">
          <img
            src={imageData?.images && imageData.images[0].link}
            alt={imageData?.title}
          />
          <div className="singleImage__meta">
            <div className="singleImage__meta--desc">
              <h3>Title: {imageData?.title}</h3>
              <p>Description: {imageData?.description}</p>
            </div>
            <div className="singleImage__meta--votes">
              <div className="singleImage__meta--votes--like">
                <LikeOutlined />
                <p>{imageData?.ups}</p>
              </div>
              <div className="singleImage__meta--votes--dislike">
                <DislikeOutlined />
                <p>{imageData?.downs}</p>
              </div>
              <div>
                <p>Score: {imageData?.score}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
