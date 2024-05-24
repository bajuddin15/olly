// MarketingPlanModal.jsx
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const EmailMarketingModal = () => {
  const history = useHistory();
  const [industry, setIndustry] = useState("");
  const [idealCustomer, setIdealCustomer] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [objective, setObjective] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [disableCreateBtn, setDisableCreateBtn] = useState(true);

  const [industries, setIndustries] = React.useState([
    "B2B SaaS",
    "B2B Service",
    "Ecommerce",
    "B2C",
  ]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCreate = () => {
    const data = {
      industry,
      idealCustomer,
      problem,
      solution,
      objective,
    };
    console.log({ data });
    history.push("/email", data);
  };

  useEffect(() => {
    if (industry && idealCustomer && problem && solution && objective) {
      setDisableCreateBtn(false);
    } else {
      setDisableCreateBtn(true);
    }
  }, [industry, idealCustomer, problem, solution, objective]);

  return (
    <div className="inline-block bg-gray-100">
      <button
        onClick={openModal}
        className="text-base bg-black text-white py-[6px] px-8 rounded-md hover:bg-yellow-500 hover:text-black hover:transition-all hover:ease-in-out"
      >
        Proceed
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Email Marketing Modal"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-100 bg-opacity-80"
      >
        <div className="relative bg-yellow-400 p-6 rounded shadow-lg w-1/2">
          <button onClick={closeModal} className="absolute top-0 right-0 m-4">
            <X size={22} color="black" />
          </button>
          <div>
            <h2 className="text-xl font-semibold mb-4">Email Marketing</h2>
            <div className="mt-5">
              <h3 className="text-base font-medium">
                Which industry you belong to ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-3 text-sm">
                {industries.map((industryVal, index) => {
                  return (
                    <label key={index} className={`flex items-center gap-3`}>
                      <input
                        type="radio"
                        name="industry"
                        className="w-4 h-4"
                        value={industry}
                        checked={industry === industryVal}
                        onChange={() => setIndustry(industryVal)}
                      />
                      <span className="text-sm md:text-base">
                        {industryVal}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-base font-normal">
                Who is Your Ideal Customer for this Email?
              </h3>

              <input
                className="w-full h-10 bg-white border-none outline-none p-3 text-sm rounded-md mt-3"
                value={idealCustomer}
                onChange={(e) => {
                  setIdealCustomer(e.target.value);
                }}
              />
            </div>
            <div className="mt-3">
              <h3 className="text-base font-normal">
                What is the problem your customer are facing ?
              </h3>

              <input
                className="w-full h-10 bg-white border-none outline-none p-3 text-sm rounded-md mt-3"
                value={problem}
                onChange={(e) => {
                  setProblem(e.target.value);
                }}
              />
            </div>
            <div className="mt-3">
              <h3 className="text-base font-normal">
                What is the Solution you are Offering?
              </h3>

              <input
                className="w-full h-10 bg-white border-none outline-none p-3 text-sm rounded-md mt-3"
                value={solution}
                onChange={(e) => {
                  setSolution(e.target.value);
                }}
              />
            </div>
            <div className="mt-3">
              <h3 className="text-base font-normal">
                What is the Objective of this email? e.g. Lead Generation
              </h3>

              <input
                className="w-full h-10 bg-white border-none outline-none p-3 text-sm rounded-md mt-3"
                value={objective}
                onChange={(e) => {
                  setObjective(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              disabled={disableCreateBtn}
              onClick={handleCreate}
              className={`${
                disableCreateBtn
                  ? "bg-gray-400 text-gray-500"
                  : "bg-gray-800 hover:bg-gray-900"
              }  text-white rounded-md px-5 py-2`}
            >
              Create
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmailMarketingModal;
