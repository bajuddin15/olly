// MarketingPlanModal.jsx
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const BrandingStrategyModal = () => {
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [values, setValues] = useState({
    mission: "",
    painPointOfCustomer: "",
    keyObjective: "",
  });
  const [disableCreateBtn, setDisableCreateBtn] = useState(true);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCreate = () => {
    console.log({ values });
    history.push("/brand", values);
  };

  useEffect(() => {
    if (values.mission && values.keyObjective && values.painPointOfCustomer) {
      setDisableCreateBtn(false);
    } else {
      setDisableCreateBtn(true);
    }
  }, [values]);

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
        overlayClassName="fixed inset-0 bg-gray-100 bg-opacity-70"
      >
        <div className="relative bg-yellow-400 p-6 rounded shadow-lg w-1/2">
          <button onClick={closeModal} className="absolute top-0 right-0 m-4">
            <X size={22} color="black" />
          </button>
          <div>
            <h2 className="text-xl font-semibold mb-4">Branding Strategy</h2>
            <div className="mt-5">
              <label htmlFor="mission" className="text-base font-normal">
                What is your mission or core values of your business?
              </label>
              <textarea
                className="w-full h-14 bg-white border-none outline-none p-3 text-sm rounded-md mt-3"
                type="text"
                value={values.mission}
                onChange={(e) =>
                  setValues({ ...values, mission: e.target.value })
                }
              ></textarea>
            </div>
            <div className="mt-4">
              <label htmlFor="mission" className="text-base font-normal">
                What are the needs and pain points of your customer?
              </label>
              <textarea
                className="w-full h-14 bg-white border-none outline-none p-3 text-sm rounded-md mt-3"
                type="text"
                value={values.painPointOfCustomer}
                onChange={(e) =>
                  setValues({ ...values, painPointOfCustomer: e.target.value })
                }
              ></textarea>
            </div>
            <div className="mt-4">
              <label htmlFor="mission" className="text-base font-normal">
                What are the key objectives for your branding strategy? e.g.
                increase awareness, rebrand, enter a new market
              </label>
              <textarea
                className="w-full h-14 bg-white border-none outline-none p-3 text-sm rounded-md mt-3"
                type="text"
                value={values.keyObjective}
                onChange={(e) =>
                  setValues({ ...values, keyObjective: e.target.value })
                }
              ></textarea>
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

export default BrandingStrategyModal;
