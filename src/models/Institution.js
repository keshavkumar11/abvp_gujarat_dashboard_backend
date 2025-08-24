// models/Institution.js
import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["college", "school"], // to differentiate
      required: true,
    },
    district: { type: String, required: true },
    nagar: { type: String },

    // Common fields
    male: { type: Number, default: 0 },
    female: { type: Number, default: 0 },
    professor: { type: Number, default: 0 },
    totalMembership: { type: Number, default: 0 },

    // College-specific
    colleges: { type: Number, default: 0 },
    uniHostelPg: { type: Number, default: 0 },
    karyakarta: { type: Number, default: 0 },
    star: { type: String }, // optional rating

    // School-specific
    schools: { type: Number, default: 0 },
    tution: { type: Number, default: 0 },
    karyakartaSchool: { type: Number, default: 0 },

    // Amount tracking
    receivedAmount: { type: Number, default: 0 },
    leftAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Institution = mongoose.model("Institution", institutionSchema);
export default Institution;
