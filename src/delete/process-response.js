module.exports = (body, statusCode) => {
    const status = statusCode || (body ? 200 : 204);
    const headers = { 'Content-Type': 'application/json' };

    return {
      statusCode: status,
      body: JSON.stringify(body) || '',
      headers: headers
    };
  };