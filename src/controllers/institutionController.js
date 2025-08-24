import Institution from "../models/Institution.js";

// Public: Get all institutions
export const getInstitutions = async (req, res) => {
  const institutions = await Institution.find({});
  res.json(institutions);
};

// Admin only: Add new institution
export const addInstitution = async (req, res) => {
  const institution = new Institution(req.body);
  const createdInstitution = await institution.save();
  res.status(201).json(createdInstitution);
};

// Admin only: Update institution
export const updateInstitution = async (req, res) => {
  const institution = await Institution.findById(req.params.id);
  if (institution) {
    Object.assign(institution, req.body);
    const updated = await institution.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: "Institution not found" });
  }
};

// Admin only: Delete institution
export const deleteInstitution = async (req, res) => {
  const institution = await Institution.findById(req.params.id);
  if (institution) {
    await institution.remove();
    res.json({ message: "Institution removed" });
  } else {
    res.status(404).json({ message: "Institution not found" });
  }
};
