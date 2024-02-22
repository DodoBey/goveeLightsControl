export const getApiKey = (itemKey: string) => {
  if (typeof window !== 'undefined') {
    const currAPIkey = localStorage.getItem(itemKey);

    if (!currAPIkey) {
      return null;
    }
    return currAPIkey;
  }
};

export const setApiKey = (itemKey: string, value: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(itemKey, value);
  }
};
