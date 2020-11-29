import React, { Fragment } from "react";

export const parseJsonStringToContent = (contentString) => {
  const contentArray = JSON.parse(contentString);
  let finalContent = [];

  let stringifiedStyles = [];
  let finalStylesArray = [];

  // Combining Inline Styles
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
          count: 0
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

  console.log({ finalStylesArray });

  for (let i = 0; i < contentArray.length; i++) {
    let { text, inlineStyleRanges, key } = contentArray[i];
    if (text.length !== 0) {
      let finalLine = [];
      if (inlineStyleRanges.length > 0) {
        for (let j = 0; j < inlineStyleRanges.length; j++) {
          if (inlineStyleRanges[j].style === "BOLD") {
            if (j === 0) {
              finalLine.push(
                <span>{text.substring(j, inlineStyleRanges[j].offset)}</span>
              );
              finalLine.push(
                <strong>
                  {text.substring(
                    inlineStyleRanges[j].offset,
                    inlineStyleRanges[j].offset + inlineStyleRanges[j].length
                  ) + " "}
                </strong>
              );
            } else {
              finalLine.push(
                <span>
                  {text.substring(
                    inlineStyleRanges[j - 1].offset +
                      inlineStyleRanges[j - 1].length,
                    inlineStyleRanges[j].offset
                  )}
                </span>
              );
              finalLine.push(
                <strong>
                  {text.substring(
                    inlineStyleRanges[j].offset,
                    inlineStyleRanges[j].offset + inlineStyleRanges[j].length
                  )}
                </strong>
              );
            }
          } else if (inlineStyleRanges[j].style === "ITALIC") {
            if (j === 0) {
              finalLine.push(
                <span>{text.substring(0, inlineStyleRanges[j].offset)}</span>
              );
              finalLine.push(
                <i>
                  {text.substring(
                    inlineStyleRanges[j].offset,
                    inlineStyleRanges[j].offset + inlineStyleRanges[j].length
                  )}
                </i>
              );
            } else if (inlineStyleRanges[j - 1] !== undefined) {
              finalLine.push(
                <span>
                  {text.substring(
                    inlineStyleRanges[j - 1].offset +
                      inlineStyleRanges[j - 1].length,
                    inlineStyleRanges[j].offset
                  )}
                </span>
              );
              finalLine.push(
                <i>
                  {text.substring(
                    inlineStyleRanges[j].offset,
                    inlineStyleRanges[j].offset + inlineStyleRanges[j].length
                  )}
                </i>
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
