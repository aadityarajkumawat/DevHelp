import React, { Fragment } from "react";

export const parseJsonStringToContent = (contentString) => {
  const contentArray = JSON.parse(contentString);

  let finalContent = [];
  let stringifiedStyles = [];
  let finalStylesArray = [];

  for (let i = 0; i < contentArray.length; i++) {
    const { inlineStyleRanges, text } = contentArray[i];
    if (inlineStyleRanges.length === 0 && text !== "") {
      stringifiedStyles.push({ lineNumber: i, content: "no-styles" });
    } else if (text === "") {
      stringifiedStyles.push({ lineNumber: i, content: "empty" });
    } else {
      for (let j = 0; j < inlineStyleRanges.length; j++) {
        stringifiedStyles.push({
          lineNumber: i,
          content: JSON.stringify(inlineStyleRanges[j]).substring(
            1,
            JSON.stringify(inlineStyleRanges[j]).indexOf("style") - 2
          ),
          styleI: inlineStyleRanges[j].style,
          originalStyles: inlineStyleRanges[j],
          count: 0,
        });
      }
    }
  }

  if (finalStylesArray.length === 0 && stringifiedStyles.length > 0) {
    finalStylesArray.push(stringifiedStyles[0]);
  }

  for (let i = 0; i < stringifiedStyles.length; i++) {
    let sty = stringifiedStyles[i];
    let found = false;
    for (let j = 0; j < finalStylesArray.length; j++) {
      if (
        finalStylesArray[j].content === sty.content &&
        finalStylesArray[j].lineNumber === sty.lineNumber
      ) {
        found = true;
      }
      if (
        finalStylesArray[j].content === sty.content &&
        finalStylesArray[j].lineNumber === sty.lineNumber &&
        finalStylesArray[j].styleI !== sty.styleI
      ) {
        finalStylesArray[j].count++;
        finalStylesArray[j].styleI = "BOLD+ITALIC";
      }
    }

    if (!found) {
      finalStylesArray.push(sty);
    }
  }

  console.log({ finalStylesArray, contentArray });

  for (let i = 0; i < contentArray.length; i++) {
    let { text, inlineStyleRanges, key } = contentArray[i];
    if (text.length === 0) {
      finalContent.push(
        <Fragment>
          <br />
          <br />
        </Fragment>
      );
    } else {
      let finalLine = [];
      for (let j = 0; j < finalStylesArray.length; j++) {
        if (finalStylesArray[j].lineNumber === i) {
          if (finalStylesArray[i].content === "no-styles") {
            finalLine.push(<span>{text}</span>);
          } else {
            console.log(finalStylesArray[j], j, i);
            if (finalStylesArray[j].styleI === "BOLD") {
              /**
               **   IF
               *
               *  - there is no style
               *  - after the current style
               *
               **   ELSE IF
               *
               *  - there was a style before it
               *  - so continue adding styles
               *
               **   ELSE
               *
               *  - This is the only style for this line
               */
              // console.log("bold");
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                // console.log("yes was before it", "b");
                finalLine.push(
                  <span>
                    {text.substring(
                      finalStylesArray[j - 1].originalStyles.offset +
                        finalStylesArray[j - 1].originalStyles.length,
                      finalStylesArray[j].originalStyles.offset
                    )}
                    <strong>
                      {text.substring(
                        finalStylesArray[j].originalStyles.offset,
                        finalStylesArray[j].originalStyles.offset +
                          finalStylesArray[j].originalStyles.length
                      )}
                    </strong>
                  </span>
                );

                if (
                  !(
                    finalStylesArray[j + 1] &&
                    finalStylesArray[j + 1].lineNumber === i
                  )
                ) {
                  finalLine.push(
                    <span>
                      {text.substring(
                        finalStylesArray[j].originalStyles.offset +
                          finalStylesArray[j].originalStyles.length,
                        text.length
                      )}
                    </span>
                  );
                }
              } else {
                // console.log("the only one", "b");
                finalLine.push(
                  <span>
                    {text.substring(
                      0,
                      finalStylesArray[j].originalStyles.offset
                    )}
                    <strong>
                      {text.substring(
                        finalStylesArray[j].originalStyles.offset,
                        finalStylesArray[j].originalStyles.offset +
                          finalStylesArray[j].originalStyles.length
                      )}
                    </strong>
                  </span>
                );

                if (
                  !(
                    finalStylesArray[j + 1] &&
                    finalStylesArray[j + 1].lineNumber === i
                  )
                ) {
                  finalLine.push(
                    <span>
                      {text.substring(
                        finalStylesArray[j].originalStyles.offset +
                          finalStylesArray[j].originalStyles.length,
                        text.length
                      )}
                    </span>
                  );
                }
              }
            } else if (finalStylesArray[j].styleI === "ITALIC") {
              // console.log("italic");
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                // console.log("yes was before it", "i");
                finalLine.push(
                  <span>
                    {text.substring(
                      finalStylesArray[j - 1].originalStyles.offset +
                        finalStylesArray[j - 1].originalStyles.length,
                      finalStylesArray[j].originalStyles.offset
                    )}
                    <i>
                      {text.substring(
                        finalStylesArray[j].originalStyles.offset,
                        finalStylesArray[j].originalStyles.offset +
                          finalStylesArray[j].originalStyles.length
                      )}
                    </i>
                  </span>
                );

                if (
                  !(
                    finalStylesArray[j + 1] &&
                    finalStylesArray[j + 1].lineNumber === i
                  )
                ) {
                  finalLine.push(
                    <span>
                      {text.substring(
                        finalStylesArray[j].originalStyles.offset +
                          finalStylesArray[j].originalStyles.length,
                        text.length
                      )}
                    </span>
                  );
                }
              } else {
                // console.log("the only one", "i");
                finalLine.push(
                  <span>
                    {text.substring(
                      0,
                      finalStylesArray[j].originalStyles.offset
                    )}
                    <i>
                      {text.substring(
                        finalStylesArray[j].originalStyles.offset,
                        finalStylesArray[j].originalStyles.offset +
                          finalStylesArray[j].originalStyles.length
                      )}
                    </i>
                  </span>
                );

                if (
                  !(
                    finalStylesArray[j + 1] &&
                    finalStylesArray[j + 1].lineNumber === i
                  )
                ) {
                  finalLine.push(
                    <span>
                      {text.substring(
                        finalStylesArray[j].originalStyles.offset +
                          finalStylesArray[j].originalStyles.length,
                        text.length
                      )}
                    </span>
                  );
                }
              }
            } else {
              // console.log("bold+italic");
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                // console.log("yes was before it", "bi");
                finalLine.push(
                  <span>
                    {text.substring(
                      finalStylesArray[j - 1].originalStyles.offset +
                        finalStylesArray[j - 1].originalStyles.length,
                      finalStylesArray[j].originalStyles.offset
                    )}
                    <strong>
                      <i>
                        {text.substring(
                          finalStylesArray[j].originalStyles.offset,
                          finalStylesArray[j].originalStyles.offset +
                            finalStylesArray[j].originalStyles.length
                        )}
                      </i>
                    </strong>
                  </span>
                );

                if (
                  !(
                    finalStylesArray[j + 1] &&
                    finalStylesArray[j + 1].lineNumber === i
                  )
                ) {
                  finalLine.push(
                    <span>
                      {text.substring(
                        finalStylesArray[j].originalStyles.offset +
                          finalStylesArray[j].originalStyles.length,
                        text.length
                      )}
                    </span>
                  );
                }
              } else {
                // console.log("the only one", "bi");
                finalLine.push(
                  <span>
                    {text.substring(
                      0,
                      finalStylesArray[j].originalStyles.offset
                    )}
                    <strong>
                      <i>
                        {text.substring(
                          finalStylesArray[j].originalStyles.offset,
                          finalStylesArray[j].originalStyles.offset +
                            finalStylesArray[j].originalStyles.length
                        )}
                      </i>
                    </strong>
                  </span>
                );

                if (
                  !(
                    finalStylesArray[j + 1] &&
                    finalStylesArray[j + 1].lineNumber === i
                  )
                ) {
                  finalLine.push(
                    <span>
                      {text.substring(
                        finalStylesArray[j].originalStyles.offset +
                          finalStylesArray[j].originalStyles.length,
                        text.length
                      )}
                    </span>
                  );
                }
              }
            }
          }
        }
      }

      finalContent.push(<span>{finalLine}</span>);
    }
  }

  return finalContent;
};
