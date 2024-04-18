"use client";
import React from "react";
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
import { toast } from "@/components/ui/use-toast";

export default function AddStudents() {
  const formSchema = z.object({
    Sname: z.string().min(2).max(50),
    gender: z.string().min(2).max(50),
    fatherName: z.string().min(2).max(50),
    fatherContact: z.string().min(10).max(10),
    password: z.string().min(8).max(50),
    email: z.string().email(),
    phone: z.string().min(10).max(10),
    address: z.string().min(2).max(100),
    course: z.string().min(2).max(50),
    completed: z.string().min(2).max(50),
    batch: z.string().min(2).max(50),
    profilePic: z.string().min(2),
  });

  const defaultValues = {
    Sname: "",
    gender: "",
    fatherName: "",
    fatherContact: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    course: "",
    completed: "OnGoing",
    batch: "",
    profilePic: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await axios.post("/api/add-db", values);
    console.log(result.data);
    form.reset(defaultValues);
    toast({
      title: "Student Added",
    });
  }

  return (
    <div className="flex justify-center flex-col items-center w-full">
      <div className="flex justify-center mt-3">
        <div className="text-[72px]">Add Students</div>
      </div>
      <div className="flex justify-center mt-10">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-center flex-col gap-10"
            >
              <div className="grid grid-cols-2 gap-10">
                <FormField
                  control={form.control}
                  name="Sname"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Input placeholder="Male or Female" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Father{"'"}s Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Father's Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fatherContact"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Father{"'"}s Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="Father's Contact" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>phone</FormLabel>
                      <FormControl>
                        <Input placeholder="phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>address</FormLabel>
                      <FormControl>
                        <Input placeholder="address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>course</FormLabel>
                      <FormControl>
                        <Input placeholder="course" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="completed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Completed</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Is Course Completed" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="false">OnGoing</SelectItem>
                          <SelectItem value="true">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="batch"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>batch</FormLabel>
                      <FormControl>
                        <Input placeholder="batch" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profilePic"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <Input placeholder="Profile Picture" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Add Student</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
