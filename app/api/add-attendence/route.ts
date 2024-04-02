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
      date,
      present,
      onLeave,
      inTime,
      outTime,
      reason,
      holiday,
    } = await req.json();

    console.log(
      id,
      Sname,
      date,
      present,
      onLeave,
      inTime,
      outTime,
      reason,
      holiday
    );
    if (present === "true") {
      present = 1;
    }
    // if (present === "false") {
    //   const [result2] = await pool.execute(
    //     "INSERT INTO test (id, Sname, date, present) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE present = VALUES(present)",
    //     [id, Sname, new Date(date), 0]
    //   );
    // }

    if (onLeave === "true") {
      onLeave = 1;
      // const [result2] = await pool.execute(
      //   "INSERT INTO test (id, Sname, date, present) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE present = VALUES(present)",
      //   [id, Sname, new Date(date), 0]
      // );
    }
    if (holiday === "true") {
      holiday = 1;
    }

    const [result] = await pool.execute(
      "INSERT INTO attendance (id, Sname, date, present, onLeave, inTime, outTime, reason, holiday) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        Sname,
        new Date(date),
        present,
        onLeave,
        inTime,
        outTime,
        reason,
        holiday,
      ]
    );

    console.log(result);
    console.log("Attendence Done successfully");

    return new Response(JSON.stringify(result));
  } catch (e) {
    console.log("There was an error in the POST request", e);
  }
}
