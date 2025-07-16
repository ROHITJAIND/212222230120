export function logEvent(eventType, data) {
  const logEntry = {
    eventType,
    data,
    timestamp: new Date().toISOString(),
  };
  let logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push(logEntry);
  localStorage.setItem('logs', JSON.stringify(logs));
}