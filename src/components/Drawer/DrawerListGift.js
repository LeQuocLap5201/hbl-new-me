import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Collapse, Drawer, Modal } from "antd";
import { useQuery } from "react-query";
import memberApi from "../../api/memberApi";
import Certificate from "../Certificate";
import Hourglass from "../Hourglass";
import { saveAs } from "file-saver";
import { DownloadOutlined } from "@ant-design/icons";

DrawerListGift.propTypes = {
  isShow: PropTypes.bool,
  FnShow: PropTypes.func,
};

DrawerListGift.defaultProps = {
  isShow: false,
  FnShow: null,
};

function DrawerListGift({ isShow, FnShow }) {
  const [visible, setVisible] = useState(false);
  const [dataGift, setDataGift] = useState({ type: "gifts", data: [] });

  const closeDrawer = () => {
    if (!FnShow) {
      return;
    }
    return FnShow(false);
  };

  const showModalGift = (type, data) => {
    setDataGift({ type, data });
    setVisible(true);
  };

  const downloadImage = (url, name) => {
    saveAs(url, name); // Put your image url here.
  };

  const { data, isLoading } = useQuery("my-gifts", memberApi.getMyGifts, {
    // select: (data) => data.data?.items,
    select: () => [
      {
        round: {
          created_at: "2022-06-13T03:39:32.217Z",
          updated_at: "2022-06-13T03:39:32.217Z",
          round_id: 0,
          title: "string",
          started_at: "2022-06-13T03:39:32.217Z",
          ended_at: "2022-06-13T03:39:32.217Z",
          status: 1,
          races: [
            {
              created_at: "2022-06-13T03:39:32.217Z",
              updated_at: "2022-06-13T03:39:32.217Z",
              round: "string",
              race_id: 0,
              title: "string",
              started_at: "2022-06-13T03:39:32.217Z",
              ended_at: "2022-06-13T03:39:32.217Z",
              status: 1,
            },
          ],
        },
        race_id: 0,
        title: "Chặng 1 - Vòng 1",
        started_at: "2022-06-13T03:39:32.217Z",
        ended_at: "2022-06-13T03:39:32.217Z",
        status: 1,
        gifts: [
          {
            gift_id: 1,
            name: "Trà thảo mộc cô đặc 1",
            description: "Trà thảo mộc cô đặc",
            image_url: "/img/hbl-tea1.png",
          },
          {
            gift_id: 2,
            name: "Trà thảo mộc cô đặc 2",
            description: "Trà thảo mộc cô đặc",
            image_url: "/img/hbl-tea1.png",
          },
          {
            gift_id: 3,
            name: "Trà thảo mộc cô đặc 3",
            description: "Trà thảo mộc cô đặc",
            image_url: "/img/hbl-tea1.png",
          },
        ],
        certificates: [
          {
            certificate_id: 1,
            name: "Giấy chứng nhận 1",
            description: "Giấy chứng nhận",
            image_url: "/img/cer.png",
          },
          {
            certificate_id: 2,
            name: "Giấy chứng nhận 2",
            description: "Giấy chứng nhận",
            image_url: "/img/cer.png",
          },
        ],
      },
    ],
    enabled: isShow,
  });

  return (
    <>
      <Drawer
        className="drawer-update drawer-history drawer-list-gift"
        title="Quà của tôi"
        placement="bottom"
        onClose={closeDrawer}
        visible={isShow}
      >
        <Collapse
          accordion
          style={{ border: "none", background: "transparent" }}
        >
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

          {data?.length === 0 && (
            <p style={{ textAlign: "center", fontSize: 18 }}>Trống</p>
          )}

          {data?.map((obj) => (
            <Collapse.Panel
              key={obj?.race_id}
              className="collapse-panel__primary"
              header={obj?.title}
              showArrow={false}
            >
              {obj?.gifts &&
                obj?.gifts?.map((gift) => (
                  <div
                    key={gift?.gift_id}
                    className="gift-item"
                    onClick={() => showModalGift("gifts", gift?.image_url)}
                  >
                    {gift?.name}
                  </div>
                ))}

              {obj?.certificates &&
                obj?.certificates?.map((cer) => (
                  <div
                    key={cer?.certificate_id}
                    className="gift-item"
                    onClick={() => showModalGift("cer", cer?.image_url)}
                  >
                    {cer?.name}
                    <Button
                      className="btn-down"
                      icon={<DownloadOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(cer?.image_url, cer?.name);
                      }}
                    />
                  </div>
                ))}
            </Collapse.Panel>
          ))}
        </Collapse>
      </Drawer>
      <Modal
        className="modal-gift"
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
      >
        {dataGift?.type === "gifts" && (
          <img
            style={{ width: "100%" }}
            src={dataGift?.data}
            alt="gift"
            onClick={() => {
              setVisible(false);
            }}
          />
        )}

        {dataGift?.type === "cer" && (
          <div
            onClick={() => {
              setVisible(false);
            }}
          >
            <Certificate urlImg={dataGift?.data} />
          </div>
        )}
      </Modal>
    </>
  );
}

export default DrawerListGift;
