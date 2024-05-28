import mongoose from "mongoose";
const MarksSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true

    },
    termOneMarks: {
        type: Map,
        of: Number,
    },
    termTwoMarks: {
        type: Map,
        of: Number,
    },
    semesterMarks: {
        type: Map,
        of: Number,
    },
    tt1_prediction: {
        type: String
    },
    tt2_prediction: {
        type: String
    },
    sem_prediction: {
        type: String,
    },
    sgpi: {
        type: Number
    },
    defaulter: {
        type: String,
    },

});

const Marks = mongoose.model('Marks', MarksSchema)
export default Marks