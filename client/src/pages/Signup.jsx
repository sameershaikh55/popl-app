import React, { Fragment, useEffect, useRef, useState } from "react";
import lock from "../assets/icons/lock.svg";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { registeration, clearErrors } from "../redux/action/auth";
import SmallLoader from "../components/SmallLoader";
import { Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const userState = useSelector((state) => state.user);

  const cardDP = useRef(null);
  const [cardDPPreview, setCardDPPreview] = useState("");
  const [step, setStep] = useState(1);
  const [loginHandle, setLoginHandle] = useState({
    email: "",
    password: "",
    name: "",
    jobTitle: "",
    company: "",
    phone: "",
    cardDP: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "cardDP") {
      setLoginHandle({
        ...loginHandle,
        cardDP: e.target.files[0],
      });

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCardDPPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setLoginHandle({ ...loginHandle, [e.target.name]: e.target.value });
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", loginHandle.email);
    formData.append("password", loginHandle.password);
    formData.append("name", loginHandle.name);
    formData.append("jobTitle", loginHandle.jobTitle);
    formData.append("company", loginHandle.company);
    formData.append("phone", loginHandle.phone);
    formData.append("cardDP", loginHandle.cardDP);

    dispatch(registeration(formData));
  };

  useEffect(() => {
    const savedState = sessionStorage.getItem("step");
    if (savedState) {
      setStep(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    if (step !== 1) {
      sessionStorage.setItem("step", JSON.stringify(step));
    }
  }, [step]);

  useEffect(() => {
    if (userState.error) {
      userState.error && alert.error(userState.error);
      dispatch(clearErrors());
    }

    if (userState.isAuthenticated) {
      alert.success("Registered successfully");
    }
  }, [dispatch, alert, userState.error, userState.isAuthenticated]);

  const fields = [
    {
      step: 1,
      fields: [
        {
          label: "Email",
          name: "email",
          type: "text",
        },
        {
          label: "Password",
          name: "password",
          type: "",
        },
      ],
    },
    {
      step: 2,
      fields: [
        {
          label: "Name",
          name: "name",
          type: "text",
        },
        {
          label: "Phone Number",
          name: "phone",
          type: "number",
        },
      ],
    },
    {
      step: 3,
      fields: [
        {
          label: "Job Title",
          name: "jobTitle",
          type: "text",
        },
        {
          label: "Company",
          name: "company",
          type: "text",
        },
      ],
    },
    {
      step: 4,
      fields: [
        {
          label: "Profile Photo",
          name: "cardDP",
        },
      ],
    },
  ];

  return (
    <Fragment>
      <div className="login_container">
        <div className="login-left">
          <div className="steps_container d-flex justify-content-between w-100">
            <div className="d-flex justify-content-start">
              <button
                onClick={() => {
                  if (step !== 1) {
                    setStep(step - 1);
                  }
                }}
                className="bg-transparent text-start border-0 fw600 p-0 h-100"
              >
                &#8592; Go back
              </button>
            </div>
            <ul className="d-flex list-unstyled gap-3 mb-0">
              {[1, 2, 3, 4].map((content, i) => {
                return (
                  <li
                    className={`px-3 ${
                      step === content
                        ? "border-bottom border-dark border-3"
                        : ""
                    }`}
                    key={i}
                  >
                    {content}
                  </li>
                );
              })}
            </ul>
          </div>

          <form onSubmit={submit} className="inner-left d-flex flex-column">
            <div>
              <p className="mt-3 f14"></p>
            </div>

            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between">
                <h5 className="opacity-50 fw600">| Create your first card</h5>
              </div>

              <p className="mb-4 opacity-75">
                Get started with the #1 Digital Business Card Platform
              </p>

              {fields.map((content) => {
                if (content.step === step) {
                  return content.fields.map((item) => {
                    if (step == 4) {
                      return (
                        <div className="row gy-3">
                          <label className="col-12" htmlFor="cardDP">
                            Profile Photo
                          </label>
                          <div className="col-12">
                            <div className="row gy-3">
                              {loginHandle.cardDP && (
                                <div className="col-6">
                                  <img
                                    className="w-100 rounded-3"
                                    src={cardDPPreview}
                                    alt="cardDP"
                                  />
                                </div>
                              )}
                              <div className={`${"col-12"}`}>
                                <input
                                  ref={cardDP}
                                  type="file"
                                  className="form-control"
                                  id="customFile"
                                  accept="image/*"
                                  name="cardDP"
                                  onChange={(e) => handleChange(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <Input
                          label={item.label}
                          icon={item.name === "password" && lock}
                          name={item.name}
                          type={item.type}
                          value={loginHandle[item.name]}
                          onChange={(e) => handleChange(e)}
                        />
                      );
                    }
                  });
                }
              })}

              <div className="d-flex flex-column">
                {(step !== 4 && (
                  <div
                    onClick={() => setStep(step + 1)}
                    className="rounded-pill btn-lg text-white border-0 w-100 text-center color1 py-3 fw-bold bg-black pointer"
                  >
                    continue
                  </div>
                )) || (
                  <button
                    disabled={userState.loading ? true : false}
                    type="submit"
                    className="rounded-pill btn-lg text-white border-0 w-100 text-center color1 py-1 fw-bold"
                  >
                    {userState.loading ? <SmallLoader /> : "Sign up"}
                  </button>
                )}

                <div className="d-flex justify-content-center f14 gap-2">
                  <p className="opacity-75 p-0 h-100">Have Popl?</p>
                  <Link
                    to="/login"
                    className="bg-transparent opacity-75 border-0 p-0 h-100 pointer text-primary"
                  >
                    login
                  </Link>
                </div>
              </div>
            </div>

            <p className="f14">@2022 - All rights reserved</p>
          </form>
        </div>

        <div className="login-right">
          <img
            className="w-100"
            src="https://dash.popl.co/assets/img/generals/onboardingasset.png"
            alt=""
          />
          <div className="trusted_by">
            <h5 className="fw600 mb-4 text-center">Trusted By</h5>
            <img
              className="w-100"
              src="https://dash.popl.co/assets/img/generals/trustedBy.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
