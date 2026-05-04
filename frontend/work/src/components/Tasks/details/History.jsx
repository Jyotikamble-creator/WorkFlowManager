import React from 'react';

// HistoryLog component to display a list of task history logs
const HistoryLog = ({ logs }) => {
  return (
    <div className="mt-8 border-t pt-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">📜 Task History</h3>

      {logs?.length ? (
        <div className="space-y-2">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-3 rounded">
              <span className="text-lg">•</span>
              <span><strong>{log.by?.name || 'System'}</strong> {log.action}</span>
              <span className="ml-auto text-gray-500 text-xs">{new Date(log.at).toLocaleString()}</span>
            </div>
          ))}
        </div>
      ) : <p className="text-gray-600 text-center py-8">No history yet</p>}
    </div>
  );
};

export default HistoryLog;
