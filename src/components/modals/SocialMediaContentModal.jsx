// MarketingPlanModal.jsx
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const SocialMediaContentModal = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    socialNetwork: "Facebook",
    contentType: "All",
    timeSpan: "30 days",
    focused: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [disableCreateBtn, setDisableCreateBtn] = useState(true);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCreate = () => {
    console.log({ values });
    history.push("/social-media", values);
  };

  useEffect(() => {
    if (
      values.socialNetwork &&
      values.contentType &&
      values.timeSpan &&
      values.focused
    ) {
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
        overlayClassName="fixed inset-0 bg-gray-100 bg-opacity-80"
      >
        <div className="relative bg-yellow-400 p-6 rounded shadow-lg w-1/2">
          <button onClick={closeModal} className="absolute top-0 right-0 m-4">
            <X size={22} color="black" />
          </button>
          <div>
            <h2 className="text-xl font-semibold mb-1">Social Media Content</h2>
            <div className="mt-4">
              <h3 className="text-base font-normal">Choose Social Network</h3>
              <select
                name="chooseNetwork"
                id="chooseNetwork"
                className="w-full py-[10px] px-1 rounded-md border-none outline-none mt-3 text-sm"
                onChange={(e) =>
                  setValues({ ...values, socialNetwork: e.target.value })
                }
              >
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>
            </div>
            <div className="mt-4">
              <h3 className="text-base font-normal">Content Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-3 text-sm">
                {["All", "Reel", "Story", "Carousel", "Post"].map(
                  (item, index) => {
                    return (
                      <label key={index} className={`flex items-center gap-3`}>
                        <input
                          type="radio"
                          name="contentType"
                          className="w-4 h-4"
                          value={values.contentType}
                          checked={values.contentType === item}
                          onChange={() => {
                            setValues({ ...values, contentType: item });
                          }}
                        />
                        <span className="text-sm md:text-base">{item}</span>
                      </label>
                    );
                  }
                )}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-base font-normal">Choose the Time Span</h3>
              <select
                name="chooseTime"
                id="chooseTime"
                className="w-full py-[10px] px-1 rounded-md border-none outline-none mt-3 text-sm"
                onChange={(e) =>
                  setValues({ ...values, timeSpan: e.target.value })
                }
              >
                <option value="30 days">30 days</option>
                <option value="60 days">60 days</option>
              </select>
            </div>
            <div className="mt-4">
              <h3 className="text-base font-normal">
                Any Specific, Service, Product, Feature or Event, you want to
                focus
              </h3>
              <input
                className="w-full h-10 bg-white border-none outline-none p-3 text-sm rounded-md mt-3"
                value={values.focused}
                onChange={(e) => {
                  setValues({ ...values, focused: e.target.value });
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

export default SocialMediaContentModal;
