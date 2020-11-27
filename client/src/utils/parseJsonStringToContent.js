export const parseJsonStringToContent = (contentString) => {
  const contentArray = JSON.parse(contentString);

  let finalContentString = "";

  contentArray.map((line) => {
    finalContentString += line.text;
  });

  return finalContentString;
};
