let requestLogs = []; // Global array to store logs

export const getRequestLogs = () => requestLogs; // Function to retrieve logs

// Intercept fetch
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const [url, options] = args;

  // Log request details
  const requestLog = {
    type: "request",
    url,
    method: options?.method || "GET",
    headers: options?.headers,
    body: options?.body,
    timestamp: new Date(),
  };

  requestLogs.push(requestLog);

  try {
    // Perform the actual fetch
    const response = await originalFetch(...args);

    // Log response details
    const responseClone = response.clone();
    const responseLog = {
      type: "response",
      url,
      status: response.status,
      statusText: response.statusText,
      data: await responseClone.json().catch(() => null), // Parse JSON if possible
      timestamp: new Date(),
    };

    requestLogs.push(responseLog);

    return response;
  } catch (error) {
    // Log fetch error
    requestLogs.push({
      type: "error",
      url,
      error: error.message,
      timestamp: new Date(),
    });

    throw error;
  }
};
