import multer from "multer";
import fs from "fs";
import path from "path";
import applicantModel from "../models/applicant.model";

// Multer setup for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./uploads";

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const name = file.originalname; //abc.png
    const ext = path.extname(name); //.png
    const nameArr = name.split("."); //[abc,png]
    nameArr.pop();
    const fname = nameArr.join("."); //abc
    const fullname = fname + "-" + Date.now() + ext; //abc-12345.png
    cb(null, fullname);
  },
});
const upload = multer({ storage: storage });

// Get-All Applicant
export const getAllApplicant = async (req, res) => {
  try {
    const applicantData = await applicantModel.find();
    if (applicantData) {
      return res.status(200).json({
        data: applicantData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Add Applicant
export const AddApplicant = (req, res) => {
  try {
    const uploadApplicant = upload.single("resume");

    uploadApplicant(req, res, function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const { name, dob, gender, hobbies, state, address } = req.body;

      let processedDOB = null;
      if (dob) {
        const inputDate = new Date(dob);
        processedDOB = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
      }

      let resume = null;
      if (req.file !== undefined) {
        resume = req.file.filename;
      }

      const createdRecord = new applicantModel({
        name: name,
        dob: processedDOB,
        gender: gender,
        hobbies: hobbies,
        state: state,
        address: address,
        resume: resume,
      });

      createdRecord.save();
      if (createdRecord) {
        return res.status(201).json({
          data: createdRecord,
          message: "Success",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Applicant
export const DeleteApplicant = async(req, res)=>{
  try {
    const id = req. params.applicant_id;

    const applicantData = await applicantModel.findOne({_id: id});

    let Resume = applicantData.resume;
    if(fs.existsSync("./uploads/"+ applicantData.resume)){
      fs.unlinkSync("./uploads/"+ applicantData.resume);
    }

    const deleteApp = await applicantModel.deleteOne({_id: id});
    if(deleteApp.acknowledged){
      return res.status(200).json({
        message: "Deleted",
    });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
  });
  }
}