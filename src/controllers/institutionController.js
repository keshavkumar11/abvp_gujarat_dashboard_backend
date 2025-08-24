import Institution from "../models/Institution.js";

// Public: Get all institutions
export const getInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find({});
    res.json(institutions);
  } catch (error) {
    console.error("getInstitutions error:", error);
    res.status(500).json({ message: "Failed to fetch institutions" });
  }
};

// Admin only: Add new institution
export const addInstitution = async (req, res) => {
  try {
    const institution = new Institution(req.body);
    const createdInstitution = await institution.save();
    res.status(201).json(createdInstitution);
  } catch (error) {
    console.error("addInstitution error:", error);
    res
      .status(400)
      .json({ message: "Failed to add institution", error: error.message });
  }
};

// Admin only: Update institution
export const updateInstitution = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }

    Object.assign(institution, req.body);
    const updated = await institution.save(); // auto recalculates here
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Admin only: Delete institution
export const deleteInstitution = async (req, res) => {
    try{
  const institution = await Institution.findById(req.params.id);
  if (institution) {
    await Institution.deleteOne({ _id: req.params.id });
    res.json({ message: "Institution deleted successfully" });
  } else {
    res.status(404).json({ message: "Institution not found" });
  }
}catch(error){
        res.status(500).json({ message: error.message });

}
};

// Get district-wise aggregated data (public, one row per district)
export const getDistrictSummary = async (req, res) => {
  try {
    const summary = await Institution.aggregate([
      {
        $group: {
          _id: "$district",

          // ---- College (type = "college") ----
          collegeMale: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$male", 0] },
                0,
              ],
            },
          },
          collegeFemale: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$female", 0] },
                0,
              ],
            },
          },
          collegeProfessors: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$professor", 0] },
                0,
              ],
            },
          },
          collegeMembers: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$totalMembership", 0] },
                0,
              ],
            },
          },
          colleges: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$colleges", 0] },
                0,
              ],
            },
          },
          uniHostelPg: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$uniHostelPg", 0] },
                0,
              ],
            },
          },
          karyakartaCollege: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$karyakarta", 0] },
                0,
              ],
            },
          },

          // ---- School (type = "school") ----
          schoolMale: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$male", 0] },
                0,
              ],
            },
          },
          schoolFemale: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$female", 0] },
                0,
              ],
            },
          },
          schoolProfessors: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$professor", 0] },
                0,
              ],
            },
          },
          schoolMembers: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$totalMembership", 0] },
                0,
              ],
            },
          },
          schools: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$schools", 0] },
                0,
              ],
            },
          },
          tution: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$tution", 0] },
                0,
              ],
            },
          },
          karyakartaSchool: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$karyakartaSchool", 0] },
                0,
              ],
            },
          },

          // ---- Common (amounts across both types) ----
          receivedAmount: { $sum: { $ifNull: ["$receivedAmount", 0] } },
          leftAmount: { $sum: { $ifNull: ["$leftAmount", 0] } },
        },
      },
      {
        // compute district totals (college + school)
        $addFields: {
          district: "$_id",
          totalMale: { $add: ["$collegeMale", "$schoolMale"] },
          totalFemale: { $add: ["$collegeFemale", "$schoolFemale"] },
          totalProfessors: {
            $add: ["$collegeProfessors", "$schoolProfessors"],
          },
          totalMembers: { $add: ["$collegeMembers", "$schoolMembers"] },
        },
      },
      { $project: { _id: 0 } },
      { $sort: { totalMembers: -1, district: 1 } },
    ]);

    res.json(summary);
  } catch (error) {
    console.error("getDistrictSummary error:", error);
    res.status(500).json({ message: "Error fetching district summary" });
  }
};

// Get Gujarat-wide summary (public, one object)
export const getGujaratSummary = async (req, res) => {
  try {
    const [summary] = await Institution.aggregate([
      {
        $group: {
          _id: null,

          // split by type
          collegeMale: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$male", 0] },
                0,
              ],
            },
          },
          collegeFemale: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$female", 0] },
                0,
              ],
            },
          },
          collegeProfessors: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$professor", 0] },
                0,
              ],
            },
          },
          collegeMembers: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$totalMembership", 0] },
                0,
              ],
            },
          },
          colleges: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$colleges", 0] },
                0,
              ],
            },
          },
          uniHostelPg: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$uniHostelPg", 0] },
                0,
              ],
            },
          },
          karyakartaCollege: {
            $sum: {
              $cond: [
                { $eq: ["$type", "college"] },
                { $ifNull: ["$karyakarta", 0] },
                0,
              ],
            },
          },

          schoolMale: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$male", 0] },
                0,
              ],
            },
          },
          schoolFemale: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$female", 0] },
                0,
              ],
            },
          },
          schoolProfessors: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$professor", 0] },
                0,
              ],
            },
          },
          schoolMembers: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$totalMembership", 0] },
                0,
              ],
            },
          },
          schools: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$schools", 0] },
                0,
              ],
            },
          },
          tution: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$tution", 0] },
                0,
              ],
            },
          },
          karyakartaSchool: {
            $sum: {
              $cond: [
                { $eq: ["$type", "school"] },
                { $ifNull: ["$karyakartaSchool", 0] },
                0,
              ],
            },
          },

          // money across both types
          receivedAmount: { $sum: { $ifNull: ["$receivedAmount", 0] } },
          leftAmount: { $sum: { $ifNull: ["$leftAmount", 0] } },
        },
      },
      {
        $addFields: {
          totalMale: { $add: ["$collegeMale", "$schoolMale"] },
          totalFemale: { $add: ["$collegeFemale", "$schoolFemale"] },
          totalProfessors: {
            $add: ["$collegeProfessors", "$schoolProfessors"],
          },
          totalMembers: { $add: ["$collegeMembers", "$schoolMembers"] },
        },
      },
      { $project: { _id: 0 } },
    ]);

    res.json(
      summary || {
        collegeMale: 0,
        collegeFemale: 0,
        collegeProfessors: 0,
        collegeMembers: 0,
        colleges: 0,
        uniHostelPg: 0,
        karyakartaCollege: 0,
        schoolMale: 0,
        schoolFemale: 0,
        schoolProfessors: 0,
        schoolMembers: 0,
        schools: 0,
        tution: 0,
        karyakartaSchool: 0,
        receivedAmount: 0,
        leftAmount: 0,
        totalMale: 0,
        totalFemale: 0,
        totalProfessors: 0,
        totalMembers: 0,
      }
    );
  } catch (error) {
    console.error("getGujaratSummary error:", error);
    res.status(500).json({ message: "Error fetching Gujarat summary" });
  }
};
