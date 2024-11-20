import React, { useEffect, useState } from "react";
import { getRequestLogs } from "./fetchInterceptor";
import "./APIRequestConsole.css";

const APIRequestConsole = () => {
  const [logs, setLogs] = useState([]);

  // Periodically fetch logs
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs([...getRequestLogs()]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="api-console">
      <h3>API Request Console</h3>
      <div className="logs">
        {logs.map((log, index) => (
          <div key={index} className="log-item">
            <p>
              <strong>{log.type.toUpperCase()}:</strong> {log.method || ""} {log.url || ""}
            </p>
            {log.status && <p><strong>Status:</strong> {log.status}</p>}
            {log.data && <pre>{JSON.stringify(log.data, null, 2)}</pre>}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default APIRequestConsole;
