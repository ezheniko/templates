export default function fetchMock(data) {
  if (data && data.length) {
    window.localStorage.setItem('ardasTestTaskYVK', JSON.stringify(data));
    return;
  }
  return JSON.parse(window.localStorage.getItem('ardasTestTaskYVK'));
}