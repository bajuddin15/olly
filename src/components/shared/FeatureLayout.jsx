import React from "react";
import supabase from "../../Supabase";

const FeatureLayout = () => {
  const [userName, setUserName] = React.useState("");
  const getUserName = async () => {
    const user = await supabase.auth.getUser();

    if (user.data.user.app_metadata.provider === "google") {
      const name = await user.data.user.user_metadata.fullName;
      return name;
    } else if (user.data.user.app_metadata.provider === "email") {
      const name = await user.data.user.user_metadata.fullName;
      return name;
    }
  };

  React.useEffect(() => {
    getUserName().then((name) => {
      setUserName(name);
    });
  }, [userName]);
  return (
    <div className="space-y-3 lg:mx-0">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
        👋🏻 Hey{" "}
        <span className="text-yellow-500">
          {userName?.includes(" ") ? userName.split(" ")[0] : userName}!
        </span>
      </h2>
      <p className="text-xl font-semibold tracking-wide">
        Thanks for Hiring me as Your Marketing Assistant
      </p>
      <div>
        <p className="text-base text-gray-700">
          Let's start with giving some training about your company/business and
        </p>
        <p className="text-base text-gray-700">your marketing goals</p>
      </div>
    </div>
  );
};

export default FeatureLayout;
