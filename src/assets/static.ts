function URL(date: string, page: number) {
  return `https://api.github.com/search/repositories?q=created:${date}&sort=stars&order=desc&page=${page}`;
}

export default URL;
