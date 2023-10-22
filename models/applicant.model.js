import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ApplicantSchema = new Schema({
    name:{
        type: String,
        required: null,
    },
    dob: {
        type: Date,
        required: null,
        get: (date) => {
            if (date) {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().split('T')[0];
            }
            return date;
        }
    },
    gender:{
        type: String,
        enum: ["male", "female"],
        default: "",
        required: null,
    },
    hobbies:{
        type: [String],
        required: null,
    },
    state:{
        type: String,
        required: null,
    },
    address:{
        type: String,
        required: null,
    },
    resume:{
        type: String,
        required: null,
    },
}, { toJSON: { getters: true }, toObject: { getters: true } });

export default mongoose.model('Applicant', ApplicantSchema)