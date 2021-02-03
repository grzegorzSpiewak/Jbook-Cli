export const serve = (port: number, filename: string, dir: string): void => {
  console.log('serving traffic on port:', port);
  console.log('storing data from cells in', filename);
  console.log('that file is in dir', dir);
};