import React, { useEffect, useState } from "react";
import back from "../assets/icons/back.svg";
import Preview from "../components/Preview";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateCardSocial } from "../redux/action/card";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

const AddSocialForm = ({
  setRegister,
  setRegister1,
  onSubmit,
  active,
  added,
}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { card, error, success, loading } = useSelector((state) => state.card);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phoneNumber: "",
    linkTitle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    dispatch(
      updateCardSocial(
        { ...formData, socialName: active.text, socialIcon: active.icon },
        id
      )
    );

    onSubmit(active);
    setRegister(true);
    setRegister1(false);
  };

  const inputs = [
    { label: "Email", name: "email" },
    { label: "Username", name: "username" },
    { label: "Link title", name: "linkTitle" },
    { label: "Phone Number", name: "phoneNumber" },
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, success]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="add_social_form_container">
      <button
        onClick={() => {
          setRegister(true);
          setRegister1(false);
        }}
        className="back_btn bg-transparent border-0 f12 opacity-75 fw500"
      >
        <img style={{ width: "25px" }} src={back} alt="" />
        Back
      </button>

      <div className="d-flex mt-3">
        <div className="add_content_form">
          <div className="d-flex align-items-center gap-3">
            <img
              style={{ width: "66px", height: "66px" }}
              src={active.icon}
              alt=""
            />
            {/* <p style={{ color: "#29AEF8" }} className="f12 fw500">
              Select photo here or drag and drop <br /> one in place of current
            </p> */}
            <p className="f12">{active.text}</p>
          </div>
          <br />
          <form onSubmit={submit} className="mt-3">
            {inputs.map((input, index) => (
              <div key={index}>
                <Input
                  label={input.label}
                  type="text"
                  name={input.name}
                  value={formData[input.name]}
                  onChange={handleChange}
                />
                <br />
                <br />
              </div>
            ))}
            <div className="actions d-flex justify-content-end gap-3 mt-4">
              <button
                onClick={() => {
                  setRegister(true);
                  setRegister1(false);
                }}
              >
                Cancel
              </button>
              <button type="submit">Add link</button>
            </div>
          </form>
        </div>
        <div className="preview">
          <Preview noLink about={card} added={added} />
        </div>
      </div>
    </div>
  );
};

export default AddSocialForm;
