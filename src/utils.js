export const arrayGenerator = (selectedMode) => {
    const randomGenerator = (_, i) => ({
      ID: i,
      isHiglight: "grey",
    });
    const params = Array(selectedMode * selectedMode)
      .fill(null)
      .map(randomGenerator);
    return params;
  };

export const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  export const makeGetRandomElement = (initialArray) => {
    let arr;
    const randomIndex = () => Math.floor(Math.random() * arr.length);
    const reinitArray = () => {
      arr = initialArray.slice();
    };
    reinitArray();
    const getRandomElement = () => {
      if (arr.length === 0) reinitArray();
      return arr.splice(randomIndex(), 1)[0];
    };
    return getRandomElement;
  };