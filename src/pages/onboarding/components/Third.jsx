import React, { useEffect, useState } from "react";
import TextArea from "../../../components/shared/TextArea";

const Third = ({ values, setValues, setIndex, handleSubmit }) => {
  const [technologyInf, setTechnologyInf] = useState([
    "Website",
    "Responsive Design",
    "Web Chat",
  ]);

  const [marketingStrategies, setMarketingStrategies] = useState([
    "Content Marketing",
    "Social Media Marketing",
    "Paid Ads",
    "Email Marketing",
    "SEO",
    "Event Marketing",
    "Influencer Marketing",
    "Community Engagement",
    "Partner or Referral",
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* form3 */}
      <div className="border border-gray-300 lg:mx-0 my-10 p-5 rounded-lg shadow-sm space-y-8">
        <div className="space-y-7">
          <div>
            <h2 className="text-lg font-semibold">Technology Infrastructure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
              {technologyInf.map((item, index) => {
                return (
                  <label key={index} className={`flex items-center gap-3`}>
                    <input
                      type="radio"
                      name="technologyInfra"
                      className={`w-4 h-4 ${
                        values?.technologyInfra === item ? "" : ""
                      }`}
                      value={values?.technologyInfra}
                      checked={values?.technologyInfra === item}
                      onChange={() =>
                        setValues((prevValues) => ({
                          ...prevValues,
                          technologyInfra: item,
                        }))
                      }
                    />
                    <span className="text-sm md:text-base">{item}</span>
                  </label>
                );
              })}
            </div>
            <TextArea
              name={"websiteUrl"}
              rows={1}
              label={`Please share your website URL`}
              value={values?.websiteUrl}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  websiteUrl: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-base md:text-lg">Competitive Analysis</h2>
            <TextArea
              label="Who are your main competitors? Please share their URLs"
              name="mainCompetitors"
              rows={2}
              value={values?.mainCompetitors}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  mainCompetitors: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div>
          <h2 className="text-base md:text-lg">
            Marketing Strategy You Want To Focus
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
            {marketingStrategies.map((item, index) => {
              return (
                <label key={index} className={`flex items-center gap-3`}>
                  <input
                    type="radio"
                    name="marketingStrategy"
                    className={`w-4 h-4 ${
                      values?.marketingStrategy === item ? "" : ""
                    }`}
                    value={values?.marketingStrategy}
                    checked={values?.marketingStrategy === item}
                    onChange={() =>
                      setValues((prevValues) => ({
                        ...prevValues,
                        marketingStrategy: item,
                      }))
                    }
                  />
                  <span className="text-sm md:text-base">{item}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            onClick={() => setIndex(1)}
            className="bg-gray-700 hover:bg-gray-800 text-white py-[6px] px-10 rounded-lg "
          >
            Previous
          </button>
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-600 py-[6px] px-10 rounded-lg "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Third;
