import React, { useEffect, useState } from "react";
import Layout from "../../layout/ProfileLayout";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getCard,
  updateCard,
  updateCardPicture,
} from "../../redux/action/card";
import cross from "../../assets/icons/cross.svg";

const PopCode = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [picturePreview, setPicturePreview] = useState();
  const [active, setActive] = useState("0,0,0");
  const [popCode, setPopCode] = useState({
    codeColor: "",
  });

  const placeholderPicture = process.env.REACT_APP_PLACEHOLDER_DP;
  const pictureURL = process.env.REACT_APP_PICTURE_URL;
  const { card, error, loading } = useSelector((state) => state.card);

  const colorBoxes = [
    {
      backgroundColor: "rgb(0, 0, 0)",
      border: "1px solid rgb(255, 255, 255)",
      code: "0,0,0",
    },
    {
      backgroundColor: "rgb(235, 87, 87)",
      border: "1px solid rgb(255, 255, 255)",
      code: "235,87,87",
    },
    {
      backgroundColor: "rgb(242, 153, 74)",
      border: "1px solid rgb(255, 255, 255)",
      code: "242,153,74",
    },
    {
      backgroundColor: "rgb(242, 201, 76)",
      border: "1px solid rgb(255, 255, 255)",
      code: "242,201,76",
    },
    {
      backgroundColor: "rgb(33, 150, 83)",
      border: "1px solid rgb(255, 255, 255)",
      code: "33,150,83",
    },
    {
      backgroundColor: "rgb(47, 128, 237)",
      border: "1px solid rgb(255, 255, 255)",
      code: "47,128,237",
    },
    {
      backgroundColor: "rgb(155, 81, 224)",
      border: "1px solid rgb(255, 255, 255)",
      code: "155,81,224",
    },
  ];

  const handleChange = (e) => {
    setPopCode({
      ...popCode,
      [e.target.name]: e.target.value,
    });
  };

  const uploadHandleChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPicturePreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    const formData = new FormData();
    formData.append("logo", e.target.files[0]);
    dispatch(updateCardPicture(formData, "codeLogo", id));
  };

  const removePicture = () => {
    dispatch(
      updateCard({ ...card, popCode: { ...card.popCode, logo: "" } }, id)
    );
  };

  const submit = (e) => {
    e.preventDefault();

    dispatch(
      updateCard(
        {
          popCode: {
            ...popCode,
          },
        },
        id
      )
    );
  };

  useEffect(() => {
    if (!Object.keys(card).length) {
      dispatch(getCard(id));
    }
  }, [id]);

  useEffect(() => {
    if (Object.keys(card).length) {
      setPopCode({
        ...card.popCode,
      });
      setActive(card.popCode.codeColor);
      setPicturePreview(
        (card.popCode.logo && pictureURL + card.popCode.logo) || null
      );
    }
  }, [card]);

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
    <Layout className="about_container">
      <div className="content_flex d-flex">
        <form onSubmit={submit} className="card_ pt-5">
          <h6>PopCode</h6>
          <div className="card_color py-5">
            <p className="f12 fw500 opacity-75 mb-3">Choose Color</p>
            <div className="d-flex align-items-center gap-4">
              <label htmlFor="colorChange">
                <input
                  type="color"
                  value="#fff"
                  style={{ opacity: 0, position: "absolute" }}
                  id="colorChange"
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
              <div className="d-flex align-items-center gap-4">
                {colorBoxes.map((box, index) => (
                  <div
                    className="pointer position-relative"
                    key={index}
                    onClick={() => {
                      setActive(box.code);
                      handleChange({
                        target: {
                          name: "codeColor",
                          value: box.code,
                        },
                      });
                    }}
                  >
                    <div className="color_ball" style={box}></div>
                    {(active === box.code && <div className="active"></div>) ||
                      ""}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="card_color py-5">
            <p className="f12 fw500 opacity-75 mb-3">Custom logo</p>
            {(picturePreview && (
              <div style={{ maxWidth: "90px" }} className="profile">
                <div className="pointer cross rounded-circle">
                  <img onClick={() => removePicture()} src={cross} alt="" />
                </div>
                <img
                  style={{
                    minHeight: "90px",
                    maxHeight: "90px",
                    objectFit: "cover",
                  }}
                  className="rounded-3 w-100"
                  src={picturePreview}
                  alt=""
                />
              </div>
            )) || (
              <label htmlFor="custom_logo">
                <div className="d-flex align-items-center gap-3">
                  <div className="custom_logo d-flex flex-column align-items-center gap-1">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 24.4922C19.0391 24.4922 24.4531 19.0781 24.4531 12.5391C24.4531 6.01172 19.0273 0.585938 12.4883 0.585938C5.96094 0.585938 0.546875 6.01172 0.546875 12.5391C0.546875 19.0781 5.97266 24.4922 12.5 24.4922ZM12.5 22.5C6.96875 22.5 2.55078 18.0703 2.55078 12.5391C2.55078 7.01953 6.95703 2.57812 12.4883 2.57812C18.0195 2.57812 22.4492 7.01953 22.4609 12.5391C22.4727 18.0703 18.0312 22.5 12.5 22.5ZM16.9883 9.35156L17.8086 8.51953C18.1719 8.13281 18.207 7.72266 17.8672 7.38281L17.6094 7.125C17.2695 6.78516 16.8477 6.82031 16.4844 7.18359L15.6406 8.00391L16.9883 9.35156ZM8.84375 17.4609L16.3086 10.0195L14.9609 8.68359L7.51953 16.1133L6.875 17.625C6.75781 17.9062 7.02734 18.1406 7.28516 18.0469L8.84375 17.4609Z"
                        fill="#828282"
                      ></path>
                    </svg>
                    <span className="f10">Add</span>
                  </div>
                  <p className="f14 fw500 mb-0">
                    Add custom logo to be displayed <br /> in the middle of the
                    PopCode.
                  </p>
                </div>

                <input
                  className="d-none"
                  type="file"
                  id="custom_logo"
                  accept="image/*"
                  name="custom_logo"
                  onChange={(e) => uploadHandleChange(e)}
                />
              </label>
            )}
          </div>
          <div className="actions d-flex justify-content-end gap-3">
            {/* <button>Cancel</button> */}
            <button
              disabled={
                JSON.stringify(card.popCode) === JSON.stringify(popCode)
                  ? true
                  : false
              }
            >
              Save PopCode
            </button>
          </div>
        </form>
        <div className="preview">
          <p className="opacity-75 text-center f14">{card.name}’s PopCode</p>

          <div className="scanner_container position-relative d-flex justify-content-center mt-5">
            <svg
              shape-rendering="crispEdges"
              height="200"
              width="200"
              viewBox="0 0 33 33"
            >
              <path fill="#fff" d="M0,0 h33v33H0z"></path>
              <path
                fill={`rgb(${active})`}
                d="M0 0h7v1H0zM8 0h3v1H8zM12 0h3v1H12zM18 0h2v1H18zM23 0h2v1H23zM26,0 h7v1H26zM0 1h1v1H0zM6 1h1v1H6zM8 1h1v1H8zM11 1h1v1H11zM13 1h1v1H13zM15 1h2v1H15zM18 1h2v1H18zM22 1h1v1H22zM24 1h1v1H24zM26 1h1v1H26zM32,1 h1v1H32zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM8 2h1v1H8zM12 2h1v1H12zM14 2h1v1H14zM17 2h1v1H17zM20 2h2v1H20zM23 2h2v1H23zM26 2h1v1H26zM28 2h3v1H28zM32,2 h1v1H32zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM9 3h2v1H9zM14 3h1v1H14zM17 3h3v1H17zM22 3h2v1H22zM26 3h1v1H26zM28 3h3v1H28zM32,3 h1v1H32zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM9 4h1v1H9zM14 4h2v1H14zM18 4h1v1H18zM20 4h1v1H20zM23 4h1v1H23zM26 4h1v1H26zM28 4h3v1H28zM32,4 h1v1H32zM0 5h1v1H0zM6 5h1v1H6zM8 5h2v1H8zM11 5h1v1H11zM13 5h2v1H13zM16 5h6v1H16zM26 5h1v1H26zM32,5 h1v1H32zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14 6h1v1H14zM16 6h1v1H16zM18 6h1v1H18zM20 6h1v1H20zM22 6h1v1H22zM24 6h1v1H24zM26,6 h7v1H26zM8 7h1v1H8zM11 7h1v1H11zM14 7h1v1H14zM16 7h2v1H16zM19 7h4v1H19zM24 7h1v1H24zM2 8h3v1H2zM6 8h1v1H6zM8 8h3v1H8zM15 8h1v1H15zM17 8h2v1H17zM21 8h2v1H21zM25 8h3v1H25zM30,8 h3v1H30zM1 9h1v1H1zM3 9h2v1H3zM7 9h3v1H7zM11 9h1v1H11zM16 9h4v1H16zM21 9h1v1H21zM23 9h1v1H23zM25 9h2v1H25zM29 9h1v1H29zM32,9 h1v1H32zM0 10h4v1H0zM5 10h2v1H5zM9 10h5v1H9zM18 10h1v1H18zM20 10h1v1H20zM24 10h4v1H24zM29 10h1v1H29zM31 10h1v1H31zM0 11h2v1H0zM4 11h1v1H4zM7 11h1v1H7zM9 11h1v1H9zM11 11h1v1H11zM13 11h1v1H13zM15 11h4v1H15zM21 11h1v1H21zM23 11h1v1H23zM29 11h2v1H29zM0 12h3v1H0zM4 12h1v1H4zM6 12h1v1H6zM9 12h1v1H9zM11 12h1v1H11zM13 12h2v1H13zM17 12h2v1H17zM21 12h1v1H21zM23 12h3v1H23zM28 12h1v1H28zM30 12h1v1H30zM0 13h1v1H0zM2 13h1v1H2zM8 13h4v1H8zM20 13h1v1H20zM23 13h2v1H23zM26 13h1v1H26zM29 13h1v1H29zM32,13 h1v1H32zM0 14h5v1H0zM6 14h1v1H6zM9 14h1v1H9zM12 14h4v1H12zM18 14h2v1H18zM22 14h1v1H22zM26 14h1v1H26zM29 14h1v1H29zM31 14h1v1H31zM0 15h1v1H0zM3 15h1v1H3zM8 15h4v1H8zM14 15h1v1H14zM17 15h2v1H17zM21 15h2v1H21zM26 15h2v1H26zM29 15h3v1H29zM0 16h2v1H0zM5 16h4v1H5zM10 16h2v1H10zM13 16h2v1H13zM16 16h1v1H16zM18 16h2v1H18zM25 16h1v1H25zM27 16h2v1H27zM0 17h1v1H0zM9 17h1v1H9zM14 17h1v1H14zM16 17h4v1H16zM21 17h1v1H21zM23 17h2v1H23zM32,17 h1v1H32zM0 18h1v1H0zM4 18h3v1H4zM9 18h2v1H9zM12 18h1v1H12zM14 18h2v1H14zM17 18h2v1H17zM20 18h1v1H20zM27 18h1v1H27zM30 18h1v1H30zM3 19h2v1H3zM7 19h1v1H7zM10 19h1v1H10zM12 19h1v1H12zM14 19h1v1H14zM17 19h1v1H17zM19 19h8v1H19zM29 19h2v1H29zM0 20h1v1H0zM3 20h4v1H3zM10 20h3v1H10zM14 20h3v1H14zM18 20h2v1H18zM22 20h1v1H22zM25 20h1v1H25zM27 20h3v1H27zM31 20h1v1H31zM0 21h1v1H0zM2 21h2v1H2zM5 21h1v1H5zM9 21h2v1H9zM12 21h3v1H12zM19 21h3v1H19zM23 21h1v1H23zM26 21h1v1H26zM29 21h1v1H29zM32,21 h1v1H32zM0 22h1v1H0zM2 22h2v1H2zM5 22h3v1H5zM10 22h1v1H10zM14 22h1v1H14zM17 22h2v1H17zM20 22h1v1H20zM24 22h1v1H24zM27 22h1v1H27zM29 22h1v1H29zM0 23h1v1H0zM4 23h1v1H4zM7 23h3v1H7zM11 23h3v1H11zM16 23h3v1H16zM21 23h2v1H21zM24 23h1v1H24zM27 23h1v1H27zM29,23 h4v1H29zM0 24h1v1H0zM2 24h2v1H2zM6 24h1v1H6zM8 24h2v1H8zM11 24h1v1H11zM14 24h2v1H14zM19 24h1v1H19zM22 24h8v1H22zM31,24 h2v1H31zM8 25h1v1H8zM10 25h2v1H10zM14 25h1v1H14zM18 25h1v1H18zM20 25h1v1H20zM22 25h1v1H22zM24 25h1v1H24zM28,25 h5v1H28zM0 26h7v1H0zM9 26h1v1H9zM12 26h1v1H12zM17 26h1v1H17zM19 26h2v1H19zM22 26h3v1H22zM26 26h1v1H26zM28 26h2v1H28zM31 26h1v1H31zM0 27h1v1H0zM6 27h1v1H6zM9 27h2v1H9zM12 27h1v1H12zM14 27h3v1H14zM20 27h1v1H20zM23 27h2v1H23zM28,27 h5v1H28zM0 28h1v1H0zM2 28h3v1H2zM6 28h1v1H6zM8 28h1v1H8zM13 28h1v1H13zM17 28h2v1H17zM21 28h2v1H21zM24 28h5v1H24zM31,28 h2v1H31zM0 29h1v1H0zM2 29h3v1H2zM6 29h1v1H6zM8 29h5v1H8zM14 29h1v1H14zM19 29h3v1H19zM25 29h1v1H25zM28 29h3v1H28zM32,29 h1v1H32zM0 30h1v1H0zM2 30h3v1H2zM6 30h1v1H6zM8 30h3v1H8zM14 30h1v1H14zM18 30h2v1H18zM21 30h3v1H21zM25 30h2v1H25zM30 30h1v1H30zM0 31h1v1H0zM6 31h1v1H6zM9 31h2v1H9zM13 31h2v1H13zM17 31h3v1H17zM25 31h3v1H25zM29 31h2v1H29zM0 32h7v1H0zM9 32h1v1H9zM11 32h1v1H11zM14 32h1v1H14zM17 32h1v1H17zM19 32h2v1H19zM23 32h3v1H23zM31 32h1v1H31z"
              ></path>
            </svg>
            <img
              src={
                Object.keys(card).length && card.popCode.logo
                  ? pictureURL + card.popCode.logo
                  : (card.cardDP && pictureURL + card.cardDP) ||
                    placeholderPicture
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PopCode;
