const SHEET_NAMES = {
  JourneyTogether: 'JourneyTogether',
  TemporalForces: 'TemporalForces',
  ObsidianFlames: 'ObsidianFlames'
};

exports.handler = async function (event) {
  const sheetName = SHEET_NAMES[event.queryStringParameters.set] || 'JourneyTogether';

  const url = `YOUR_APPSCRIPT_URL?sheet=${encodeURIComponent(sheetName)}`;

  try {
    const response = await fetch(url);
    const json = await response.json();

    if (!Array.isArray(json)) {
      throw new Error("Invalid sheet data returned");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(json)
    };
  } catch (error) {
    console.error('Fetch failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data', details: error.message })
    };
  }
};
