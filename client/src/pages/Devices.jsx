import React from "react";

const Devices = () => {
  return (
    <div className="devices_container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 header">
            <div className="d-flex align-items-center gap-3">
              <h5 className="mb-0 fw-normal">Devices</h5>
              <p className="opacity-75 f14">0</p>
            </div>
          </div>
          <div className="col-12">
            <div className="upper_get_activate_devices">
              <div className="get_activate_devices">
                <div className="row_">
                  <div className="col-6_">
                    <img
                      src="https://dash.popl.co/assets/img/popls/buyPopl.svg"
                      alt=""
                    />
                    <div className="body">
                      <h6 className="mb-3 fw-semibold">Get Popl Devices</h6>
                      <p className="f12">
                        Don’t have any devices? <br /> Purchase them here.
                      </p>
                      <button>Get Devices</button>
                    </div>
                  </div>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        borderLeft: "1px solid rgb(0, 0, 0)",
                        height: "264px",
                        opacity: 0.1,
                        width: "10px",
                      }}
                    ></div>
                  </div>
                  <div className="col-6_">
                    <img
                      src="https://dash.popl.co/assets/img/popls/activatePopl.svg"
                      alt=""
                    />
                    <div className="body">
                      <h6 className="mb-3 fw-semibold">
                        Activate Popl Devices
                      </h6>
                      <p className="f12">
                        If you have all the devices you need, simply activate
                        them here.
                      </p>
                      <button>Activate Devices</button>
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

export default Devices;
