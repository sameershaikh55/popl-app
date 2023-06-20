import React, { useEffect } from "react";
import add from "../assets/icons/add.svg";
import search from "../assets/icons/getDevice.svg";
import device from "../assets/icons/getDevice.svg";
import card_bg from "../assets/images/card_bg.png";
import edit from "../assets/icons/edit.svg";
import share from "../assets/icons/share.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allCards, clearErrors } from "../redux/action/card";
import { useAlert } from "react-alert";
import Loader from "../components/Loader";

const Dashboard = () => {
  const pictureURL = process.env.REACT_APP_PICTURE_URL;
  const placeholderPicture = process.env.REACT_APP_PLACEHOLDER_DP;

  useEffect(() => {
    sessionStorage.setItem("step", 1);
  }, []);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { cards, error, loading } = useSelector((state) => state.card);

  useEffect(() => {
    if (!cards.length) {
      dispatch(allCards());
    }
  }, []);

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
    <div className="dashboard_container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 header">
            <div className="row">
              <div className="col-7 d-flex align-items-center gap-3">
                <h5 className="mb-0 fw-normal">My Cards</h5>
                <button className="add_btn">
                  <img src={add} alt="" />
                </button>
              </div>
              <div className="col-5 d-flex">
                <div className="inp_container w-100 h-100">
                  <img src={search} alt="" />
                  <input
                    className="w-100 h-100 border-0 border-pill"
                    type="text"
                    name=""
                    id=""
                    placeholder="Search..."
                  />
                </div>
                <button className="get_devices_btn d-flex justify-content-center align-items-center gap-2">
                  <img src={device} alt="" />
                  Get Tap.in Devices
                </button>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-12 px-5">
                <div className="row">
                  <div className="col-12 body">
                    <div className="row">
                      {cards.map((content, i) => {
                        return (
                          <div key={i} className="col-4 h-100">
                            <div className="card_container w-100 h-100">
                              <img className="bg w-100" src={card_bg} alt="" />
                              <div className="card_body d-flex flex-column align-items-center">
                                <div className="card_pic">
                                  <img
                                    src={
                                      (content.cardDP &&
                                        pictureURL + content.cardDP) ||
                                      placeholderPicture
                                    }
                                    alt=""
                                  />
                                </div>
                                <h5 className="text-center mb-1 f18">
                                  {content.title || content.name}
                                </h5>
                                <p className="text-center mb-2 opacity-75 f14">
                                  {content.jobTitle} at {content.company}
                                </p>
                                <div className="actions d-flex gap-3">
                                  <Link
                                    to={`/profile/${content._id}/content`}
                                    className="text-decoration-none"
                                  >
                                    <button className="d-flex align-items-center gap-1">
                                      <img src={edit} alt="" />
                                      Edit Card
                                    </button>
                                  </Link>
                                  <button className="d-flex align-items-center gap-1">
                                    <img src={share} alt="" />
                                    Share Card
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <div className="col-4 h-100">
                        <div className="card_container h-100 w-100 d-flex justify-content-center align-items-center">
                          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                            <button className="add_btn">
                              <img src={add} alt="" />
                            </button>
                            <p className="mb-0 f18 fw-semibold opacity-75">
                              Create New Card
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
