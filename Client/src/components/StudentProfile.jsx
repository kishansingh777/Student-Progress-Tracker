import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import { FaUserGraduate } from "react-icons/fa";
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { BsFillBarChartFill } from "react-icons/bs";

function StudentProfile() {
  const { id: studentId } = useParams();
  const [student, setStudent] = useState({});
  const [marks, setMarks] = useState({});

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINT}student/get-student-data?studentId=${studentId}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const studentData = await response.json();
        console.log(studentData);

        if (studentData) {
          setStudent(studentData.student);
          setMarks(studentData.marks);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getStudentData();
  }, [studentId]);

  return student._id ? (
    <div className="absolute top-[20%] left-[53%] translate-x-[-50%] bg-pRed p-4 text-white rounded-md text-center grid gap-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <h2 className="text-2xl font-bold text-pYellow flex items-center justify-center gap-2">
        <FaUserGraduate />
        STUDENT
      </h2>
      <div className="grid grid-cols-2 gap-4 gap-x-10">
        <div className="flex text-xl">
          <span className="font-semibold mr-2">Name: </span>
          <span>{student.studentName}</span>
        </div>
        <div className="flex text-xl">
          <span className="font-semibold mr-2">Roll Number: </span>
          <span>{student.rollNumber}</span>
        </div>
        <div className="flex text-xl">
          <span className="font-semibold mr-2">Class: </span>
          <span>{student.studentClass}</span>
        </div>
      </div>
      {marks.termOneMarks && (
        <>
          <h2 className="text-2xl font-bold text-pYellow flex items-center justify-center gap-2">
            <BsFillFileEarmarkSpreadsheetFill />
            TERM TEST ONE MARKS
          </h2>
          <div className="grid grid-cols-2 gap-4 gap-x-10">
            {Object.entries(marks.termOneMarks).map(([key, value]) => {
              return (
                <div className="flex text-lg" key={key}>
                  <span className="font-semibold mr-2">{key}: </span>
                  <span>{value}</span>
                </div>
              );
            })}
            <div className="flex text-lg">
              <span className="font-semibold mr-2">Prediction: </span>
              <span>{marks.tt1_prediction}</span>
            </div>
          </div>
        </>
      )}
      {marks.termTwoMarks && (
        <>
          <h2 className="text-2xl font-bold text-pYellow flex items-center justify-center gap-2">
            <BsFillFileEarmarkSpreadsheetFill />
            TERM TEST TWO MARKS
          </h2>
          <div className="grid grid-cols-2 gap-4 gap-x-10">
            {Object.entries(marks.termTwoMarks).map(([key, value]) => {
              return (
                <div className="flex text-lg" key={key}>
                  <span className="font-semibold mr-2">{key}: </span>
                  <span>{value}</span>
                </div>
              );
            })}
            <div className="flex text-lg">
              <span className="font-semibold mr-2">Prediction: </span>
              <span>{marks.tt2_prediction}</span>
            </div>
          </div>
        </>
      )}
      {marks.semesterMarks && (
        <>
          <h2 className="text-2xl font-bold text-pYellow flex items-center justify-center gap-2">
            <BsFillFileEarmarkSpreadsheetFill />
            SEMESTER MARKS
          </h2>
          <div className="grid grid-cols-2 gap-4 gap-x-10">
            {Object.entries(marks.semesterMarks).map(([key, value]) => {
              return (
                <div className="flex text-lg" key={key}>
                  <span className="font-semibold mr-2">{key}: </span>
                  <span>{value}</span>
                </div>
              );
            })}
            <div className="flex text-xl">
              <span className="mr-2">Prediction: </span>
              <span>{marks.sem_prediction}</span>
            </div>
          </div>
        </>
      )}
      <h2 className="text-2xl font-bold text-pYellow flex items-center justify-center gap-2">
        {" "}
        <BsFillBarChartFill /> SCORES
      </h2>
      <div className="grid grid-cols-2 gap-4 gap-x-10">
        <div className="flex text-xl">
          <span className="font-semibold mr-2">Sgpi: </span>
          <span>{marks.sgpi}</span>
        </div>
        <div className="flex text-xl">
          <span className="font-semibold mr-2">Defaulter: </span>
          <span>{marks.defaulter}</span>
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading....</h1>
  );
}

export default StudentProfile;
