export const getTokenFromLocalStorage = () => {
    try {
      const serializedState = window.localStorage.getItem("token");
      if (serializedState === null) {
        return undefined;
      }
      return serializedState;
    } catch (err) {
      return undefined;
    }
  };
  
  export const setTokenToLocalStorage = (state: string) => {
  
    try {
      const serializedState = state;
      window.localStorage.setItem("token", serializedState);
    } catch (err) {
  
    }
  };
  
  export const removeToken = () =>{
    localStorage.removeItem('token');
  }