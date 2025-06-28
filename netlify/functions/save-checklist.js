const fetch = require("node-fetch");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const data = JSON.parse(event.body);
  const set = data.set || "JourneyTogether"; // required to determine correct sheet

  const url = `https://script.google.com/macros/s/AKfycbzGyOrVGm3WRC34j34QKA2cjJA1upq9drnnOtXhRXedyT5SqFTjMMm-OgUNecfJd5YhRA/exec`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, sheet: set }),
    });

    const text = await response.text();
    return {
      statusCode: 200,
      body: text,
    };
  } catch (error) {
    console.error("Save failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save checklist", details: error.message }),
    };
  }
};
