import React from "react";
import Checkbox from "../components/Checkbox";
import card_pic from "../assets/images/card_pic.png";
import mobileIcon from "../assets/icons/mobileIcon.svg";
import contactIcon from "../assets/icons/contact.svg";

const Connections = () => {
  return (
    <div className="connections_container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 header">
            <div className="d-flex align-items-end gap-3">
              <h5 className="mb-0 fw-normal">Connections</h5>
              <p className="opacity-75 f14">(5)</p>
            </div>
          </div>
          <div className="col-12">
            <div className="connection_table_container">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <div className="select_all">
                        <Checkbox label="Select all" />
                      </div>
                    </th>
                    <th className="align-middle f12 opacity-75 fw-semibold">
                      Connection
                    </th>
                    <th className="text-center align-middle f12 opacity-75 fw-semibold">
                      Tag
                    </th>
                    <th className="text-center align-middle f12 opacity-75 fw-semibold">
                      Connected with
                    </th>
                    <th className="text-center align-middle f12 opacity-75 fw-semibold">
                      Type
                    </th>
                    <th className="text-center align-middle f12 opacity-75 fw-semibold">
                      Date
                    </th>
                    <th className="text-center align-middle f12 opacity-75 fw-semibold">
                      Export
                    </th>
                  </tr>
                </thead>
                <div className="py-1"></div>
                <tbody>
                  {[1, 1, 1, 1, 1].map((_, i) => (
                    <>
                      <tr key={i}>
                        <td style={{ width: "100px" }}>
                          <div className="d-flex align-items-center checkbox_image">
                            <Checkbox />
                            <img
                              style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                              }}
                              src="https://firebasestorage.googleapis.com/v0/b/poplco.appspot.com/o/photos%2F37-icon-1637268835508561762.jpg?alt=media"
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column justify-content-center">
                            <p className="fw-semibold">Nick - COO of Popl</p>
                            <p className="f12 opacity-75 mb-0">nick@popl.co</p>
                          </div>
                        </td>
                        <td style={{ width: "350px" }}></td>
                        <td
                          style={{ width: "150px" }}
                          className="text-center align-middle"
                        >
                          <img
                            style={{ width: "32px", height: "32px" }}
                            src={card_pic}
                            alt=""
                          />
                        </td>
                        <td
                          style={{ width: "150px" }}
                          className="text-center align-middle"
                        >
                          <img src={mobileIcon} alt="" />
                        </td>
                        <td
                          style={{ width: "150px" }}
                          className="f12 opacity-75 text-center align-middle fw-semibold"
                        >
                          Apr 29, 2023
                        </td>
                        <td
                          style={{ width: "150px" }}
                          className="text-center align-middle"
                        >
                          <button className="export">
                            <img src={contactIcon} alt="" />
                          </button>
                        </td>
                      </tr>
                      <tr className="gap_tr"></tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
