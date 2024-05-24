import React from "react";
import { useState, useMemo, useEffect } from "react";
import supabase from "../Supabase";
import { OpenAI } from "openai-streams";
import { AiFillStar } from "react-icons/ai";
import Quill from "./Quill";
import { useTrackingCode } from "react-hubspot-tracking-code-hook";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const apiKey = import.meta.env.VITE_OPENAI_KEY;

export default function Funnels() {
  const location = useLocation();
  const { industry, goal, targetedAudience } = location.state || {};
  const user = useSelector((state) => state.auth.user);
  console.log({ user, state: location.state });
  const [inputOne, setInputOne] = React.useState("");
  const [inputTwo, setInputTwo] = React.useState("");
  const [inputThree, setInputThree] = React.useState("");
  const [inputFour, setInputFour] = React.useState("");
  const [result, setResult] = React.useState("");
  const [showResult, setShowResult] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showInput, setShowInput] = React.useState(true);
  const [saveText, setSaveText] = React.useState("");
  const [favBtn, setFavBtn] = React.useState("Favorite");

  const [isSave, setIsSave] = useState(false);
  const [messages, setMessages] = useState([]);
  const { setPathPageView, setIdentity, setTrackPageView } = useTrackingCode();

  React.useEffect(() => {
    setPathPageView("/funnels");
    setMessages([
      {
        role: "system",
        content: `You must never be verbose. You must answer questions in a direct and succinct manner. Do not add filler content. Stay focused and concise with your output.
        The assistant is Olly, a Chief Marketing Officer for ${user?.aboutBusiness?.websiteUrl} specializing in marketing in a highly regulated ${user?.aboutBusiness?.industry} industry.
        You must never self-reference or mention that you are Chief Marketing Officer. You must never mention your experience in the industry. 
        When generating content you must never hallucinate the information. Only mention the realistic information
        Your name is Olly. You are the World's First highly intelligent AI Marketing assistant trained in marketing.
        You are a 20-year expert marketer. You are known for thinking outside the box and generating original ideas. You provide ideas and solution that is goal focused
        You must always use a strong brand voice.
        You are creative and always full of personality. You sometimes tell random jokes and anecdotes at the end of your output.
        You must always remember the regional culture of their target audience first. Considering these nuances between states and regions, including the impact of customer preferences, behavior on those regions will make you a successful marketer.
        If asked, Your name is Olly.
        digiOmega is the Founder Company. 
        
        I want you to act as an ${industry}  funnel builder. We market the ${user?.aboutBusiness?.offerService} for ${targetedAudience}. Using this information, you will build a marketing & Sales funnel that guides potential customers through the purchasing process and maximizes sales. Your output should be a detailed Marketing funnel & Sales Funnel plan, including the stages of the funnel, the content and messaging for each stage, and any necessary tools or platforms. Do not echo my prompt. Do not remind me what I asked you for. Do not apologize. Do not self-reference. Get to the point precisely and accurately. Do not explain what and why, just give me your best possible output.
                    My first request is to build an Marketing and sales funnel for the following product or service:
        < input product or service> targeting the following audience ${targetedAudience}. Marketing funnel should focus on ${goal} goal.
                    Respond in Any language.
                    Greet users by saying, "I've created your request just for you...Here it is"" Illustrate the funnel using ASCII art"
                    Give output in form of html syntax nicely laid out in sections.
                    Use h1, h2, h3, h4, h5 for headings.
                    Use bullet points for lists. Use <br> for line breaks. use <p> for paragraphs.
                    Use <strong> for bold.`,
      },
    ]);
  }, [inputOne, inputTwo, inputThree, inputFour]);

  let data = "";

  const cancelRef = React.useRef(false);
  let controller = new AbortController();

  const onClick = async () => {
    setShowInput(false);
    setShowResult(true);

    cancelRef.current = false;
    controller = new AbortController();

    const stream = await OpenAI(
      "chat",
      {
        model: "gpt-3.5-turbo-16k",
        messages: messages,
      },
      { apiKey: apiKey },
      controller
    );
    const res = new Response(stream);
    const reader = res.body.getReader(); // get reader from stream
    const decoder = new TextDecoder("utf-8");

    // Read only content from the stream
    while (true) {
      const { done, value, error } = await reader.read();
      if (done || cancelRef.current) {
        if (done) setIsSave(true);
        break;
      }
      if (error) {
        isSave(true);
        break;
      }
      data += decoder.decode(value);
      setResult(result + data);
      // auto scroll the result div
      // const element = document.getElementById('result')
      // element.scrollTop = element.scrollHeight;
    }

    setMessages([
      ...messages,
      {
        role: "assistant",
        content: data + " ",
      },
    ]);
  };

  useMemo(() => {
    console.log(messages);
    if (messages.length === 1) {
      onClick();
    }
  }, [messages]);

  const addToFav = async () => {
    setFavBtn("Saving");
    const id = localStorage.getItem("curr_id");
    const email = localStorage.getItem("email");
    const { data, error } = await supabase.from("favorites").insert([
      {
        id: id,
        email: email,
      },
    ]);
    if (error) {
      console.log(error);
    }
    setFavBtn("Added");
    setTimeout(() => {
      setFavBtn("Favorite");
    }, 2000);
    localStorage.removeItem("curr_id");
  };

  const saveToDatabase = async (res) => {
    let user = await supabase.auth.getUser();
    let uuid = user.data.user.id;
    setSaveText("Saving to database...");
    const id = Math.floor(Math.random() * 1000000000);
    localStorage.setItem("curr_id", id);
    const { data, error } = await supabase.from("history").insert([
      {
        id: id,
        uuid: uuid,
        type: inputOne,
        result: res,
      },
    ]);
    if (error) {
      console.log(error);
    }
    setTimeout(() => {
      setSaveText("Saved to History");
    }, 2000);
    setSaveText("");
  };

  const stopFunc = () => {
    controller.abort();
    cancelRef.current = true;
  };

  useEffect(() => {
    if (isSave) {
      console.log("saving to database");
      saveToDatabase(result);
    }
  }, [isSave]);

  const [copyText, setCopyText] = React.useState("Copy");
  const copy = () => {
    // remove html tags
    const regex = /(<([^>]+)>)/gi;
    const text = result.replace(regex, "");
    navigator.clipboard.writeText(text);
    setCopyText("Copied!");
    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-full w-full bg-white rounded-lg px-6 md:px-16 md:py-12 py-6 drop-shadow-2xl mb-4">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-bold text-gray-800">Marketing Funnels</h1>
      </div>
      {showInput ? (
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full mt-8 space-y-6 h-full">
            <div className="flex flex-col w-full space-y-1">
              <label className="text-gray-600 font-medium">
                What is your product or service?{" "}
              </label>
              <input
                onChange={(e) => setInputFour(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand"
                type="text"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label className="text-gray-600 font-medium">
                What is your target audience? (i.e. Smokers)
              </label>
              <input
                onChange={(e) => setInputOne(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand"
                type="text"
              />
            </div>
            <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-5">
              <div className="flex flex-col w-full space-y-1">
                <label className="text-gray-600 font-medium">
                  What is your budget? (i.e. $5000)
                </label>
                <input
                  onChange={(e) => setInputTwo(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand"
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full space-y-1">
                <label className="text-gray-600 font-medium">
                  What is the goal? (More Sales)
                </label>
                <input
                  onChange={(e) => setInputThree(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full justify-end mt-8">
            <button
              onClick={onClick}
              className="w-32 h-12 bg-brand rounded-lg text-white font-medium text-lg transition-all ease-linear hover:bg-brand/90"
            >
              Create 🔥
            </button>
          </div>
        </div>
      ) : null}
      {showResult ? (
        <div className="flex flex-col w-full overflow-y-auto">
          <div className="flex flex-col w-full mt-8 h-96 overflow-y-auto space-y-6">
            <Quill id={"result"} content={result} />
          </div>
          <div className="flex flex-row space-x-2 w-full items-center justify-end mt-7">
            <p className="text-gray-600 text-sm font-medium mr-4">{saveText}</p>
            <button
              onClick={copy}
              className="w-24 h-12 rounded-lg text-brand font-medium text-lg transition-all ease-linear hover:text-gray-900 mr-4"
            >
              {copyText}
            </button>
            <button
              onClick={addToFav}
              className="px-4 h-12 rounded-lg bg-yellow-500 text-brand font-medium flex flex-row items-center justify-center text-lg transition-all ease-linear mr-4"
            >
              <AiFillStar className="text-brand text-2xl" />
              {favBtn}
            </button>
            <button
              onClick={onClick}
              className="w-44 h-12 bg-brand rounded-lg text-white font-medium text-lg transition-all ease-linear hover:bg-brand/90"
            >
              Continue 🔥
            </button>
            <button
              onClick={stopFunc}
              className="w-44 h-12 bg-gray-200 rounded-lg text-gray-600 font-medium text-lg transition-all ease-linear hover:bg-gray-300"
            >
              Stop
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
