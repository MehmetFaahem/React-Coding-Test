import React, { useState } from "react";
import { useEffect } from "react";

const Problem1 = () => {
  const [Users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const [show, setShow] = useState("all");

  //   useEffect(() => {
  //     setUsers((pre) => pre);
  //   }, [Users.length]);

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    console.log(Users);
    let arr = [...Users];
    const value = {
      name,
      status,
    };

    arr.push(value);
    setUsers(arr);
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form className="row gy-2 gx-3 align-items-center mb-4">
            <div className="col-auto">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                value={status}
                type="text"
                className="form-control"
                placeholder="Status"
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {Users.filter(({ status }) =>
                show !== "all" ? status.toLowerCase() == show : status
              ).map(function (data, key) {
                return (
                  <tr key={key}>
                    <td>{data.name}</td>
                    <td>{data.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
