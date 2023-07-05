import React, { useEffect, useState } from "react";
import Layout from "../../layout/ProfileLayout";
import add from "../../assets/icons/addw.svg";
import Switch from "../../components/Switch";
import Preview from "../../components/Preview";
import AddContent from "../../components/AddContent";
import AddSocialForm from "../../components/AddSocialForm";
import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useAlert } from "react-alert";
import { clearErrors, getCard } from "../../redux/action/card";
import { useParams } from "react-router-dom";

const Content = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [register, setRegister] = useState(false);
  const [register1, setRegister1] = useState(false);
  const [active, setActive] = useState();
  const [added, setAdded] = useState([]);

  const { card, error, loading } = useSelector((state) => state.card);

  useEffect(() => {
    dispatch(getCard(id));
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const onSubmit = (data) => {
    setAdded([
      ...added,
      {
        ...data,
        isActive: true,
      },
    ]);

    sessionStorage.setItem(
      "added",
      JSON.stringify([
        ...added,
        {
          ...data,
          isActive: true,
        },
      ])
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout className="content_container">
      {register && (
        <Modal register={register} setRegister={setRegister}>
          <AddContent
            setRegister1={setRegister1}
            active={active}
            setActive={setActive}
          />
        </Modal>
      )}
      {register1 && (
        <Modal register={register1} setRegister={setRegister1}>
          <AddSocialForm
            setRegister={setRegister}
            setRegister1={setRegister1}
            active={active}
            onSubmit={onSubmit}
            added={added}
          />
        </Modal>
      )}

      <div className="content_flex d-flex">
        <div className="contacts">
          <div className="d-flex justify-content-end">
            <button
              onClick={() => setRegister(true)}
              className="add_btn d-flex align-items-center justify-content-center gap-2 px-3"
            >
              <img src={add} alt="" />
              Add Links and Contact Info
            </button>
          </div>
          <br />
          <div className="social_list d-flex flex-column w-100 gap-2">
            {"social" in card &&
              card.social.map((content, i) => {
                return (
                  <div
                    className="social_card d-flex justify-content-between align-items-center"
                    key={i}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img src={content.socialIcon} alt="" />
                      <p className="mb-0 fw500">{content.socialName}</p>
                    </div>
                    <div>
                      <Switch content={content} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="preview">
          <Preview about={card} added={added} />
        </div>
      </div>
    </Layout>
  );
};

export default Content;
