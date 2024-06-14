const asyncHandler = require("express-async-handler");
const Profession = require("../models/professionModel");

const getProfessionById = asyncHandler(async (req, res) => {
  const profession = await Profession.findById(req.params.id);

  if (!profession) {
    res.status(400);
    throw new Error("Profession not found.");
  }

  res.status(200).json(profession);
});

const getProfessions = asyncHandler(async (req, res) => {
  const profession = await Profession.find();

  res.status(200).json(profession);
});

const setProfession = asyncHandler(async (req, res) => {
  if (!req.body.profession) {
    res.status(400);
    throw new Error("Please add profession.");
  }

  const profession = await Profession.create({
    profession: req.body.profession,
  });

  res.status(200).json(profession);
});

const updateProfession = asyncHandler(async (req, res) => {
  const profession = await Profession.findById(req.params.id);

  if (!profession) {
    res.status(400);
    throw new Error("Profession not found.");
  }

  const updatedProfession = await Profession.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedProfession);
});

const deleteProfession = asyncHandler(async (req, res) => {
  const profession = await Profession.findByIdAndDelete(req.params.id);

  if (!profession) {
    res.status(400);
    throw new Error("Profession not found.");
  }

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProfessionById,
  getProfessions,
  setProfession,
  updateProfession,
  deleteProfession,
};
