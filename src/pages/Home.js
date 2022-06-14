/* eslint-disable jsx-a11y/alt-text */
import { Button, message, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Info from "../components/Info";
import DrawerUpdate from "../components/Drawer/DrawerUpdate";
import DrawerHistory from "../components/Drawer/DrawerHistory";
import memberApi from "../api/memberApi";
import { useQuery } from "react-query";
import DrawerGift from "../components/Drawer/DrawerGift";
import DrawerRanks from "../components/Drawer/DrawerRanks";
import DrawerListGift from "../components/Drawer/DrawerListGift";
import Hourglass from "../components/Hourglass";

export default function Home() {
  const [ellipsis, setEllipsis] = useState(true);
  const [showListBtn, setShowListBtn] = useState(false);
  const [showBtnAgree, setShowBtnAgree] = useState(false);
  const [isModalUpdate, setModalUpdate] = useState(false);
  const [isModalHistory, setModalHistory] = useState(false);
  const [isModalGift, setModalGift] = useState(false);
  const [isModalListGift, setModalListGift] = useState(false);
  const [isModalRanks, setModalRanks] = useState(false);
  const [loadingAgree, setLoadingAgree] = useState(false);
  const [dataGift, setDataGift] = useState({
    new_certificates: [],
    new_gifts: [],
  });
  // Call Api
  const { isLoading } = useQuery("member-me", memberApi.getMe, {
    onSuccess: ({ data }) => {
      if (data?.item) {
        setShowBtnAgree(false);
        setShowListBtn(true);
      }
      if (data?.item?.new_certificates || data?.item?.new_gifts) {
        setDataGift({
          new_certificates: data?.item?.new_certificates || [],
          new_gifts: data?.item?.new_gifts || [],
        });
        setModalGift(true);
      }
    },
    onError: (error) => {
      if (error?.response?.data?.statusCode === 403) {
        setShowListBtn(false);
        setShowBtnAgree(true);
      }
    },
  });

  const handleShowUpdate = (val) => {
    setModalUpdate(val);
  };

  const handleShowHistory = (val) => {
    setModalHistory(val);
  };

  const handleShowGift = (val) => {
    setModalGift(val);
  };

  const handleShowListGift = (val) => {
    setModalListGift(val);
  };

  const handleShowRanks = (val) => {
    setModalRanks(val);
  };

  const handleReceivedMessage = (event) => {
    if (event) {
      let data = JSON.parse(event);
      let token = data.TOKEN;
      console.log("token: ", token);
    }
  };

  // Accept member
  const handleAgree = async () => {
    setLoadingAgree(true);
    try {
      await memberApi.memberAccept();
      setLoadingAgree(false);
      setShowBtnAgree(false);
      setShowListBtn(true);
    } catch (error) {
      setLoadingAgree(false);
      message.error("Tham gia chương trình không thành công");
      console.log(error);
    }
  };

  // Get TOKEN from App
  useEffect(() => {
    document.addEventListener("message", handleReceivedMessage);

    return () => {
      document.removeEventListener("message", handleReceivedMessage);
    };
  }, []);

  return (
    <>
      <div className="info-home container">
        <Info />
        <div className="home-card__content">
          <div className="home-card__title">
            <h3>Giới thiệu về chương trình</h3>
            <h3>New me - Thách thức tôi</h3>
          </div>
          <Typography.Paragraph
            style={{ marginBottom: 0 }}
            ellipsis={
              ellipsis
                ? {
                    rows: 4,
                    symbol: "more",
                  }
                : false
            }
          >
            <p>
              Khi tham gia chương trình New Me - Thách Thức Tôi, Thành viên sẽ
              được:
            </p>
            <ol>
              <li>Ghi nhận kết quả tham gia</li>
              <li>Giấy chứng nhận</li>
              <li>Nhận những phần quà hấp dẫn từ Herbalife</li>
              <li>Theo dõi được “Bản thân mới”</li>
            </ol>
            <p>Exercitation veniam consequat sunt nostrud amet.</p>
          </Typography.Paragraph>
          {ellipsis && (
            // <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            //   <Button
            //     onClick={() => {
            //       setEllipsis(false);
            //     }}
            //   >
            //     Xem chi tiết
            //   </Button>
            // </Space>
            <Space
              style={{ justifyContent: "center", width: "100%", marginTop: 20 }}
            >
              <span
                style={{ color: "#1890FF", fontStyle: "italic", fontSize: 14 }}
                onClick={() => {
                  setEllipsis(false);
                }}
              >
                Xem chi tiết
              </span>
            </Space>
          )}

          {!ellipsis && (
            <Space style={{ justifyContent: "center", width: "100%" }}>
              <span
                style={{ color: "#1890FF", fontStyle: "italic", fontSize: 14 }}
                onClick={() => {
                  setEllipsis(true);
                }}
              >
                Thu gọn
              </span>
            </Space>
          )}
        </div>
      </div>
      {isLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            margin: "20px 0",
          }}
        >
          <Hourglass />
        </div>
      )}
      {showBtnAgree && (
        <Space
          style={{
            width: "100%",
            justifyContent: "center",
            marginTop: 70,
            marginBottom: 20,
          }}
        >
          <Button
            loading={loadingAgree}
            className="btn-agree"
            onClick={handleAgree}
          >
            Tôi đồng ý tham gia chương trình
          </Button>
        </Space>
      )}
      {showListBtn && (
        <div className="list-btn container">
          <Button
            block
            className="btn-primary"
            onClick={() => {
              setModalUpdate(true);
            }}
          >
            <div className="btn-icon">
              <img srcSet="/img/update.png 2x" alt="icon" />
            </div>
            Cập nhật hoạt động
          </Button>
          <Button
            block
            className="btn-primary"
            onClick={() => {
              setModalRanks(true);
            }}
          >
            <div className="btn-icon">
              <img srcSet="/img/ranks.png 2x" alt="icon" />
            </div>
            Bảng xếp hạng
          </Button>
          <Button
            block
            className="btn-primary"
            onClick={() => {
              setModalHistory(true);
            }}
          >
            <div className="btn-icon">
              <img srcSet="/img/history.png 2x" alt="icon" />
            </div>
            Lịch sử cập nhật
          </Button>
          <Button
            block
            className="btn-primary"
            onClick={() => {
              setModalListGift(true);
            }}
          >
            <div className="btn-icon">
              <img srcSet="/img/gift.png 2x" alt="icon" />
            </div>
            Quà của tôi
          </Button>
          <Link to="energy">
            <Button block className="btn-primary">
              <div className="btn-icon">
                <img srcSet="/img/energy.png 2x" alt="icon" />
              </div>
              Lan tỏa năng lượng
            </Button>
          </Link>
        </div>
      )}
      <DrawerUpdate isShow={isModalUpdate} FnShow={handleShowUpdate} />
      <DrawerHistory isShow={isModalHistory} FnShow={handleShowHistory} />
      <DrawerGift
        isShow={isModalGift}
        FnShow={handleShowGift}
        dataGift={dataGift}
      />
      <DrawerRanks isShow={isModalRanks} FnShow={handleShowRanks} />
      <DrawerListGift isShow={isModalListGift} FnShow={handleShowListGift} />
    </>
  );
}
