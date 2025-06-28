const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const DEFAULT_SET = 'journey-together'; // fallback if no ?set param is passed
  const params = new URLSearchParams(event.rawQuery || '');
  const set = params.get('set') || DEFAULT_SET;

  const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzGyOrVGm3WRC34j34QKA2cjJA1upq9drnnOtXhRXedyT5SqFTjMMm-OgUNecfJd5YhRA/exec';
  const url = `${GOOGLE_SHEET_WEBAPP_URL}?set=${set}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data", details: error.message }),
    };
  }
};
