import React from "react";
import Modal from "../snippet/Modal";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Problem2 = () => {
  const [data, setData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (hasMore) {
      axios
        .get(`https://contact.mediusware.com/api/contacts/?page=${index}`)
        .then((res) => {
          setData((prevItems) => [...prevItems, ...res.data.results]);
          res.data.results.length > 0 ? setHasMore(true) : setHasMore(false);
        })
        .catch((err) => console.log(err));
    } else {
      null;
    }

    setIndex((prevIndex) => prevIndex + 1);
  };

  const handleScroll = () => {
    if (scrollPosition > 10 && hasMore) {
      fetchMoreData();
    } else {
      setScrollPosition((prev) => prev + 1);
      console.log(scrollPosition);
    }
  };

  const [index, setIndex] = useState(2);

  useEffect(() => {
    axios
      .get(`https://contact.mediusware.com/api/contacts/?page=1`)
      .then(function (response) {
        setData(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [modalA, setModalA] = useState(false);
  const [modalB, setModalB] = useState(false);
  const [modalC, setModalC] = useState(false);
  const [iseven, setIsEven] = useState(false);
  const [number, setNumber] = useState("");
  const [details, setDetails] = useState({ id: "", phone: "" });

  return (
    <div className="container">
      <Modal
        onClose={!modalA}
        show={modalA}
        onScroll={hasMore ? handleScroll : null}
      >
        <div className="mb-3">
          <div className="button-container">
            <button
              onClick={() => {
                setModalB(false);
                setModalA(true);
                setIsEven(false);
              }}
              className="button-a"
            >
              All Contacts
            </button>
            <button
              onClick={() => {
                setModalB(true);
                setIsEven(false);
                setModalA(false);
              }}
              className="button-b"
            >
              US Contacts
            </button>
            <button onClick={() => setModalA(false)} className="button-c">
              Close
            </button>
          </div>
          <div
            style={{
              display: "flex",
              placeItems: "center",
              placeContent: "center",
            }}
            className="flex flex-row"
          >
            <h6
              style={{
                marginTop: "7px",
                marginRight: "10px",
              }}
            >
              Generate with even ID
            </h6>
            <input
              style={{
                padding: "10px",
              }}
              value={iseven}
              type="checkbox"
              onChange={() => {
                setIsEven(false);
                setIsEven(!iseven);
              }}
            />
          </div>
        </div>
        <div>
          <input
            placeholder="Input Number or Country Name"
            onChange={(e) => setNumber(e.target.value)}
            className="text-black mb-4 text-3xl p-2 rounded-lg border-solid border-2 border-slate-800"
          />
        </div>

        <div className="space-y-2">
          {data
            .filter(function (value) {
              if (iseven) {
                return value.id % 2 === 0;
              } else {
                return value;
              }
            })
            .filter((value) => {
              if (number == "") {
                return value;
              } else if (
                value.phone.toLowerCase().includes(number.toLowerCase()) ||
                value.country.name.toLowerCase().includes(number.toLowerCase())
              ) {
                return value;
              } else if (number == "" || number == null) {
                return value;
              }
            })
            .map((data) => (
              <div
                onClick={() => {
                  setDetails({ id: data.id, phone: data.phone });
                  setModalC(true);
                }}
                className="mb-4 p-4 bg-white rounded-md"
                key={data.id}
              >
                <h6>ID: {data.id}</h6>
                <h6>Country: {data.country.name}</h6>
                <h6>Phone: {data.phone}</h6>
              </div>
            ))}
        </div>
      </Modal>
      <Modal
        onScroll={hasMore ? handleScroll : null}
        onClose={!modalB}
        show={modalB}
      >
        <div className="mb-3">
          <div className="button-container">
            <button
              onClick={() => {
                setModalB(false);
                setModalA(true);
              }}
              className="button-a"
            >
              All Contacts
            </button>
            <button
              onClick={() => {
                setModalB(true);
                setModalA(false);
              }}
              className="button-b"
            >
              US Contacts
            </button>
            <button onClick={() => setModalB(false)} className="button-c">
              Close
            </button>
          </div>
          <div
            style={{
              display: "flex",
              placeItems: "center",
              placeContent: "center",
            }}
            className="flex flex-row"
          >
            <h6
              style={{
                marginTop: "7px",
                marginRight: "10px",
              }}
            >
              Generate with even ID
            </h6>
            <input
              style={{
                padding: "10px",
              }}
              value={iseven}
              type="checkbox"
              onChange={() => {
                setIsEven(false);
                setIsEven(!iseven);
              }}
            />
          </div>
        </div>
        <div>
          <input
            placeholder="Input Phone Number"
            onChange={(e) => setNumber(e.target.value)}
            className="text-black mb-4 text-3xl p-2 rounded-lg border-solid border-2 border-slate-800"
          />
        </div>
        <div className="space-y-2">
          {data
            .filter(function (value) {
              if (iseven) {
                return value.id % 2 === 0;
              } else {
                return value;
              }
            })
            .filter((value) => {
              if (number == "") {
                return value;
              } else if (
                value.phone.toLowerCase().includes(number.toLowerCase()) ||
                value.country.name.toLowerCase().includes(number.toLowerCase())
              ) {
                return value;
              } else if (number == "" || number == null) {
                return value;
              }
            })
            .filter(({ country }) => country.name == "United States")
            .map((data) => (
              <div
                onClick={() => {
                  setDetails({ id: data.id, phone: data.phone });
                  setModalC(true);
                }}
                className="mb-4 p-4 bg-white rounded-md"
                key={data.id}
              >
                <h6>ID: {data.id}</h6>
                <h6>Country: {data.country.name}</h6>
                <h6>Phone: {data.phone}</h6>
              </div>
            ))}
        </div>
      </Modal>
      <Modal onClose={!modalC} show={modalC}>
        <div className="mb-3">
          <div className="button-container">
            <button
              onClick={() => {
                setIsEven(false);
                setModalB(false);
                setModalA(true);
                setModalC(false);
              }}
              className="button-a"
            >
              All Contacts
            </button>
            <button
              onClick={() => {
                setModalB(true);
                setModalA(false);
                setModalC(false);
                setIsEven(false);
              }}
              className="button-b"
            >
              US Contacts
            </button>
            <button onClick={() => setModalC(false)} className="button-c">
              Close
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="mb-4 p-4 bg-white rounded-md" key={data.id}>
            <h6>ID: {details.id}</h6>
            <h6>Phone: {details.phone}</h6>
          </div>
        </div>
      </Modal>
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => setModalA(true)}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <button
            onClick={() => setModalB(true)}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
