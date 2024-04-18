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
    var { course, topic, subtopic, date, content, faculty } = await req.json();
    date = new Date(date);
    // convert course to lowercase and remove spaces
    course = course.toLowerCase().replace(/\s/g, "");

    const [result] = await pool.execute(
      "INSERT INTO topics (course, topic, subtopic, date, content, faculty) VALUES (?, ?, ?, ?, ?, ?)",
      [course, topic, subtopic, date, content, faculty]
    );

    console.log(result);
    console.log("Topic inserted successfully");

    return new Response(JSON.stringify(result));
  } catch (e) {
    console.log("There was an error in the POST request", e);
  }
}
