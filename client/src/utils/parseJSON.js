const parseJSON = (jsonOutput) => {
  let theHtmlString = "";
  jsonOutput.blocks.forEach((block) => {
    switch (block.type) {
      case "header":
        theHtmlString += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        break;
      case "paragraph":
        theHtmlString += `<p>${block.data.text}</p>`;
        break;
      case "image":
        theHtmlString += `<img src=${block.data.url}></img>`;
        break;
      case "code":
        theHtmlString += `<code>${block.data.code}</code>`;
        break;
      default:
        const i = 0;
        i++;
    }
  });

  return theHtmlString;
};

export default parseJSON;

// Struture of object from which the data is being fetched

/*
{
    blocks: [
        {`
            type: 'header',
            data: {text: 'the URI', level: 2}
        },
        {
            // ...other block objects
        }`
    ]
}
*/
