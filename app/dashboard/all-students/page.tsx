"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

export default function Attendance() {
  const [allStudents, setAllStudents] = useState<any[]>([{}]);

  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/api/get-students");

        setAllStudents(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="xl:px-5 w-full">
      <Table>
        <TableCaption>Total Students : {allStudents.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Father{"'"}s Name</TableHead>
            <TableHead>Phone No.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allStudents.length === 0 ? (
            <TableRow>
              <TableCell>No Student</TableCell>
              <TableCell>No Student</TableCell>
              <TableCell>No Student</TableCell>
              <TableCell>No Student</TableCell>
            </TableRow>
          ) : (
            allStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.Sname}</TableCell>
                <TableCell>Mr. {student.fatherName}</TableCell>
                <TableCell>{student.phone}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
