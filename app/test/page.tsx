"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Attendance() {
  const [batch, setBatch] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toDateString());

  const [allStudents, setAllStudents] = useState<any[]>([{}]);

  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [totalMarksP, setTotalMarksP] = useState<number>(0);
  const [totalInternalPM, setTotalInternalPM] = useState<number>(0);
  const [obtainedMarks, setObtainedMarks] = useState<number | undefined>(
    undefined
  );
  const [practicalMarks, setPracticalMarks] = useState<number | undefined>(
    undefined
  );
  const [internalMarks, setInternalMarks] = useState<number | undefined>(
    undefined
  );

  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/api/get-students");

        var data = result.data;
        // fileter sudent where batch is batch and course is course
        data = data.filter((student: any) => {
          return student.batch === batch && student.course === course;
        });

        setAllStudents(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Define form schema
  //   CREATE TABLE tests (
  // id INT NOT NULL,
  // Sname VARCHAR(255) NOT NULL,
  // batch VARCHAR(255) NOT NULL,
  // course VARCHAR(255) NOT NULL,
  // topic VARCHAR(255) NOT NULL,
  // totalMarks INT NOT NULL,
  // obtainedMarks INT NOT NULL,
  // internalMarks INT NOT NULL,
  // practicalMarks INT NOT NULL,
  // totalMarksP INT NOT NULL,
  // totalInternalPM INT NOT NULL,
  // date DATE NOT NULL,
  // present BOOLEAN NOT NULL DEFAULT false,
  // PRIMARY KEY (id, date)
  //   );
  // `);

  return (
    <div>
      <div className="flex justify-center mt-3">
        <div className="text-[72px]">Test</div>
      </div>
      <div className="flex justify-center mt-5 ">
        <div className="w-[80vw] flex flex-col gap-y-5">
          <Input
            className="bg-white rounded-xl p-5"
            type="text"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          {/* for topic */}
          <div className="grid xl:grid-cols-3 grid-cols-1 gap-5">
            <Input
              className="bg-white rounded-xl p-5"
              type="text"
              placeholder="Topic"
              onChange={(e) => {
                setTopic(e.target.value);
              }}
            />
            {/* for course */}
            <Input
              className="bg-white rounded-xl p-5"
              type="text"
              placeholder="Course"
              onChange={(e) => {
                setCourse(e.target.value);
              }}
            />
            {/* for batch */}
            <Input
              className="bg-white rounded-xl p-5"
              type="text"
              placeholder="Batch"
              onChange={(e) => {
                setBatch(e.target.value);
              }}
            />
            {/* for total marks */}
            <Input
              className="bg-white rounded-xl p-5"
              type="number"
              placeholder="Total Marks"
              onChange={(e) => {
                setTotalMarks(parseInt(e.target.value));
              }}
            />
            {/* total marks p */}
            <Input
              className="bg-white rounded-xl p-5"
              type="number"
              placeholder="Total Marks P"
              onChange={(e) => {
                setTotalMarksP(parseInt(e.target.value));
              }}
            />
            {/* total internal pm */}
            <Input
              className="bg-white rounded-xl p-5"
              type="number"
              placeholder="Total Internal PM"
              onChange={(e) => {
                setTotalInternalPM(parseInt(e.target.value));
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[80vw]">
          {/* <StudentCard
            students={allStudents}
            totalMarks={totalMarks}
            totalMarksP={totalMarksP}
            totalInternalPM={totalInternalPM}
          /> */}
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

                <div className="">
                  <Button variant="link" className="bg-white text-gray-400">
                    DONE
                  </Button>
                </div>
              </div>{" "}
              {allStudents.map((student) => {
                return (
                  <div
                    key={student.id}
                    className="flex gap-4 bg-white mb-4 rounded-xl"
                  >
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
                        type="number"
                        onChange={(e) => {
                          setObtainedMarks(parseInt(e.target.value));
                        }}
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
                        type="number"
                        onChange={(e) => {
                          setPracticalMarks(parseInt(e.target.value));
                        }}
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
                        type="number"
                        onChange={(e) => {
                          setInternalMarks(parseInt(e.target.value));
                        }}
                        className="bg-white rounded-xl p-5 border-none"
                      />
                      <Input
                        disabled
                        value={totalInternalPM}
                        className="bg-white rounded-xl p-5 border-none"
                      />
                    </div>
                    <div className="">
                      <Button
                        onDoubleClick={() => {
                          axios.post("/api/add-test", {
                            id: student.id,
                            Sname: student.Sname,
                            batch: batch,
                            course: course,
                            topic: topic,
                            totalMarks: totalMarks,
                            obtainedMarks: 0,
                            internalMarks: 0,
                            practicalMarks: 0,
                            totalMarksP: totalMarksP,
                            totalInternalPM: totalInternalPM,
                            date: date,
                            present: false,
                          });

                          toast({
                            title: `${student.Sname}Marked absent`,
                          });
                        }}
                        onClick={(e) => {
                          // send data to server

                          if (
                            obtainedMarks == undefined &&
                            practicalMarks == undefined &&
                            internalMarks == undefined
                          ) {
                            console.log("start");

                            toast({
                              title: "Fields Undefined",
                              description: "Please fill all the details",
                            });
                          } else {
                            axios.post("/api/add-test", {
                              id: student.id,
                              Sname: student.Sname,
                              batch: batch,
                              course: course,
                              topic: topic,
                              totalMarks: totalMarks,
                              obtainedMarks: obtainedMarks,
                              internalMarks: internalMarks,
                              practicalMarks: practicalMarks,
                              totalMarksP: totalMarksP,
                              totalInternalPM: totalInternalPM,
                              date: new Date(),
                              present: true,
                            });
                            setInternalMarks(undefined);
                            setObtainedMarks(undefined);
                            setPracticalMarks(undefined);
                          }

                          console.log("Sname : ", student.Sname);
                          console.log("internalMarks : ", internalMarks);
                          console.log("practicalMarks : ", practicalMarks);
                          console.log("obtainedMarks : ", obtainedMarks);
                          console.log("course : ", course);
                          console.log("batch : ", batch);
                          console.log("topic :", topic);
                          console.log("date :", date);
                        }}
                      >
                        <Check className="bg-transparent text-white" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
