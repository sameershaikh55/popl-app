import React, { useEffect, useState } from "react";
import Layout from "../../layout/ProfileLayout";
import Preview from "../../components/Preview";
import Input from "../../components/Input";
import Uploaders from "../../components/Uploaders";
import { useDispatch, useSelector } from "react-redux";
import { hexToRgb } from "../../utils/hexToRgb";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  clearErrors,
  getCard,
  updateCard,
  updateCardPicture,
} from "../../redux/action/card";
import { colorBoxes } from "../../constant/virtualBackground/colorBoxes";

const About = () => {
  const pictureURL = process.env.REACT_APP_PICTURE_URL;
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [picturePreview, setPicturePreview] = useState({
    cardDP: "",
    coverDP: "",
    companyDP: "",
  });
  const [active, setActive] = useState("255,255,255");
  const [about, setAbout] = useState({
    title: "",
    cardDP: "",
    coverDP: "",
    companyDP: "",
    cardColor: "",
    name: "",
    location: "",
    jobTitle: "",
    company: "",
    bio: "",
  });

  const { card, loading, error } = useSelector((state) => state.card);

  useEffect(() => {
    if (!Object.keys(card).length) {
      dispatch(getCard(id));
    }
  }, [id]);

  useEffect(() => {
    setPicturePreview({
      cardDP: (card.cardDP && pictureURL + card.cardDP) || null,
      coverDP: (card.coverDP && pictureURL + card.coverDP) || null,
      companyDP: (card.companyDP && pictureURL + card.companyDP) || null,
    });
    setAbout({ ...card });
    setActive(card.cardColor);
  }, [card]);

  const inputs = [
    {
      label: "Name",
      name: "name",
    },
    {
      label: "Location",
      name: "location",
    },
    {
      label: "Job Title",
      name: "jobTitle",
    },
    {
      label: "Company",
      name: "company",
    },
    {
      label: "Bio",
      name: "bio",
    },
  ];

  const handleChange = (e) => {
    if (e.target.name === "cardColor") {
      const rgb = hexToRgb(e.target.value);

      setAbout({
        ...about,
        [e.target.name]: rgb,
      });
    } else {
      setAbout({
        ...about,
        [e.target.name]: e.target.value,
      });
    }
  };

  const uploadHandleChange = (e, name) => {
    setAbout({
      ...about,
      [name]: e.target.files[0],
    });

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPicturePreview({
          [name]: reader.result,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    const formData = new FormData();
    formData.append(name, e.target.files[0]);
    dispatch(updateCardPicture(formData, name, id));
  };

  const removePicture = (name) => {
    dispatch(updateCard({ ...about, [name]: "" }, id));
  };

  const submit = (e) => {
    e.preventDefault();

    dispatch(updateCard(about, id));
  };

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
          <div className="w-50">
            <Input
              label="Card Title"
              name="title"
              value={about.title}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <Uploaders
            picture1={{
              name: "cardDP",
              picture: picturePreview.cardDP,
            }}
            picture2={{
              name: "coverDP",
              picture: picturePreview.coverDP,
            }}
            picture3={{
              name: "companyDP",
              picture: picturePreview.companyDP,
            }}
            uploadhandle={uploadHandleChange}
            handleRemovePicture={removePicture}
          />

          <div className="card_color py-5">
            <p className="f12 fw500 opacity-75 mb-3">Card Color</p>
            <div className="d-flex align-items-center gap-5">
              <label htmlFor="colorChange">
                <input
                  type="color"
                  name="cardColor"
                  value={about.cardColor}
                  style={{ opacity: 0, position: "absolute" }}
                  onChange={(e) => handleChange(e)}
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
              <div className="d-flex align-items-center gap-5">
                {colorBoxes.map((box, index) => (
                  <div
                    className="pointer position-relative"
                    key={index}
                    onClick={() => {
                      setActive(hexToRgb(box.code));
                      handleChange({
                        target: {
                          name: "cardColor",
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

          <div className="personal_details row gy-5">
            {inputs.map((content, i) => {
              return (
                <div
                  key={i}
                  className={`${content.name === "bio" ? "col-12" : "col-6"}`}
                >
                  <Input
                    label={content.label}
                    name={content.name}
                    value={about[content.name]}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              );
            })}
            <div className="col-12 d-flex justify-content-end actions d-flex gap-3">
              {/* <div>Cancel</div> */}
              <button
                disabled={
                  JSON.stringify(card) === JSON.stringify(about) ? true : false
                }
              >
                Update
              </button>
            </div>
          </div>
        </form>
        <div className="preview">
          <Preview about={about} />
        </div>
      </div>
    </Layout>
  );
};

export default About;
