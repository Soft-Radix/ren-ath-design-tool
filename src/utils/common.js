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
  localStorage.removeItem("colorPelleteCollection");
  sessionStorage.removeItem("rm_accountTab");
};

export const setUserColorPellete = (data) => {
  const stringifyData = JSON.stringify(data);
  localStorage.setItem("colorPelleteCollection", stringifyData);
};

export const setUserColorPelleteTemporary = (data) => {
  const stringifyData = JSON.stringify(data);
  localStorage.setItem("colorPelleteCollectionTemporary", stringifyData);
};

export const getUserColorPelleteTemporary = () => {
  const getColorPellete = localStorage.getItem(
    "colorPelleteCollectionTemporary"
  );
  return getColorPellete ? JSON.parse(getColorPellete) : null;
};

export const getUserColorPellete = () => {
  const getColorPellete = localStorage.getItem("colorPelleteCollection");
  return getColorPellete ? JSON.parse(getColorPellete) : null;
};
