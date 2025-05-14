import { PersistenceOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} pick 需要持久化的 state name
 * @return persist
 * */
const piniaPersistConfig = (key: string, pick?: string[]) => {
  console.log("key:", key, pick);
  const persist: PersistenceOptions = {
    key,
    pick,
    debug: true,
    // storage: sessionStorage,
    storage: localStorage,
    beforeHydrate: (state) => {
      console.log("Before restore:", state); // 打印恢复前的 state
    },
    afterHydrate: (state) => {
      console.log("After restore:", state); // 打印恢复后的 state
    },
  };
  return persist;
};

export default piniaPersistConfig;
