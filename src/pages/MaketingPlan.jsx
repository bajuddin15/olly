import React, { useMemo, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { AiFillStar } from "react-icons/ai";
import { OpenAI } from "openai-streams";
import supabase from "../Supabase";
import { useEffect } from "react";
import Quill from "./Quill";
import { useTrackingCode } from "react-hubspot-tracking-code-hook";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const apiKey = import.meta.env.VITE_OPENAI_KEY;

export default function MarketingPlan() {
  const location = useLocation();
  const { objective } = location.state || {};
  const user = useSelector((state) => state.auth.user);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [saveText, setSaveText] = useState("");
  const [favBtn, setFavBtn] = useState("Favorite");
  const [isSave, setIsSave] = useState(false);
  const [messages, setMessages] = useState([]);
  const [placeholder, setPlaceholder] = useState("Start typing...");
  const { setPathPageView, setIdentity, setTrackPageView } = useTrackingCode();

  const config = {
    useSearch: false,
    spellcheck: false,
    enter: "P",
    defaultMode: "1",
    toolbarAdaptive: false,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    minHeight: 400,
    minWidth: null,
    editorCssClass: "alic",
    placeHolder: "",
    controls: {
      fontsize: {
        list: [
          "8",
          "9",
          "10",
          "11",
          "12",
          "14",
          "16",
          "18",
          "24",
          "30",
          "36",
          "48",
          "60",
          "72",
          "96",
          "100",
        ],
      },
      font: {
        command: "fontname",
        list: {
          "": "Default",
          "'Open Sans',sans-serif": "Open Sans",
          "Helvetica,sans-serif": "Helvetica",
          "Arial,Helvetica,sans-serif": "Arial",
          "Georgia,serif": "Georgia",
          "Impact,Charcoal,sans-serif": "Impact",
          "Tahoma,Geneva,sans-serif": "Tahoma",
          "'Times New Roman',Times,serif": "Times New Roman",
          "Verdana,Geneva,sans-serif": "Verdana",
        },
      },
    },
  };
  React.useEffect(() => {
    setPathPageView("/marketing");
    setMessages([
      {
        role: "system",
        content: `Give me output in HTML format with proper beautiful pdf like styling. You must never be verbose. You must answer questions in a direct and succinct manner. Do not add filler content. Stay focused and concise with your output.
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
        Act like a marketing expert and manager. Create a marketing plan using the following outline for ${user?.aboutBusiness?.aboutBusiness} whose main goal is to drive ${user?.aboutBusiness?.objective} Focus on ${objective} generation in Any language. Use headings accordingly. Use bullet points when creating the output and clearly lay it out in sections so I can copy and paste it into MS Word.
        Our Objective - State the objective of the marketing plan. The objectives should be attainable and measurable – two goals associated with SMART, which stands for Specific, Measurable, Attainable, Relevant, and Time-bound
        To Achieve This Objective - outline the steps to achieve the objective.
        Company initiative - describe the company initiative.
        Initiatives - come up with maximum 3 best initiatives that are need to reach our objective. Then describe the initiative, state the goal of the initiative, and define metrics to measure success. Put this in sections.
       Competitor Analysis- Audit ${user?.aboutBusiness?.mainCompetitors} Content , blogs, whitepaper, website content, and create a table to show what content creation are they focusing on, and what opportunities have they left open? What's their sales approach and target market, how engaging is their content, how up to date they are? How often and where is new content added? analyze voice and tone, what's their mission, what's their pricing, how do they promoting their products.
        Marketing strategy - write a short paragraph about what is the best marketing strategy
        Marketing plan is in three phases - fill them out in clear sections and title them.
        1. Attracting the right audience:
        a. Target market? Who is the target market. Create a short avatar.
        b. Message to market; 
        i. Give me 3 to 6 deep emotional pain points related to our product. And 2 external pain point. 
        ii. Give me 5 gains that the target audience desires, wants or expects from the course. 
        iii. Define the value proposition clearly.
        iv. Define the products and services. 
        v. Write a story brand using the Hero's Journey.
        vi. Give me an idea for the campaign narrative, what could the narrative or theme of the campaign be. 
        a. What are the best channels to reach the audience.
        2. Nurturing The Sale - from lead to sale:
        a. Give me 5 specific lead magnet ideas with titles and at least 3 of them should be pdf ideas.
        b. Create a checklist of the following infrastructure:
        i. Lead capture website/webpages
        ii. Google My Business
        iii. Newsletters
        iv. Blogs
        v. Follow-up process for inbound leads
        vi. Social media profiles
        vii. Email auto-responder sequences
        viii. Inbound enquiry
        ix. New opt-in lead email sequence
        x. Customer complaint
        xi. Remarketing & Pixels
        xii. Customer review system
        xiii. Marketing Asset Review Checklist
        c. Give me a list of 5 to 10 kpis we should measure.
        d. Traffic Generator:
        i. Based on the preference of traffic given in the prompt give me a step-by-step plan for each preference. 
        e. Define the flow for the best sales funnel for the campaign using a free traffic strategy. And then put in a bullet list what elements are needed for the sales funnel.
        f. Create a checklist for building trust on the website using these points:
        i. Phone Number 
        ii. Professional Email Address i.e., support@yourdomain.com
        iii. Physical Address 
        iv. CRM
        v. Privacy Policy & T & Cs 
        vi. Support Ticketing System
        vii. Professional Web Design 
        viii. Social Media Profiles
        ix. Any Awards or Recognitions
        g. Tell me the best pricing strategy and suggest pricing.
        3. After sales:
        a. Increase Customer Lifetime Value by giving me a plan on:
        i. Give me 5 ideas I can upsell to my customers.
        ii. Give me 5 ideas what I can sell as a subscription, membership or anything that requires a recurring fee.
        b. Give me a referral strategy.
        The last thing is to create an action plan for me to do from all the above.
        Give me a month-by-month action plan for 12 months. Cut down goal in 4 part and mention the plan based on each quarter as well and how much goal we will achieve in first quarter and vice versa
       create 1 month day wise content plan`,
      },
    ]);
  }, [objective, user]);

  let data = "";

  const cancelRef = React.useRef(false);
  let controller = new AbortController();

  const onClick = async () => {
    setContent("");
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
    }

    setContent(result);
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

  const stopFunc = () => {
    controller.abort();
    cancelRef.current = true;
  };

  return (
    <div className="flex flex-col min-h-full w-full bg-white rounded-lg px-6 md:px-16 md:py-12 py-6 drop-shadow-2xl mb-4">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-bold text-gray-800">
          Create a 12 Month Action Marketing Plan that Drives Leads and Sales
        </h1>
      </div>
      {showInput ? (
        <div className="flex flex-col w-full">
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
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full mt-8 h-full flex-wrap space-y-6">
            {content !== "" ? (
              <JoditEditor
                className="w-full bg-red-400 overflow-y-auto h-96"
                ref={editor}
                value={result}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setResult(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: result }}
                className="w-full h-96 overflow-y-auto"
              ></div>
            )}
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
