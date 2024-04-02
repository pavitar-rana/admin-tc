import React from "react";
import { Input } from "./ui/input";

export default function StudentCard({
  students,
  totalInternalPM,
  totalMarks,
  totalMarksP,
}: {
  students: any[];
  totalInternalPM: number;
  totalMarks: number;
  totalMarksP: number;
}) {
  return (
    <div>
      <div>
        <div className="flex gap-4 bg-white mb-4 rounded-xl">
          <Input
            disabled
            placeholder={"Student Name"}
            className="bg-white rounded-xl p-5 border-none w-auto"
          />
          <div className="bg-transparent w-full flex">
            <Input
              disabled
              placeholder="Obtained Marks"
              className="bg-white rounded-xl p-5 border-none"
            />
            <Input
              disabled
              placeholder="Total Marks"
              className="bg-white rounded-xl p-5 border-none"
            />
          </div>
          <div className="bg-transparent w-full flex">
            <Input
              disabled
              placeholder="Practical Marks"
              className="bg-white rounded-xl p-5 border-none"
            />
            <Input
              disabled
              placeholder="Total Marks Practical"
              className="bg-white rounded-xl p-5 border-none"
            />
          </div>
          <div className="bg-transparent w-full flex justify-center">
            <Input
              disabled
              placeholder="Internal Marks"
              className="bg-white rounded-xl p-5 border-none"
            />
            <Input
              disabled
              placeholder="Total Internal PM"
              className="bg-white rounded-xl p-5 border-none"
            />
          </div>
        </div>{" "}
        {students.map((student) => {
          return (
            <div className="flex gap-4 bg-white mb-4 rounded-xl">
              <Input
                disabled
                value={`${student.Sname} ${
                  // if student.gender is male then show "S/O" else show "D/O"
                  student.gender === "Male" ? "S/O" : "D/O"
                } ${student.fatherName}`}
                className="bg-white rounded-xl p-5 border-none w-auto"
              />
              <div className="bg-transparent w-full flex">
                <Input
                  placeholder="Obtained Marks"
                  className="bg-white rounded-xl p-5 border-none"
                />
                <Input
                  disabled
                  value={totalMarks}
                  className="bg-white rounded-xl p-5 border-none"
                />
              </div>
              <div className="bg-transparent w-full flex">
                <Input
                  placeholder="Practical Marks"
                  className="bg-white rounded-xl p-5 border-none"
                />
                <Input
                  disabled
                  value={totalMarksP}
                  className="bg-white rounded-xl p-5 border-none"
                />
              </div>
              <div className="bg-transparent w-full flex justify-center">
                <Input
                  placeholder="Internal Marks"
                  className="bg-white rounded-xl p-5 border-none"
                />
                <Input
                  disabled
                  value={totalInternalPM}
                  className="bg-white rounded-xl p-5 border-none"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
