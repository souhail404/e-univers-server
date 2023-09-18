function dividePeriodIntoDays(startdate, enddate) {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    var startDateObj = new Date(startdate);
    var endDateObj = new Date(enddate);
  
    // Calculate the number of days in the period
    var numberOfDays = Math.round((endDateObj - startDateObj) / oneDay) + 1;
  
    if (numberOfDays > 12) {
      // If the period is over 12 days, divide it into 12 equal segments
      const segmentLength = Math.ceil(numberOfDays / 12);
      const dividedPeriod = [];
  
      for (let i = 0; i < 12; i++) {
        var segmentStart = new Date(startDateObj.getTime() + i * segmentLength * oneDay);
        var segmentEnd = new Date(startDateObj.getTime() + (i + 1) * segmentLength * oneDay - oneDay);
        segmentStart.setHours(1,0,0,0)
        segmentEnd.setHours(24,59,59,999)
        if(segmentEnd > endDateObj){
            segmentEnd = new Date(endDateObj)
            segmentEnd.setHours(24,59,59,999)
            segmentEnd.toISOString()
        }
        if(segmentStart < endDateObj){
            segmentStart.toISOString()
            segmentEnd.toISOString()
            dividedPeriod.push({currentDayStart: segmentStart, currentDayEnd: segmentEnd});
        }
        
      }
  
      return dividedPeriod;
    } 
    else {
        const dividedPeriod = [];
        if(numberOfDays < 7){
            numberOfDays= 7;
            startDateObj = new Date(endDateObj.getTime() - 7 * oneDay)
        }
        
        console.log(numberOfDays);
      for (let i = 0; i < numberOfDays; i++) {
        var currentDayStart = new Date(startDateObj.getTime() + i * oneDay);
        var currentDayEnd = new Date(startDateObj.getTime() + i * oneDay);
        currentDayStart.setHours(1,0,0,0)
        currentDayEnd.setHours(24,59,59,999)
        if(currentDayEnd > endDateObj){
            currentDayEnd = new Date(endDateObj)
            currentDayEnd.setHours(24,59,59,999)
            currentDayEnd.toISOString()
        }
        if(currentDayStart < endDateObj){
            currentDayStart.toISOString()
            currentDayEnd.toISOString()
            dividedPeriod.push({currentDayStart, currentDayEnd});
        }
      }
      
      return dividedPeriod;
    }
}
// function formatDate(date) {
// {day}/${month}/${year}`;
// }    // Format the date as 'DD/MM/YY'
//     const day = date.getDate();
//     const month = date.getMonth() + 1; // Month is zero-based
//     const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
  
//     return `$

  
module.exports = dividePeriodIntoDays;