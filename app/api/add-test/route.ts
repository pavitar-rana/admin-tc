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
      id,
      Sname,
      batch,
      course,
      topic,
      totalMarks,
      obtainedMarks,
      internalMarks,
      practicalMarks,
      totalMarksP,
      totalInternalPM,
      date,
      present,
    } = await req.json();
    date = new Date(date);

    // const [result] = await pool.execute(
    //   "INSERT INTO students (poll_title, poll_category, start_date, end_date, min_reward, max_reward) VALUES (?, ?, ?, ?, ?, ?)",
    //   [pollTitle, pollCategory, startDate, endDate, minReward, maxReward]
    // );

    // CREATE TABLE tests (
    //     id INT NOT NULL,
    //     Sname VARCHAR(255) NOT NULL,
    //     batch VARCHAR(255) NOT NULL,
    //     course VARCHAR(255) NOT NULL,
    //     topic VARCHAR(255) NOT NULL,
    //     totalMarks INT NOT NULL,
    //     obtainedMarks INT NOT NULL,
    //     internalMarks INT NOT NULL,
    //     practicalMarks INT NOT NULL,
    //     totalMarksP INT NOT NULL,
    //     totalInternalPM INT NOT NULL,
    //     date DATE NOT NULL,
    //     present BOOLEAN NOT NULL DEFAULT false,
    //     PRIMARY KEY (id, date)
    //   );

    const [result] = await pool.execute(
      "INSERT INTO tests (id, Sname, batch, course, topic, totalMarks, obtainedMarks, internalMarks, practicalMarks, totalMarksP, totalInternalPM, date, present) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        Sname,
        batch,
        course,
        topic,
        totalMarks,
        obtainedMarks,
        internalMarks,
        practicalMarks,
        totalMarksP,
        totalInternalPM,
        date,
        present,
      ]
    );

    console.log(result);
    console.log("Data inserted successfully");

    return new Response(JSON.stringify(result));
  } catch (e) {
    console.log("There was an error in the POST request", e);
  }
}
