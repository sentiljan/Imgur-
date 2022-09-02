import { LoadingOutlined } from "@ant-design/icons";
import { Card, List } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dataSelector } from "../../store/imgur/dataSelctor";
import { Section, Sort, Window } from "../Layout/AppLayout";
import "./Imgur.style.scss";
import { setData as setImgurData } from "../../store/imgur/dataSlice";

interface Props {
  showViral: boolean;
  sort: Sort;
  section: Section;
  window: Window;
}

export interface Images {
  link: string;
  id: number;
  type: string;
}

interface GalleryType {
  id: number;
  title: string;
  images: Images[];
}

interface ImgurDataType {
  data: GalleryType[];
}

export const Imgur = ({
  showViral,
  section,
  sort,
  window,
}: Props): JSX.Element => {
  // const [data, setData] = useState<GalleryType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imgurData: ImgurDataType = useSelector(dataSelector);

  const getGalleryData = useCallback(() => {
    const options = {
      method: "GET",
      url: `https://api.imgur.com/3/gallery/random/${section}/${sort}/${window}/${page}?showViral=${showViral}`,
      headers: {
        Authorization: "Client-ID d1dce7b51e5344a",
      },
    };

    setLoading(true);
    axios
      .request(options)
      .then(function (response) {
        dispatch(setImgurData({ data: response.data.data }));
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [dispatch, page, section, showViral, sort, window]);

  useEffect(() => {
    getGalleryData();
  }, [getGalleryData]);

  const filterVideos = (item: GalleryType) => {
    if (item.images) {
      return item.images[0].type === "image/jpeg";
    }
  };

  return (
    <>
      {!loading ? (
        <div className="imgur">
          {imgurData.data.length > 1 ? (
            <List
              grid={{ gutter: 16, column: 4 }}
              pagination={{
                onChange: (page) => {
                  setPage(page);
                },
                pageSize: 16,
                hideOnSinglePage: true,
              }}
              dataSource={imgurData.data.filter(filterVideos)}
              renderItem={(item: GalleryType) => {
                if (item.images) {
                  return (
                    <List.Item
                      key={item.id}
                      onClick={() => navigate(`gallery/image/${item.id}`)}
                    >
                      <Card title={item.title} className="imgur__image">
                        <div className="imgur__image--wrapper">
                          <img
                            src={item.images && item.images[0].link}
                            alt={item.title}
                          />
                        </div>
                      </Card>
                    </List.Item>
                  );
                }
              }}
            />
          ) : (
            <div>
              <p>The image you were searching was not found!</p>
            </div>
          )}
        </div>
      ) : (
        <LoadingOutlined style={{ fontSize: "32px" }} />
      )}
    </>
  );
};
