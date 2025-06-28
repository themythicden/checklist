const SHEET_NAMES = {
  JourneyTogether: 'JourneyTogether',
  TemporalForces: 'TemporalForces',
  ObsidianFlames: 'ObsidianFlames'
};

exports.handler = async function (event) {
  const sheetName = SHEET_NAMES[event.queryStringParameters.set] || 'JourneyTogether';
  const url = `YOUR_APPSCRIPT_URL?sheet=${encodeURIComponent(sheetName)}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: event.body,
      headers: { 'Content-Type': 'application/json' }
    });

    return {
      statusCode: 200,
      body: await response.text()
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save data', details: error.message })
    };
  }
};
