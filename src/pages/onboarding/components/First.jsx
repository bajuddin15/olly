import React, { useEffect } from "react";
import TextArea from "../../../components/shared/TextArea";

const First = ({ values, setValues, setIndex }) => {
  const [objectives, setObjectives] = React.useState([
    "Lead Generation and Sales Drive Plan",
    "Brand Awareness Plan",
    "Product Launch Plan",
    "Customer Retention Plan",
    "Content Marketing Plan",
  ]);

  const [industries, setIndustries] = React.useState([
    "B2B Service",
    "Edtech",
    "Manufacturing & Industrial",
    "B2B SaaS",
    "Healthcare",
    "Automotive",
    "Ecommerce",
    "Finance",
    "Real Estate",
  ]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=" ">
      {/* form1 */}
      <div className="border border-gray-300  lg:mx-0 my-10 p-5 rounded-lg shadow-sm space-y-8">
        <div>
          <h2 className="text-base md:text-lg">Choose Objective</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
            {objectives.map((objective, index) => {
              return (
                <label key={index} className={`flex items-center gap-3`}>
                  <input
                    type="radio"
                    name="objectiveGoal"
                    className={`w-4 h-4 ${
                      values?.objective === objective ? "" : ""
                    }`}
                    value={values?.objective}
                    checked={values?.objective === objective}
                    onChange={() =>
                      setValues((prevValues) => ({
                        ...prevValues,
                        objective: objective,
                      }))
                    }
                  />
                  <span className="text-sm md:text-base">{objective}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-base md:text-lg">Business Overview:</h2>
          <div className="space-y-4 mt-5">
            <TextArea
              label="What products or services do you offer?"
              name="offerService"
              rows={2}
              value={values?.offerService}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, offerService: e.target.value }))
              }
            />
            <TextArea
              label="What is your business is all about?"
              name="aboutBusiness"
              rows={2}
              value={values?.aboutBusiness}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  aboutBusiness: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div>
          <h2 className="text-base md:text-lg">Choose Your Industry:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
            {industries.map((industry, index) => {
              return (
                <label key={index} className={`flex items-center gap-3`}>
                  <input
                    type="radio"
                    name="industry"
                    className={`w-4 h-4 ${
                      values?.industry === industry ? "" : ""
                    }`}
                    value={values?.industry}
                    checked={values?.industry === industry}
                    onChange={() =>
                      setValues((prevValues) => ({
                        ...prevValues,
                        industry: industry,
                      }))
                    }
                  />
                  <span className="text-sm md:text-base">{industry}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            onClick={() => setIndex(1)}
            className="bg-yellow-500 text-gray-700 py-[6px] px-10 rounded-lg hover:bg-yellow-600 hover:text-black"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default First;
