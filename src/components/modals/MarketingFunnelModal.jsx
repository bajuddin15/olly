// MarketingPlanModal.jsx
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const MarketingFunnelModal = () => {
  const history = useHistory();
  const [industry, setIndustry] = useState("");
  const [goal, setGoal] = useState("");
  const [targetedAudience, setTargetedAudience] = useState("");
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
    console.log({ industry, goal });
    history.push("/funnels", { industry, goal, targetedAudience });
  };

  useEffect(() => {
    if (industry && goal.trim() && targetedAudience) {
      setDisableCreateBtn(false);
    } else {
      setDisableCreateBtn(true);
    }
  }, [industry, goal]);

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
            <h2 className="text-xl font-semibold mb-4">Marketing Funnel</h2>
            <div className="mt-5">
              <h3 className="text-base font-normal">
                Which industry you belong to ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-3">
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
                      <span className="text-sm">{industryVal}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-base font-normal">What is your goal?</h3>

              <input
                className="w-full h-10 bg-white border-none outline-none p-3 text-sm rounded-md mt-3"
                value={goal}
                onChange={(e) => {
                  setGoal(e.target.value);
                }}
              />
            </div>
            <div className="mt-5">
              <h3 className="text-base font-normal">Targeted Audience</h3>

              <input
                className="w-full h-10 bg-white border-none outline-none p-3 text-sm rounded-md mt-3"
                value={targetedAudience}
                onChange={(e) => {
                  setTargetedAudience(e.target.value);
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

export default MarketingFunnelModal;
