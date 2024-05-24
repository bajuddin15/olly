import React, { useEffect } from "react";
import TextArea from "../../../components/shared/TextArea";

const Second = ({ values, setValues, setIndex }) => {
  const [marketingStaffs, setMarketingStaffs] = React.useState([
    "Digital Marketing Executive",
    "Graphic Designer",
    "SEO Executive",
    "Manager for Strategic direction",
    "Copy Writer",
    "Sales Team Member",
  ]);
  const [tools, setTools] = React.useState([
    "Marketing Automation CRM",
    "Email Marketing Tool",
    "Social Media Platforms",
    "Google ad setup",
    "CMS",
    "Analytical Tools",
  ]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* form2 */}
      <div className="border border-gray-300 lg:mx-0 my-10 p-5 rounded-lg shadow-sm space-y-8">
        <div className="space-y-4">
          <div>
            <TextArea
              name={"idealCustomer"}
              rows={3}
              label={`Who is your ideal customer?`}
              value={values?.idealCustomer}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  idealCustomer: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div>
          <h2 className="text-base md:text-lg">Budget and Resources</h2>
          <TextArea
            label="What is your marketing budget for the defined period?"
            name="marketingBudget"
            rows={2}
            value={values?.marketingBudget}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                marketingBudget: e.target.value,
              }))
            }
          />
          <div className="my-8">
            <p className="text-base">
              What resources (staff, tools, technology) are available for
              implementing marketing strategies?
            </p>
            <p className="text-sm">Check the box if its available</p>
          </div>
          <div className="mt-8">
            <h2 className="text-base">Do You Have Marketing Staff?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
              {marketingStaffs.map((staff, index) => {
                return (
                  <label key={index} className={`flex items-center gap-3`}>
                    <input
                      type="radio"
                      name="marketingStaff"
                      className={`w-4 h-4 ${values.goal === staff ? "" : ""}`}
                      value={values?.marketingStaff}
                      checked={values?.marketingStaff === staff}
                      onChange={() =>
                        setValues((prevValues) => ({
                          ...prevValues,
                          marketingStaff: staff,
                        }))
                      }
                    />
                    <span className="text-sm md:text-base">{staff}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-base">Tools & Software Setup</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
              {tools.map((tool, index) => {
                return (
                  <label key={index} className={`flex items-center gap-3`}>
                    <input
                      type="radio"
                      name="toolSoft"
                      className={`w-4 h-4 ${
                        values.marketingTool === tool ? "" : ""
                      }`}
                      value={values?.marketingTool}
                      checked={values?.marketingTool === tool}
                      onChange={() =>
                        setValues((prevValues) => ({
                          ...prevValues,
                          marketingTool: tool,
                        }))
                      }
                    />
                    <span className="text-sm md:text-base">{tool}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            onClick={() => setIndex(0)}
            className="bg-gray-700 hover:bg-gray-800 text-white py-[6px] px-10 rounded-lg "
          >
            Previous
          </button>
          <button
            onClick={() => setIndex(2)}
            className="bg-yellow-500 text-gray-700 py-[6px] px-10 rounded-lg hover:bg-yellow-600 "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Second;
