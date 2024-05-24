import mongoose from "mongoose";
const { Schema } = mongoose;

const aboutSchema = new Schema(
  {
    objective: {
      type: String,
      required: true,
    },
    offerService: {
      type: String,
    },
    aboutBusiness: {
      type: String,
    },
    industry: {
      type: String,
    },
    idealCustomer: {
      type: String,
    },
    marketingBudget: {
      type: String,
    },
    marketingStaff: {
      type: String,
    },
    marketingTool: {
      type: String,
    },
    technologyInfra: {
      type: String,
    },
    websiteUrl: {
      type: String,
    },
    mainCompetitors: {
      type: String,
    },
    marketingStrategy: {
      type: String,
    },
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);
export default About;
