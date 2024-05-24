import React from "react";
import FeatureLayout from "../components/shared/FeatureLayout";
import First from "./onboarding/components/First";
import Second from "./onboarding/components/Second";
import Third from "./onboarding/components/Third";

const Forms = () => {
  const [values, setValues] = React.useState({
    goal: "",
    target: "",
    aboutBusiness: "",
    mission: "",
    service: "",
    idealCustomer: "",
    desires: "",
    socialPlat: "",
    marketingBudget: "",
    marketingStaff: "",
    tool: "",
    techInfra: "",
    businessStrength: "",
    competitors: "",
    marketingStrategy: "",
    focusMarketing: "",
  });
  const [index, setIndex] = React.useState(0);

  const Component = [
    <First values={values} setValues={setValues} setIndex={setIndex} />,
    <Second values={values} setValues={setValues} setIndex={setIndex} />,
    <Third values={values} setValues={setValues} />,
  ];

  console.log("index", index);
  return (
    <div className="w-full md:w-[1000px] bg-white mx-auto py-10">
      <FeatureLayout />

      {Component[index]}
    </div>
  );
};

export default Forms;
