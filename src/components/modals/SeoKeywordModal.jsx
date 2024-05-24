// MarketingPlanModal.jsx
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const SeoKeywordModal = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  const [searchIntent, setSearchIntent] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [disableCreateBtn, setDisableCreateBtn] = useState(true);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCreate = () => {
    if (!keyword.trim() || !searchIntent) return;
    console.log({ keyword, searchIntent });
    history.push("/seo", { keyword, searchIntent });
  };
  useEffect(() => {
    if (searchIntent && keyword.trim()) {
      setDisableCreateBtn(false);
    } else {
      setDisableCreateBtn(true);
    }
  }, [keyword, searchIntent]);

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
            <h2 className="text-xl font-semibold mb-4">Seo Keyword Research</h2>
            <div className="mt-5">
              <label htmlFor="mission" className="text-base font-normal">
                I need low competition, high traffic keyword ideas related to:
              </label>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full h-10 bg-white border-none outline-none p-3 text-sm rounded-md mt-3"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="mission" className="text-base font-normal">
                Search Intent
              </label>
              <select
                name="chooseNetwork"
                id="chooseNetwork"
                className="w-full py-[10px] px-1 rounded-md border-none outline-none mt-3"
                onChange={(e) => setSearchIntent(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Commercial">Commercial</option>
                <option value="Transactional">Transactional</option>
                <option value="Informational">Informational</option>
              </select>
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

export default SeoKeywordModal;
