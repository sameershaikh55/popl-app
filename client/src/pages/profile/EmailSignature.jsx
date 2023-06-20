import React, { useEffect, useState } from "react";
import Layout from "../../layout/ProfileLayout";
import Uploaders from "../../components/Uploaderstwo";
import Input from "../../components/Input";
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
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GET_CARD_SUCCESS } from "../../redux/type/card";

const EmailSignature = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [picturePreview, setPicturePreview] = useState({
    profile: "",
    company: "",
    popCode: "",
  });
  const [emailSignature, setEmailSignature] = useState({
    name: "",
    location: "",
    jobTitle: "",
    company: "",
    phone: "",
    emailSignature: {
      profile: "",
      company: "",
      popCode: "",
    },
  });

  const pictureURL = process.env.REACT_APP_PICTURE_URL;
  const placeholderPicture = process.env.REACT_APP_PLACEHOLDER_DP;

  const { card, loading, error } = useSelector((state) => state.card);

  useEffect(() => {
    if (!Object.keys(card).length) {
      dispatch(getCard(id));
    }
  }, [id]);

  const inputs = [
    {
      label: "Name",
      name: "name",
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
      label: "Phone number",
      name: "phone",
    },
    {
      label: "Location",
      name: "location",
    },
  ];

  useEffect(() => {
    setPicturePreview({
      profile:
        card.emailSignature && card.emailSignature.profile
          ? pictureURL + card.emailSignature.profile
          : null,
      company:
        card.emailSignature && card.emailSignature.company
          ? pictureURL + card.emailSignature.company
          : null,
      popCode:
        card.emailSignature && card.emailSignature.popCode
          ? pictureURL + card.emailSignature.popCode
          : null,
    });

    setEmailSignature({ ...card });
  }, [card]);

  const handleChange = (e) => {
    setEmailSignature({
      ...emailSignature,
      [e.target.name]: e.target.value,
    });
  };

  const uploadHandleChange = (e, name) => {
    setEmailSignature({
      ...emailSignature,
      emailSignature: {
        [name]: e.target.files[0],
      },
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
    dispatch(
      updateCard(
        { ...card, emailSignature: { ...card.emailSignature, [name]: "" } },
        id
      )
    );
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
    <Layout className="email_signature_container about_container">
      <div className="content_flex d-flex">
        <div className="card_ pt-5">
          <h6>Email Signature</h6>

          <Uploaders
            picture1={{
              name: "profile",
              picture: picturePreview.profile,
            }}
            picture2={{
              name: "company",
              picture: picturePreview.company,
            }}
            picture3={{
              name: "popCode",
              picture: picturePreview.popCode,
            }}
            uploadhandle={uploadHandleChange}
            handleRemovePicture={removePicture}
          />

          <div className="d-flex flex-column gap-4 mt-5">
            {inputs.map((content) => {
              return (
                <Input
                  label={content.label}
                  name={content.name}
                  value={emailSignature[content.name]}
                  onChange={(e) => handleChange(e)}
                />
              );
            })}
          </div>
        </div>
        <div className="preview">
          <p className="fw500 text-center f12">Signature Preview</p>

          <div className="d-flex flex-column align-items-center justify-content-center h-100 px-5">
            <div className="card w-100 px-5 py-5">
              <div className="row align-items-center">
                <div className="col-7 f14">
                  <div className="email_signature_profile mb-1">
                    <img
                      className="company_pic"
                      src={
                        (card.companyDP && pictureURL + card.companyDP) ||
                        placeholderPicture
                      }
                      alt=""
                    />

                    <img
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "cover",
                      }}
                      src={picturePreview.profile && picturePreview.profile}
                      className="profile_pic"
                      alt=""
                    />
                  </div>
                  <p className="f18 fw600">{emailSignature.name}</p>
                  {emailSignature.jobTitle} <br />
                  {emailSignature.company} <br />
                  <p className="f14">{emailSignature.phone}</p>
                  <p className="f14">{emailSignature.location}</p>
                  My Digital Business Card
                </div>
                <div className="col-5">
                  <div className="scanner_container position-relative d-flex justify-content-center">
                    <svg
                      shape-rendering="crispEdges"
                      height="200"
                      width="200"
                      viewBox="0 0 33 33"
                    >
                      <path fill="#fff" d="M0,0 h33v33H0z"></path>
                      <path
                        fill={`rgb(${
                          emailSignature &&
                          emailSignature.popCode &&
                          emailSignature.popCode.codeColor
                        })`}
                        d="M0 0h7v1H0zM8 0h3v1H8zM12 0h3v1H12zM18 0h2v1H18zM23 0h2v1H23zM26,0 h7v1H26zM0 1h1v1H0zM6 1h1v1H6zM8 1h1v1H8zM11 1h1v1H11zM13 1h1v1H13zM15 1h2v1H15zM18 1h2v1H18zM22 1h1v1H22zM24 1h1v1H24zM26 1h1v1H26zM32,1 h1v1H32zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM8 2h1v1H8zM12 2h1v1H12zM14 2h1v1H14zM17 2h1v1H17zM20 2h2v1H20zM23 2h2v1H23zM26 2h1v1H26zM28 2h3v1H28zM32,2 h1v1H32zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM9 3h2v1H9zM14 3h1v1H14zM17 3h3v1H17zM22 3h2v1H22zM26 3h1v1H26zM28 3h3v1H28zM32,3 h1v1H32zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM9 4h1v1H9zM14 4h2v1H14zM18 4h1v1H18zM20 4h1v1H20zM23 4h1v1H23zM26 4h1v1H26zM28 4h3v1H28zM32,4 h1v1H32zM0 5h1v1H0zM6 5h1v1H6zM8 5h2v1H8zM11 5h1v1H11zM13 5h2v1H13zM16 5h6v1H16zM26 5h1v1H26zM32,5 h1v1H32zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14 6h1v1H14zM16 6h1v1H16zM18 6h1v1H18zM20 6h1v1H20zM22 6h1v1H22zM24 6h1v1H24zM26,6 h7v1H26zM8 7h1v1H8zM11 7h1v1H11zM14 7h1v1H14zM16 7h2v1H16zM19 7h4v1H19zM24 7h1v1H24zM2 8h3v1H2zM6 8h1v1H6zM8 8h3v1H8zM15 8h1v1H15zM17 8h2v1H17zM21 8h2v1H21zM25 8h3v1H25zM30,8 h3v1H30zM1 9h1v1H1zM3 9h2v1H3zM7 9h3v1H7zM11 9h1v1H11zM16 9h4v1H16zM21 9h1v1H21zM23 9h1v1H23zM25 9h2v1H25zM29 9h1v1H29zM32,9 h1v1H32zM0 10h4v1H0zM5 10h2v1H5zM9 10h5v1H9zM18 10h1v1H18zM20 10h1v1H20zM24 10h4v1H24zM29 10h1v1H29zM31 10h1v1H31zM0 11h2v1H0zM4 11h1v1H4zM7 11h1v1H7zM9 11h1v1H9zM11 11h1v1H11zM13 11h1v1H13zM15 11h4v1H15zM21 11h1v1H21zM23 11h1v1H23zM29 11h2v1H29zM0 12h3v1H0zM4 12h1v1H4zM6 12h1v1H6zM9 12h1v1H9zM11 12h1v1H11zM13 12h2v1H13zM17 12h2v1H17zM21 12h1v1H21zM23 12h3v1H23zM28 12h1v1H28zM30 12h1v1H30zM0 13h1v1H0zM2 13h1v1H2zM8 13h4v1H8zM20 13h1v1H20zM23 13h2v1H23zM26 13h1v1H26zM29 13h1v1H29zM32,13 h1v1H32zM0 14h5v1H0zM6 14h1v1H6zM9 14h1v1H9zM12 14h4v1H12zM18 14h2v1H18zM22 14h1v1H22zM26 14h1v1H26zM29 14h1v1H29zM31 14h1v1H31zM0 15h1v1H0zM3 15h1v1H3zM8 15h4v1H8zM14 15h1v1H14zM17 15h2v1H17zM21 15h2v1H21zM26 15h2v1H26zM29 15h3v1H29zM0 16h2v1H0zM5 16h4v1H5zM10 16h2v1H10zM13 16h2v1H13zM16 16h1v1H16zM18 16h2v1H18zM25 16h1v1H25zM27 16h2v1H27zM0 17h1v1H0zM9 17h1v1H9zM14 17h1v1H14zM16 17h4v1H16zM21 17h1v1H21zM23 17h2v1H23zM32,17 h1v1H32zM0 18h1v1H0zM4 18h3v1H4zM9 18h2v1H9zM12 18h1v1H12zM14 18h2v1H14zM17 18h2v1H17zM20 18h1v1H20zM27 18h1v1H27zM30 18h1v1H30zM3 19h2v1H3zM7 19h1v1H7zM10 19h1v1H10zM12 19h1v1H12zM14 19h1v1H14zM17 19h1v1H17zM19 19h8v1H19zM29 19h2v1H29zM0 20h1v1H0zM3 20h4v1H3zM10 20h3v1H10zM14 20h3v1H14zM18 20h2v1H18zM22 20h1v1H22zM25 20h1v1H25zM27 20h3v1H27zM31 20h1v1H31zM0 21h1v1H0zM2 21h2v1H2zM5 21h1v1H5zM9 21h2v1H9zM12 21h3v1H12zM19 21h3v1H19zM23 21h1v1H23zM26 21h1v1H26zM29 21h1v1H29zM32,21 h1v1H32zM0 22h1v1H0zM2 22h2v1H2zM5 22h3v1H5zM10 22h1v1H10zM14 22h1v1H14zM17 22h2v1H17zM20 22h1v1H20zM24 22h1v1H24zM27 22h1v1H27zM29 22h1v1H29zM0 23h1v1H0zM4 23h1v1H4zM7 23h3v1H7zM11 23h3v1H11zM16 23h3v1H16zM21 23h2v1H21zM24 23h1v1H24zM27 23h1v1H27zM29,23 h4v1H29zM0 24h1v1H0zM2 24h2v1H2zM6 24h1v1H6zM8 24h2v1H8zM11 24h1v1H11zM14 24h2v1H14zM19 24h1v1H19zM22 24h8v1H22zM31,24 h2v1H31zM8 25h1v1H8zM10 25h2v1H10zM14 25h1v1H14zM18 25h1v1H18zM20 25h1v1H20zM22 25h1v1H22zM24 25h1v1H24zM28,25 h5v1H28zM0 26h7v1H0zM9 26h1v1H9zM12 26h1v1H12zM17 26h1v1H17zM19 26h2v1H19zM22 26h3v1H22zM26 26h1v1H26zM28 26h2v1H28zM31 26h1v1H31zM0 27h1v1H0zM6 27h1v1H6zM9 27h2v1H9zM12 27h1v1H12zM14 27h3v1H14zM20 27h1v1H20zM23 27h2v1H23zM28,27 h5v1H28zM0 28h1v1H0zM2 28h3v1H2zM6 28h1v1H6zM8 28h1v1H8zM13 28h1v1H13zM17 28h2v1H17zM21 28h2v1H21zM24 28h5v1H24zM31,28 h2v1H31zM0 29h1v1H0zM2 29h3v1H2zM6 29h1v1H6zM8 29h5v1H8zM14 29h1v1H14zM19 29h3v1H19zM25 29h1v1H25zM28 29h3v1H28zM32,29 h1v1H32zM0 30h1v1H0zM2 30h3v1H2zM6 30h1v1H6zM8 30h3v1H8zM14 30h1v1H14zM18 30h2v1H18zM21 30h3v1H21zM25 30h2v1H25zM30 30h1v1H30zM0 31h1v1H0zM6 31h1v1H6zM9 31h2v1H9zM13 31h2v1H13zM17 31h3v1H17zM25 31h3v1H25zM29 31h2v1H29zM0 32h7v1H0zM9 32h1v1H9zM11 32h1v1H11zM14 32h1v1H14zM17 32h1v1H17zM19 32h2v1H19zM23 32h3v1H23zM31 32h1v1H31z"
                      ></path>
                    </svg>{" "}
                    <img
                      src={
                        (picturePreview.popCode && picturePreview.popCode) ||
                        placeholderPicture
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailSignature;
