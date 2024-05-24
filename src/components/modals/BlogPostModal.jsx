// MarketingPlanModal.jsx
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const BlogPostModal = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    heading: "",
    tone: "",
    articleLength: "",
    targetedKeyword: "",
    tableOfContent: "No",
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
    history.push("/blog", values);
  };
  useEffect(() => {
    if (
      values.heading &&
      values.tone &&
      values.articleLength &&
      values.targetedKeyword
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
        overlayClassName="fixed inset-0 bg-gray-100 bg-opacity-70"
      >
        <div className="relative bg-yellow-400 p-6 rounded shadow-lg w-1/2">
          <button onClick={closeModal} className="absolute top-0 right-0 m-4">
            <X size={22} color="black" />
          </button>
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Create a SEO Optimized Blog
            </h2>
            <div className="mt-4">
              <label htmlFor="mission" className="text-base font-normal">
                Heading of the article
              </label>
              <input
                value={values.heading}
                onChange={(e) =>
                  setValues({ ...values, heading: e.target.value })
                }
                className="w-full h-10 bg-white border-none outline-none p-3 text-sm rounded-md mt-3"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <label htmlFor="tone" className="text-base font-normal">
                  Tone
                </label>
                <select
                  name="chooseTone"
                  id="chooseTone"
                  className="w-full py-[10px] px-1 rounded-md border-none outline-none mt-3"
                  onChange={(e) =>
                    setValues({ ...values, tone: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Creative">Creative</option>
                  <option value="Inspirational">Inspirational</option>
                  <option value="Sarcastic">Sarcastic</option>
                  <option value="Informative">Informative</option>
                </select>
              </div>
              <div>
                <label htmlFor="mission" className="text-base font-normal">
                  Article
                </label>
                <select
                  name="chooseArticle"
                  id="chooseArticle"
                  className="w-full py-[10px] px-1 rounded-md border-none outline-none mt-3"
                  onChange={(e) =>
                    setValues({ ...values, articleLength: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Long (1000+ words & SEO Optimized)">
                    Long (1000+ words & SEO Optimized)
                  </option>
                  <option value="Short (upto 800 words & SEO Optimized)">
                    Short (upto 800 words & SEO Optimized)
                  </option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="mission" className="text-base font-normal">
                Target Keyword (Optional)
              </label>
              <input
                value={values.targetedKeyword}
                onChange={(e) =>
                  setValues({ ...values, targetedKeyword: e.target.value })
                }
                className="w-full h-10 bg-white border-none outline-none p-3 text-sm rounded-md mt-3"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="mission" className="text-base font-normal">
                Include Table of Content
              </label>
              <select
                name="tableOfContent"
                id="tableOfContent"
                className="w-full py-[10px] px-1 rounded-md border-none outline-none text-sm mt-3"
                onChange={(e) =>
                  setValues({ ...values, tableOfContent: e.target.value })
                }
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
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

export default BlogPostModal;
