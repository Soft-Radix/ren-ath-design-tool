// ========== local storage functions  ===============
export const setUserLocalData = (data) => {
  const dataStringify = JSON.stringify(data.user);
  const token = data.access_token;
  localStorage.setItem("UniFormDesign_userInfo", dataStringify);
  localStorage.setItem("UniFormDesign_token", token);
};
export const getUserLocalInfo = () => {
  const stringifyData = localStorage.getItem("UniFormDesign_userInfo");
  const jsonData = stringifyData ? JSON.parse(stringifyData) : null;
  return jsonData;
};
export const getUserLocalData = () => {
  const token = localStorage.getItem("UniFormDesign_token");
  return token;
};
export const clearUserLocalData = () => {
  localStorage.removeItem("UniFormDesign_userInfo");
  localStorage.removeItem("UniFormDesign_token");
  sessionStorage.removeItem("rm_accountTab");
};
