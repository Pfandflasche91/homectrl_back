import database from '../database.js'; 

/**
 * Function to find the measurement closest to a desired timestamp
 * @param targetStartDatetime - Target timestamp as an ISO 8601 string (e.g., '2021-11-12T22:12:00Z')
 * @returns The measurement closest to the target timestamp
 */

export async function getClosestMeasurement(targetDatetime: string) {
  const query = `
    SELECT *, ABS(TIMESTAMPDIFF(MINUTE, DATETIME, ?)) AS time_diff
    FROM DHT11
    ORDER BY time_diff ASC
    LIMIT 1;
  `;

  try {
    const [result] = await database.execute(query,[targetDatetime]);
    //console.log("getClosestMeasurement : TargetDatetime:"+ targetDatetime + " --- closest Datetime:" + result.DATETIME);
   return result;  
  } catch (error) {
    console.error("Error while retrieving the closest measurement:", error);
    throw error;
  }
}