const Clock = ({ dateTime }) => {
  return (
    <div className="timer-container">
      <div className="timer-content">
        <p className="mode-label">Current Time</p>
        <time className="timer-display">{dateTime}</time>
      </div>
    </div>
  );
};
export default Clock;
