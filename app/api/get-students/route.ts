import mysql from "mysql2";

export async function GET(req: Request) {
  const pool = mysql
    .createPool({
      host: "193.203.184.7",
      user: "u223830212_TenC",
      password: "Cam.pus123$",
      database: "u223830212_Students",
    })
    .promise();

  try {
    const [result] = await pool.execute(
      "SELECT * FROM student WHERE completed = false"
    );

    console.log(result);
    console.log("Got students successfully");

    return new Response(JSON.stringify(result));
  } catch (e) {
    console.log("There was an error in the POST request", e);
  }
}
