// MarketingPlanModal.jsx
import { X } from "lucide-react";
import React, { useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const MarketingPlanModal = () => {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCreate = () => {
    if (!value.trim()) return;
    console.log({ value });
    history.push("/marketing", { objective: value });
  };

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
        contentLabel="Marketing Plan Modal"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-100 bg-opacity-80"
      >
        <div className="relative bg-yellow-400 p-6 rounded shadow-lg w-1/2">
          <button onClick={closeModal} className="absolute top-0 right-0 m-4">
            <X size={22} color="black" />
          </button>
          <div>
            <h2 className="text-xl font-semibold mb-4">Marketing Plan</h2>
            <div className="mt-5">
              <h3 className="text-lg font-medium">
                What's Your Focused Objective for Creating This Marketing Plan?
              </h3>
              <p className="text-sm font-normal mt-1">
                i.e. Achieve a 10% growth in monthly sales through targeted
                marketing compaigns and product promotions within the next
                fiscal year
              </p>

              <textarea
                className="w-full h-20 bg-white border-none outline-none p-3 text-sm rounded-md mt-5"
                type="text"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              ></textarea>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={handleCreate}
              className="bg-gray-800 hover:bg-gray-900 text-white rounded-md px-5 py-2"
            >
              Create
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MarketingPlanModal;
