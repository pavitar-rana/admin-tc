import mysql from "mysql2";

export async function POST(req: Request) {
  const pool = mysql
    .createPool({
      host: "193.203.184.7",
      user: "u223830212_TenC",
      password: "Cam.pus123$",
      database: "u223830212_Students",
    })
    .promise();

  try {
    var {
      Sname,
      gender,
      fatherName,
      fatherContact,
      password,
      email,
      phone,
      address,
      course,
      completed,
      batch,
      profilePic,
    } = await req.json();

    course = course.toLowerCase().replace(/\s/g, "");

    // const [result] = await pool.execute(
    //   "INSERT INTO students (poll_title, poll_category, start_date, end_date, min_reward, max_reward) VALUES (?, ?, ?, ?, ?, ?)",
    //   [pollTitle, pollCategory, startDate, endDate, minReward, maxReward]
    // );

    const [result] = await pool.execute(
      "INSERT INTO student (Sname, gender, fatherName, fatherContact, password, email, phone, address, course, completed, batch, profilePic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        Sname,
        gender,
        fatherName,
        fatherContact,
        password,
        email,
        phone,
        address,
        course,
        completed,
        batch,
        profilePic,
      ]
    );

    console.log(result);
    console.log("Data inserted successfully");

    return new Response(JSON.stringify(result));
  } catch (e) {
    console.log("There was an error in the POST request", e);
  }
}
