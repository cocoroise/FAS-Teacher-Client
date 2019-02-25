// Operation Cookie
export function getCookie(name) {
  const reg = new RegExp(`(^| )${name}'=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) {
    return decodeURIComponent(arr[2]);
  }
  return null;
}

export function delCookie({ name, domain, path }) {
  if (getCookie(name)) {
    document.cookie = `${name}=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=${path}; domain=${domain}`;
  }
}

// Operation LocalStorage
export function setLocalStorage(key, value) {
  const nowTime = new Date().getTime();
  return localStorage.setItem(
    key,
    JSON.stringify({
      data: value,
      time: nowTime,
    })
  );
}

export function getLocalStorage(key, t = 3) {
  let value = JSON.parse(localStorage.getItem(key));
  if (!value) return false;
  // value = JSON.parse(value);
  const overTime = new Date().getTime() - value.time > 3600 * 24 * 1000 * t;
  if (!overTime) return value.data;
    localStorage.removeItem(key);
    return false;
}

export function deleteLocalStorage(key) {
  return localStorage.removeItem(key);
}
