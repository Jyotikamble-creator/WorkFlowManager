import React from 'react';

const HistoryLog = ({ logs }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">History</h3>
      {logs?.length ? logs.map((log, i) => (
        <div key={i} className="text-sm border-b py-1">
          <p>{log.action} by {log.user?.username} on {new Date(log.timestamp).toLocaleString()}</p>
        </div>
      )) : <p>No history available.</p>}
    </div>
  );
};

export default HistoryLog;
