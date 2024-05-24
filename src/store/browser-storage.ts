const STORAGE_KEY = "reduxState";

export const loadState = (): any => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};

export const saveState = (state: any): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};
