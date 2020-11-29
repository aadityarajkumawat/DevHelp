import React, { Fragment } from "react";

export const parseJsonStringToContent = (contentString) => {
  const contentArray = JSON.parse(contentString);

  console.log(contentArray);
  let finalContent = [];

  let stringifiedStyles = [];
  let finalStylesArray = [];

  for (let i = 0; i < contentArray.length; i++) {
    const { inlineStyleRanges } = contentArray[i];
    if (inlineStyleRanges.length === 0) {
      stringifiedStyles.push({ lineNumber: i, content: "no-styles" });
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

  console.log({ stringifiedStyles });

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
      }
    }

    if (!found) {
      finalStylesArray.push(sty);
    }
  }

  // console.log({ finalStylesArray });

  for (let i = 0; i < contentArray.length; i++) {
    let { text, inlineStyleRanges, key } = contentArray[i];
    if (text.length !== 0) {
      let finalLine = [];
      if (finalStylesArray.length > 0) {
        for (let j = 0; j < finalStylesArray.length; j++) {
          if (finalStylesArray[j].count === 0) {
            if (finalStylesArray[j].styleI === "BOLD") {
              if (j > 0) {
                /**
                 * #######-(offet)-****-(offset + length)-########
                 */
                finalLine.push(
                  <span>
                    {text.substring(
                      inlineStyleRanges[j - 1].offset,
                      inlineStyleRanges[j].offset
                    )}
                    <strong>
                      {text.substring(
                        inlineStyleRanges[j].offset,
                        inlineStyleRanges[j].offset +
                          inlineStyleRanges[j].length
                      )}
                    </strong>
                  </span>
                );
              } else {
                finalLine.push(
                  <span>
                    {text.substring(0, inlineStyleRanges[j].offset)}
                    <strong>
                      {text.substring(
                        inlineStyleRanges[j].offset,
                        inlineStyleRanges[j].offset +
                          inlineStyleRanges[j].length
                      )}
                    </strong>
                  </span>
                );
              }
            } else if (finalStylesArray[j].styleI === "ITALIC") {
              if (
                j > 0 &&
                inlineStyleRanges[j - 1] !== undefined &&
                inlineStyleRanges[j] !== undefined
              ) {
                finalLine.push(
                  <span>
                    {text.substring(
                      inlineStyleRanges[j - 1].offset,
                      inlineStyleRanges[j].offset
                    )}
                    <i>
                      {text.substring(
                        inlineStyleRanges[j].offset,
                        inlineStyleRanges[j].offset +
                          inlineStyleRanges[j].length
                      )}
                    </i>
                  </span>
                );
              } else if (inlineStyleRanges[j].offset !== undefined) {
                finalLine.push(
                  <span>
                    {text.substring(0, inlineStyleRanges[j].offset)}
                    <i>
                      {text.substring(
                        inlineStyleRanges[j].offset,
                        inlineStyleRanges[j].offset +
                          inlineStyleRanges[j].length
                      )}
                    </i>
                  </span>
                );
              }
            }
          } else if (finalStylesArray[j].count === 1) {
            if (
              j > 0 &&
              inlineStyleRanges[j] !== undefined &&
              inlineStyleRanges[j - 1] !== undefined
            ) {
              finalLine.push(
                <span>
                  {text.substring(
                    inlineStyleRanges[j - 1].offset,
                    inlineStyleRanges[j].offset
                  )}
                  <strong>
                    <i>
                      {text.substring(
                        inlineStyleRanges[j].offset,
                        inlineStyleRanges[j].offset +
                          inlineStyleRanges[j].length
                      )}
                    </i>
                  </strong>
                </span>
              );
            } else if (inlineStyleRanges[j] !== undefined) {
              finalLine.push(
                <span>
                  {text.substring(0, inlineStyleRanges[j].offset)}
                  <strong>
                    <i>
                      {text.substring(
                        inlineStyleRanges[j].offset,
                        inlineStyleRanges[j].offset +
                          inlineStyleRanges[j].length
                      )}
                    </i>
                  </strong>
                </span>
              );
            }
          }
        }
      } else {
        finalContent.push(<span>{text}</span>);
      }

      finalContent.push(<span key={key}>{finalLine}</span>);
    } else {
      finalContent.push(
        <Fragment>
          <br />
          <br />
        </Fragment>
      );
    }
  }

  return finalContent;
};
