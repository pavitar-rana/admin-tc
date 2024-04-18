"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Topics() {
  const [course, setCourse] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toDateString());
  const [subtopic, setSubtopic] = useState<string>("");
  // const [allStudents, setAllStudents] = useState<any[]>([{}]);

  const [faculty, setFaculty] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { toast } = useToast();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await axios.get("/api/get");

  //       setAllStudents(result.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <div className="flex justify-center mt-3">
        <div className="text-[72px]">Topics Covered</div>
      </div>
      <div className="flex justify-center mt-5 ">
        <div className="w-[80vw] flex flex-col gap-y-5">
          {/* for topic */}
          <div className="grid xl:grid-cols-3 grid-cols-1 gap-5">
            <Input
              className="bg-white rounded-xl p-5"
              type="text"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
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
            {/* for Subtopic */}
            <Input
              className="bg-white rounded-xl p-5"
              type="text"
              placeholder="Subtopic"
              onChange={(e) => {
                setSubtopic(e.target.value);
              }}
            />
            {/* for faculty */}
            <Input
              className="bg-white rounded-xl p-5"
              type="text"
              placeholder="Faculty"
              onChange={(e) => {
                setFaculty(e.target.value);
              }}
            />
            {/* for content */}
            <Input
              className="bg-white rounded-xl p-5"
              type="text"
              placeholder="Content"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center">
            <Button
              onClick={() => {
                axios.post("/api/add-topics", {
                  course: course,
                  topic: topic,
                  subtopic: subtopic,
                  date: date,
                  content: content,
                  faculty: faculty,
                });

                toast({
                  title: "Topic added",
                });
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[80vw]">
          <div>
            <div>
              {/* {allStudents.map((student) => {
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
              })} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
