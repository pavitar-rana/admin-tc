"use client";
import React, { use, useEffect, useState } from "react";
import { z } from "zod";

import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { set } from "date-fns";

export default function Attendance() {
  const [options, setOptions] = useState([
    { value: "option1", label: "Option 1" },
  ]);

  const [selectedOption, setSelectedOption] = useState("");

  const [selectedId, setSelectedId] = useState<string>("");

  const [allStudents, setAllStudents] = useState<any[]>([{}]);
  const [selectedStudent, setSelectedStudent] = useState<any>({});
  const [selectedName, setSelectedName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/api/get-students");

        setAllStudents(result.data);

        const options = result.data.map((student: any) => ({
          value: student.id + "thisisdelseperateid" + student.Sname,
          label: student.Sname + " S/O " + student.fatherName,
        }));

        setOptions(options);
        console.log(options);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Define form schema
  const formSchema = z.object({
    date: z.string(),
    present: z.string().min(2).max(50),
    onLeave: z.string().min(2).max(50),
    inTime: z.string().min(2).max(50),
    outTime: z.string().min(2).max(50),
    reason: z.string().min(2).max(50),
    holiday: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toString(),
      present: "false",
      onLeave: "false",
      inTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      outTime: "4:00 pm",
      reason: "NONE",
      holiday: "false",
    },
  });

  // Event handler for select input change
  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);

    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    const [id] = selectedValue.split("thisisdelseperateid");
    setSelectedId(id);
    // itrate over allStudents and find the selected student
    const selectedS = allStudents.find((student) => student.id === Number(id));
    console.log("selectedS Name: ", selectedS.Sname);
    setSelectedName(selectedS.Sname);
    console.log("selectedId : ", id);
    console.log("allStudents : ", allStudents);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      const selectedS = allStudents.find(
        (student) => student.id === Number(selectedId)
      );
      setSelectedStudent(selectedS);
      console.log("selectedS : ", selectedS);

      const result = await axios.post("/api/add-attendence", {
        id: selectedId,
        Sname: selectedName,
        date: values.date,
        present: values.present,
        onLeave: values.onLeave,
        inTime: values.inTime,
        outTime: values.outTime,
        reason: values.reason,
        holiday: values.holiday,
      });

      console.log(result);
      console.log("Data inserted successfully");
    } catch (error) {
      console.error("Error selecting Student:", error);
    }
  }

  return (
    <div>
      <div className="flex justify-center mt-3">
        <div className="text-[72px]">Attendance</div>
        {/* <input type="text" value={selectedId} name="" id="" /> */}
      </div>

      <div className="flex justify-center mt-10">
        <div>
          <div className="mb-10">
            <div className="mb-3">
              <label htmlFor="">Select Student</label>
            </div>
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="border-gray-100 border-2 rounded-md p-2 w-80"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* <p>Selected Option: {selectedOption}</p> */}
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-center flex-col gap-10"
            >
              <div className="grid grid-cols-2 gap-10">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input placeholder="Date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="present"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Present</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Present In First Half" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="false">Absent</SelectItem>
                          <SelectItem value="true">Present</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="onLeave"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>On Leave</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="On Leave" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="false">Not On Leave</SelectItem>
                          <SelectItem value="true">On Leave</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="inTime"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>In Time</FormLabel>
                      <FormControl>
                        <Input placeholder="In Time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="outTime"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Out Time</FormLabel>
                      <FormControl>
                        <Input placeholder="Out Time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Reason</FormLabel>
                      <FormControl>
                        <Input placeholder="Reason" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="holiday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Holiday</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Holiday" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="false">Not a Holiday</SelectItem>
                          <SelectItem value="true">Holiday</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Confirm </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
