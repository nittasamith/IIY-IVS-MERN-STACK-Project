import Application from "../models/Application.js";

export const applyJob = async (req, res) => {
  try {

    const application = await Application.create(req.body);

    res.json(application);

  } catch (error) {

    res.status(500).json(error);

  }
};