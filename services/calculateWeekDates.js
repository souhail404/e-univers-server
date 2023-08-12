const calculateWeekDates = (date) => {
    const currentDay = date.getDay();
    const selectedWeekStart = new Date(date);
    selectedWeekStart.setDate(date.getDate() - currentDay);
    selectedWeekStart.setHours(2, 0, 0)
  
    const selectedWeekEnd = new Date(date);
    selectedWeekEnd.setDate(date.getDate() + (6 - currentDay));
    selectedWeekEnd.setHours(23+2,59,59)
  
    const previousWeekStart = new Date(selectedWeekStart);
    previousWeekStart.setDate(selectedWeekStart.getDate() - 7);
  
    const previousWeekEnd = new Date(selectedWeekEnd);
    previousWeekEnd.setDate(selectedWeekEnd.getDate() - 7);
    return {
      currentWeekStart: selectedWeekStart,
      currentWeekEnd: selectedWeekEnd,
      previousWeekStart,
      previousWeekEnd
    };
    
};

module.exports = calculateWeekDates;