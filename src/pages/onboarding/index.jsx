import React from "react";
import Header from "../../components/header/Header";
import First from "./components/First";
import Second from "./components/Second";
import Third from "./components/Third";
import FeatureLayout from "../../components/shared/FeatureLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
import { useHistory } from "react-router-dom";

const Onboarding = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log({ user });
  const [values, setValues] = React.useState({
    objective: "",
    offerService: "",
    aboutBusiness: "",
    industry: "",
    idealCustomer: "",
    marketingBudget: "",
    marketingStaff: "",
    marketingTool: "",
    technologyInfra: "",
    websiteUrl: "",
    mainCompetitors: "",
    marketingStrategy: "",
  });
  const [index, setIndex] = React.useState(0);

  const handleSubmit = async () => {
    console.log({ user });
    console.log("submit values : ", values);

    if (user) {
      try {
        const { data } = await axios.post(
          `/api/users/aboutBusiness/create/${user._id}`,
          values
        );
        if (data && data?.success) {
          dispatch(setUser(data?.data));
          history.push("/dashboard");
        }
      } catch (error) {
        console.log("Error :", error?.message);
      }
    }
  };

  const Component = [
    <First values={values} setValues={setValues} setIndex={setIndex} />,
    <Second values={values} setValues={setValues} setIndex={setIndex} />,
    <Third
      values={values}
      setValues={setValues}
      setIndex={setIndex}
      handleSubmit={handleSubmit}
    />,
  ];

  return (
    <div>
      <Header />

      <div className="w-full md:w-[1000px] bg-white mx-auto p-5 py-10">
        <FeatureLayout />

        {Component[index]}
      </div>
    </div>
  );
};

export default Onboarding;
