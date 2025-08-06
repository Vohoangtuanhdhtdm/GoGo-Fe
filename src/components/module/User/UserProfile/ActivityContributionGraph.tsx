import ActivityCalendar from "react-activity-calendar";

const generateRandomData = () => {
  const today = new Date();
  const data = [];
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const count = Math.floor(Math.random() * 5);
    data.push({
      date: date.toISOString().slice(0, 10),
      count: count,
      level: count, // level từ 0-4 để tô màu
    });
  }
  return data;
};

const activityData = generateRandomData();

export const ActivityContributionGraph = () => {
  return (
    <div className="p-2">
      <div className="text-sm">
        <ActivityCalendar
          data={activityData}
          theme={{
            light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
            dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
          }}
          blockSize={14}
          blockMargin={4}
          fontSize={14}
          showWeekdayLabels
        />
      </div>
    </div>
  );
};
