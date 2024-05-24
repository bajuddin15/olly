import React, { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Supabase";
import { useTrackingCode } from "react-hubspot-tracking-code-hook";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import MarketingPlanModal from "./modals/MarketingPlanModal";
import EmailMarketingModal from "./modals/EmailMarketingModal";
import SocialMediaContentModal from "./modals/SocialMediaContentModal";
import SeoKeywordModal from "./modals/SeoKeywordModal";
import BrandingStrategyModal from "./modals/BrandingStrategyModal";
import MarketingFunnelModal from "./modals/MarketingFunnelModal";
import BlogPostModal from "./modals/BlogPostModal";

function Cards() {
  const [cards, setCards] = React.useState([
    {
      name: "Marketing Plans",
      feature: "Create",
      link: "/marketing",
      modal: <MarketingPlanModal />,
    },
    {
      name: "Marketing Funnels",
      feature: "Create",
      link: "/funnels",
      modal: <MarketingFunnelModal />,
    },
    {
      name: "Engaging Blog Post",
      feature: "Write",
      link: "/blog",
      modal: <BlogPostModal />,
    },
    {
      name: "SEO Keywords",
      feature: "Research",
      link: "/seo",
      modal: <SeoKeywordModal />,
    },
    {
      name: "Branding Strategy",
      feature: "Generate",
      link: "/brand",
      modal: <BrandingStrategyModal />,
    },
    {
      name: "Email Marketing",
      feature: "Generate",
      link: "/email",
      modal: <EmailMarketingModal />,
    },
    {
      name: "Social Media Content",
      feature: "Create",
      link: "/social-media",
      modal: <SocialMediaContentModal />,
    },
    // {
    //   name: "Product Descriptions",
    //   feature: "Generate",
    //   link: "/product",
    //   modal: <MarketingPlanModal />,
    // },
    // {
    //   name: "Marketing Collaterals",
    //   feature: "Create",
    //   link: "/custom",
    //   modal: <MarketingPlanModal />,
    // },
  ]);
  const { setPathPageView, setIdentity, setTrackPageView } = useTrackingCode();

  const [userName, setUserName] = React.useState();

  const getUserName = async () => {
    const user = await supabase.auth.getUser();

    if (user.data.user.app_metadata.provider === "google") {
      const name = await user.data.user.user_metadata.fullName;
      return name;
    } else if (user.data.user.app_metadata.provider === "email") {
      const name = await user.data.user.user_metadata.fullName;
      console.log({ user });
      return name;
    }
  };

  React.useEffect(() => {
    // const temp = getUserName()
    // setUserName(temp)
    getUserName().then((name) => {
      setUserName(name);
      setTrackPageView();
      setPathPageView("/dashboard");
    });
  }, [userName]);

  return (
    <div className="flex flex-col w-full h-full mt-5">
      <div className="flex flex-col w-full justify-between">
        <h1 className="text-2xl lg:text-3xl font-normal text-gray-700 px-4">
          👋🏻 Hi {userName}!
        </h1>
        <div className="px-4 ml-3 mt-3 space-y-2">
          <h2 className="text-2xl lg:text-3xl font-medium">
            What do you want to do?
          </h2>
          <p className="text-xl font-normal text-gray-700">
            Choose how you want to proceed and we'll help you get started.
            Simply follow the steps below.
          </p>
        </div>
      </div>
      <div className="w-full md:w-[1000px] grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6 mt-6 p-0 lg:p-7">
        {cards.map((card, index) => (
          <div
            // to={card.link}
            key={index}
            className={`flex flex-col justify-between gap-2 w-full lg:w-72 bg-white p-5 rounded-lg cursor-pointer hover:scale-105 transition-all ease-linear drop-shadow-[0_35px_35px_rgba(25,25,25,0.1)] m-0`}
          >
            <div className="my-8">
              <p className="text-gray-600">{card?.feature}</p>
              <h1 className="text-2xl font-medium text-gray-900">
                {card.name}
              </h1>
            </div>

            <div className="flex  items-center justify-end">{card.modal}</div>
          </div>
        ))}

        <div className="md:col-span-3 w-full flex items-center justify-end  mt-5">
          <button className="bg-gray-300 py-2 px-5 rounded-md flex items-center gap-2">
            <span>I am looking for</span>
            <MdOutlineArrowRightAlt size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
