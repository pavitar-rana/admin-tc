import mysql from "mysql2";
import Link from "next/link";

export default function Home() {
  const pool = mysql
    .createPool({
      host: "193.203.184.7",
      user: "u223830212_TenC",
      password: "Cam.pus123$",
      database: "u223830212_Students",
    })
    .promise();

  return (
    <div>
      <div className="flex justify-center text-[72px] font-bold">
        <div>TenC Students Admin</div>
      </div>

      <div className="flex mt-28 justify-center gap-20 text-[20px]">
        <Link
          className="border-gray-700 border p-2 rounded-lg cursor-pointer"
          href="/add-students"
        >
          Add Student
        </Link>
        <Link
          href="/edit-students"
          className="border-gray-700 border p-2 rounded-lg cursor-pointer"
        >
          Edit Student
        </Link>
        <div className="border-gray-700 border p-2 rounded-lg cursor-pointer">
          Remove Student
        </div>
        <Link
          href="/attendance"
          className="border-gray-700 border p-2 rounded-lg cursor-pointer"
        >
          Student's Attendance
        </Link>
        <Link
          href="/test"
          className="border-gray-700 border p-2 rounded-lg cursor-pointer"
        >
          Test Record
        </Link>
      </div>
    </div>
  );
}
