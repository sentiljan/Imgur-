import React, { useState } from "react";
import { Checkbox, Layout, Select } from "antd";
import { Imgur } from "../Imgur/Imgur";
import "./AppLayout.style.scss";
import { BrowserRouter, Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { CheckboxChangeEvent } from "antd/lib/checkbox/Checkbox";
import { Route, Routes } from "react-router-dom";
import { SingleImage } from "../SingleImage/SingleImage";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

export enum Sort {
  TIME = "Time",
  VIRAL = "Viral",
  TOP = "Top",
}

export enum Section {
  HOT = "Hot",
  TOP = "Top",
  USER = "User",
}

export enum Window {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
  ALL = "all",
}

export const AppLayout = () => {
  const [sort, setSort] = useState<Sort>(Sort.TOP);
  const [section, setSection] = useState<Section>(Section.TOP);
  const [showViral, setShowViral] = useState<boolean>(false);
  const [window, setWindow] = useState<Window>(Window.DAY);

  const handleSortChange = (value: Sort) => {
    setSort(value);
  };

  const handleSectiontChange = (value: Section) => {
    setSection(value);
  };

  const handleWindowChange = (value: Window) => {
    setWindow(value);
  };

  const onChangeViral = (e: CheckboxChangeEvent) => {
    setShowViral(e.target.checked);
  };

  return (
    <BrowserRouter>
      <Layout className="layout">
        <Header className="layout__header">
          <Link to={"/"}>
            <Logo />
          </Link>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Checkbox
                    className="layout__header--checkbox"
                    onChange={onChangeViral}
                  >
                    Show Viral
                  </Checkbox>
                  {/* Sort Select Box */}

                  <Select
                    style={{ width: 120 }}
                    onChange={handleSortChange}
                    placeholder="Section"
                  >
                    <Option value={Sort.TOP}>{Sort.TOP}</Option>
                    <Option value={Sort.VIRAL}>{Sort.VIRAL}</Option>
                    <Option value={Sort.TIME}>{Sort.TIME}</Option>
                  </Select>
                  {/* Section Select Box */}
                  <Select
                    style={{ width: 120 }}
                    placeholder="Sort"
                    onChange={handleSectiontChange}
                  >
                    <Option value={Section.TOP}>{Section.TOP}</Option>
                    <Option value={Section.HOT}>{Section.HOT}</Option>
                    <Option value={Section.USER}>{Section.USER}</Option>
                  </Select>
                  {/* Window Select Box */}

                  {section === Section.TOP && (
                    <Select
                      style={{ width: 120 }}
                      onChange={handleWindowChange}
                      placeholder="Window"
                    >
                      <Option value="day">Day</Option>
                      <Option value="week">Week</Option>
                      <Option value="month">Month</Option>
                      <Option value="year ">Year</Option>
                      <Option value="all">All</Option>
                    </Select>
                  )}
                </div>
              }
            />
          </Routes>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <Imgur
                  showViral={showViral!}
                  sort={sort}
                  section={section}
                  window={window}
                />
              }
            />
            <Route path="/gallery/image/:imageId" element={<SingleImage />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>TechAway ©2022</Footer>
      </Layout>
    </BrowserRouter>
  );
};
