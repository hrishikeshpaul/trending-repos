/**
 * A function to build the URL based on the last 30 days date
 * and the page number
 * 
 * @param date Date 30 days ago
 * @param page Page number
 * 
 * @returns URL string
 */
function URL(date: string, page: number): string {
  return `https://api.github.com/search/repositories?q=created:${date}&sort=stars&order=desc&page=${page}`;
}

export default URL;
