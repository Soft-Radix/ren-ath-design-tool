// ========== local storage functions  ===============
export const setUserLocalData = (data) => {
  const dataStringify = JSON.stringify(data.user);
  const token = data.access_token;
  localStorage.setItem("UniFormDesign_userInfo", dataStringify);
  localStorage.setItem("UniFormDesign_token", token);
};
export const setAdminLocalData = (data) => {
  const dataStringify = JSON.stringify(data.user);
  const token = data.access_token;
  localStorage.setItem("UniFormDesign_adminInfo", dataStringify);
  localStorage.setItem("UniFormDesign_token_admin", token);
};
export const getUserLocalInfo = () => {
  const stringifyData = localStorage.getItem("UniFormDesign_userInfo");
  const jsonData = stringifyData ? JSON.parse(stringifyData) : null;
  return jsonData;
};
export const getAdminLocalInfo = () => {
  const stringifyData = localStorage.getItem("UniFormDesign_adminInfo");
  const jsonData = stringifyData ? JSON.parse(stringifyData) : null;
  return jsonData;
};
export const getAdminLocalData = () => {
  const token = localStorage.getItem("UniFormDesign_token_admin");
  return token;
};
export const getUserLocalData = () => {
  const token = localStorage.getItem("UniFormDesign_token");
  return token;
};
export const clearAdminLocalData = () => {
  localStorage.removeItem("UniFormDesign_adminInfo");
  localStorage.removeItem("UniFormDesign_token_admin");
};
export const clearUserLocalData = () => {
  localStorage.removeItem("UniFormDesign_userInfo");
  localStorage.removeItem("UniFormDesign_token");
  sessionStorage.removeItem("rm_accountTab");
};
