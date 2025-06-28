const API_KEY = 'b2c1c990-395b-4ff2-a6d3-c5c458aa6e31';

exports.handler = async function () {
  try {
    const res = await fetch('https://api.pokemontcg.io/v2/sets', {
      headers: {
        'X-Api-Key': API_KEY
      }
    });

    const data = await res.json();

    const sets = data.data.map(set => ({
      name: set.name,
      setCode: set.id,
      logo: set.images.logo,
      baseCount: set.total,       // total cards in base set
      masterCount: set.printedTotal || set.total,
      sheetName: set.name.replace(/[^A-Za-z0-9]/g, '')
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(sets)
    };
  } catch (err) {
    console.error('Fetch error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch sets', details: err.message })
    };
  }
};
