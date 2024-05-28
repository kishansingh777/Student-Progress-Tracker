import Marks from "../models/marks.js";
import Student from "../models/student.js";

export const addTermTestOne = async (req, res) => {
  const { studentClassId, marks, rollNumber } = req.body;

  try {
    const studentData = await Student.findOne({ studentClassId, rollNumber });

    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }
    const marksArray = Object.values(marks);

    const dataFrame = {
      AIDS_II: marksArray[0],
      IOE: marksArray[2],
      STQA: marksArray[4],
      IRS: marksArray[3],
      DMMM: marksArray[1],
    };

    const response = await fetch(
      `${process.env.FLASK_SERVER_URL}/predict/tt1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataFrame),
      }
    );
    const result = await response.json();
    let prediction = "";

    if (result[0] == "0") {
      prediction = "Slow Performer";
    } else if (result[0] == "1") {
      prediction = "Average Performer";
    } else if (result[0] == "2") {
      prediction = "Good Performer";
    }

    const studentMarks = await Marks.findOneAndUpdate(
      { student: studentData._id },
      { termOneMarks: marks, tt1_prediction: prediction },
      { new: true }
    );
    return res.status(200).json({ message: "Updated", studentMarks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", error });
  }
};

export const addTermTestTwo = async (req, res) => {
  const { studentClassId, marks, rollNumber } = req.body;

  try {
    const studentData = await Student.findOne({ studentClassId, rollNumber });

    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }
    const marksArray = Object.values(marks);

    const dataFrame = {
      AIDS_II: marksArray[0],
      IOE: marksArray[2],
      STQA: marksArray[4],
      IRS: marksArray[3],
      DMMM: marksArray[1],
    };

    const response = await fetch(
      `${process.env.FLASK_SERVER_URL}/predict/tt2`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataFrame),
      }
    );
    const result = await response.json();
    let prediction = "";

    if (result[0] == "0") {
      prediction = "Slow Performer";
    } else if (result[0] == "1") {
      prediction = "Average Performer";
    } else if (result[0] == "2") {
      prediction = "Good Performer";
    }

    console.log("prediction", prediction);
    console.log("result", result[0]);

    const studentMarks = await Marks.findOneAndUpdate(
      { student: studentData._id },
      { termTwoMarks: marks, tt2_prediction: prediction },
      { new: true }
    );
    return res.status(200).json({ message: "Updated", studentMarks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", error });
  }
};

export const addSemesterMarks = async (req, res) => {
  const { studentClassId, marks, rollNumber, defaulter } = req.body;

  const studentData = await Student.findOne({ studentClassId, rollNumber });

  try {
    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }
    const Defaulter = defaulter === "Yes" ? "1" : "0";
    console.log(Defaulter);

    const marksArray = Object.values(marks);
    const sum = marksArray.reduce((acc, curr) => acc + parseInt(curr), 0);
    const sgpi = ((sum / 500) * 10).toFixed(2);

    const dataFrame = {
      Defaulter: Defaulter,
      DMBI_ESE: marksArray[0],
      WEBX_ESE: marksArray[1],
      DS_ESE: marksArray[2],
      WT_ESE: marksArray[3],
      GIT_ESE: marksArray[4],
      "SGPI_(GPA)": sgpi,
    };
    const response = await fetch(
      `${process.env.FLASK_SERVER_URL}/predict/sem`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataFrame),
      }
    );
    const result = await response.json();
    console.log(result);
    let prediction = "";

    if (result[0] == "1") {
      prediction = "Good Performer";
    } else if (result[0] == "2") {
      prediction = "Average Performer";
    } else if (result[0] == "3") {
      prediction = "Slow Performer";
    }

    console.log(prediction);
    const studentMarks = await Marks.findOneAndUpdate(
      { student: studentData._id },
      { semesterMarks: marks, defaulter, sem_prediction: prediction, sgpi },
      { new: true }
    );
    return res.status(200).json({ message: "Updated", studentMarks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", error });
  }
};
