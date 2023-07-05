import React, { useEffect, useState } from "react";
import Layout from "../../layout/ProfileLayout";
import { useDispatch, useSelector } from "react-redux";
import { hexToRgb } from "../../utils/hexToRgb";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  clearErrors,
  getCard,
  updateCardPicture,
  updateCardVBColor,
  updateCardCheckboxes,
} from "../../redux/action/card";
import VMPreview from "../../components/VMPreview";
import { urls } from "../../constant/virtualBackground/backgrounds";
import { colorBoxes } from "../../constant/virtualBackground/colorBoxes";
import { checkboxes } from "../../constant/virtualBackground/checkboxes";
import Checkbox from "../../components/Checkbox";

const VirtualBackground = () => {
  const pictureURL = process.env.REACT_APP_PICTURE_URL_2;
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [imgSwitch, setImgSwitch] = useState(false);
  const [selectedPic, setSelectedPic] = useState(urls[0]);
  const [active, setActive] = useState("255,255,255");

  const { card, loading, error } = useSelector((state) => state.card);

  useEffect(() => {
    if (!Object.keys(card).length) {
      dispatch(getCard(id));
    }
  }, [id]);

  useEffect(() => {
    if ("virtualBackground" in card) {
      if ("picture" in card.virtualBackground)
        setSelectedPic(pictureURL + card.virtualBackground.picture);
      if ("color" in card.virtualBackground)
        setActive(card.virtualBackground.color);
    }
  }, [card]);

  const handleChange = (e) => {
    const rgb = hexToRgb(e.target.value);

    dispatch(
      updateCardVBColor(
        {
          color: rgb,
        },
        id
      )
    );
  };

  const uploadHandle = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedPic(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    const formData = new FormData();
    formData.append("picture", e.target.files[0]);
    dispatch(updateCardPicture(formData, "VBPicture", id));
  };

  const handleCheckboxChange = (e) => {
    const formData = {
      [e.target.name]: e.target.checked,
    };

    dispatch(updateCardCheckboxes(formData, id));
  };

  // const submit = (e) => {
  //   e.preventDefault();

  //   dispatch(updateCard(about, id));
  // };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout className="content_container">
      <div className="content_flex d-flex">
        <div className="contacts">
          <div className="d-flex">
            <h6>Virtual Background</h6>
          </div>
          <div className="card_color py-4">
            <p className="f12 fw500 opacity-75 mb-3">Choose a theme color</p>
            <div className="d-flex align-items-center gap-5">
              <label htmlFor="color">
                <input
                  type="color"
                  name="color"
                  value={active}
                  style={{ opacity: 0, position: "absolute" }}
                  onChange={(e) => handleChange(e)}
                  id="color"
                />
                <div
                  className=""
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.17275 1.10225C8.95308 0.882583 8.59692 0.882583 8.37725 1.10225L6.36 3.1195L5.72275 2.48225C5.50308 2.26258 5.14692 2.26258 4.92725 2.48225L4.23725 3.17225C4.01758 3.39192 4.01758 3.74808 4.23725 3.96775L4.87451 4.605L1.47725 8.00225C1.37176 8.10774 1.3125 8.25082 1.3125 8.4V10.125C1.3125 10.4357 1.56434 10.6875 1.875 10.6875H3.6C3.74918 10.6875 3.89226 10.6282 3.99775 10.5227L7.395 7.12549L8.03225 7.76275C8.25192 7.98242 8.60808 7.98242 8.82775 7.76275L9.51775 7.07275C9.73742 6.85308 9.73742 6.49692 9.51775 6.27725L8.8805 5.64L10.8977 3.62275C11.1174 3.40308 11.1174 3.04692 10.8977 2.82725L9.17275 1.10225ZM6.06617 5.00433L2.4375 8.633V9.5625H3.36701L6.99567 5.93383L6.06617 5.00433Z"
                      fill="#828282"
                    ></path>
                  </svg>
                </div>
              </label>
              <div className="d-flex align-items-center gap-5">
                {colorBoxes.map((box, index) => (
                  <div
                    className="pointer position-relative"
                    key={index}
                    onClick={() => {
                      setActive(hexToRgb(box.code));
                      handleChange({
                        target: {
                          name: "color",
                          value: box.code,
                        },
                      });
                    }}
                  >
                    <div className="color_ball" style={box}></div>
                    {(active === hexToRgb(box.code) && (
                      <div className="active"></div>
                    )) ||
                      ""}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="virtual_checkboxes row gy-3">
            {checkboxes.map((content, index) => {
              const { title, lightText, label } = content;

              return (
                <div
                  className={`${
                    (lightText && "col-12") || "col-6"
                  } d-flex align-items-center`}
                  key={index}
                >
                  <div>
                    <Checkbox
                      value={
                        Object.keys(card).length
                          ? card.virtualBackground?.hasOwnProperty(label) &&
                            card.virtualBackground[label]
                          : ""
                      }
                      handleChange={handleCheckboxChange}
                      label={label}
                    />
                  </div>
                  <div>
                    <p className="f12 fw500">{title}</p>
                    {lightText && <p className="f10 opacity-50">{lightText}</p>}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="lib-image-container d-flex gap-2">
            <button
              onClick={() => setImgSwitch(false)}
              className={`${!imgSwitch && "bg-white"}`}
            >
              Choose from library
            </button>
            <button
              onClick={() => setImgSwitch(true)}
              className={`${imgSwitch && "bg-white"}`}
            >
              Upload image
            </button>
          </div>
          <br />
          {(imgSwitch && (
            <label
              htmlFor="uplaodImage"
              className="image-upload-container d-flex flex-column gap-3 rounded-4"
            >
              <div
                style={{ minWidth: "50px", background: "rgba(0,0,0,0.05)" }}
                className="rounded-3 mx-auto p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    fill="#cdcdcd"
                    d="M512 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V128C576 92.65 547.3 64 512 64zM528 384c0 8.822-7.178 16-16 16h-26.8l-132.3-198.5C348.9 195.6 342.2 192 335.1 192c-7.135 0-13.8 3.562-17.75 9.5l-83.66 125.5L203.9 286.1C199.9 280.6 193.5 277.3 186.7 277.3S173.4 280.6 169.4 286.1L86.37 400H64c-8.822 0-16-7.178-16-16V128c0-8.822 7.178-16 16-16h448c8.822 0 16 7.178 16 16V384zM175.1 160c-17.67 0-32 14.33-32 32s14.33 32 32 32c17.68 0 32-14.33 32-32S193.7 160 175.1 160z"
                  ></path>
                </svg>
              </div>

              <div className="d-flex flex-column">
                <div className="d-flex gap-2">
                  <span className="text-info fw-bold">Select image</span>
                  <span className="fw-semibold">to upload</span>
                </div>

                <div className="f10 text-center">
                  <span>or drag and drop it here</span>
                </div>
              </div>

              <input
                className="d-none"
                type="file"
                id={"uplaodImage"}
                accept="image/*"
                name={"uplaodImage"}
                onChange={(e) => uploadHandle(e)}
              />
            </label>
          )) || (
            <div className="row gy-3 gx-3">
              {urls.map((content, i) => {
                return (
                  <div
                    onClick={() => {
                      dispatch(
                        updateCardPicture(
                          {
                            picture: i + 1 + ".png",
                          },
                          "VBPicture",
                          id
                        )
                      );
                      setSelectedPic(content);
                    }}
                    className="col-4 pointer"
                    key={i}
                  >
                    <img
                      style={{ maxHeight: "82px", objectFit: "cover" }}
                      className={`w-100 rounded-3 ${
                        selectedPic === content &&
                        "border border-4 border-primary"
                      }`}
                      src={content}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="preview">
          <VMPreview selectedPic={selectedPic} active={active} />
        </div>
      </div>
    </Layout>
  );
};

export default VirtualBackground;
