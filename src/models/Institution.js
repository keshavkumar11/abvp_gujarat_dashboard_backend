import  mongoose  from "mongoose";

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },        
  type: { type: String, enum: ["College", "School"], required: true },
  taluka: { type: String, required: true },     
  
  male: { type: Number, default: 0 },
  female: { type: Number, default: 0 },
  professor: { type: Number, default: 0 },
  other: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  
  karyakarta: { type: Number, default: 0 },
  starMarks: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },       
  entries: { type: Number, default: 0 },
  
  rank: { type: Number, default: 0 }             
}, { timestamps: true });

const Institution = mongoose.model("Institution",institutionSchema);

export default Institution;