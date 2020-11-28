import React from "react";

export const parseJsonStringToContent = (contentString) => {
  const contentArray = JSON.parse(contentString);
  let finalContent = [];

  for (let i = 0; i < contentArray.length; i++) {
    let { text, inlineStyleRanges, key } = contentArray[i];
    if (text !== "" || text !== " ") {
      let finalLine = [];
      if (inlineStyleRanges.length > 0) {
        for (let j = 0; j < inlineStyleRanges.length; j++) {
          if (
            inlineStyleRanges[i] !== undefined &&
            inlineStyleRanges[i].style === "BOLD"
          ) {
            if (i === 0) {
              finalLine.push(
                <span>{text.substring(0, inlineStyleRanges[i].offset)}</span>
              );
              finalLine.push(
                <strong>
                  {text.substring(
                    inlineStyleRanges[i].offset,
                    inlineStyleRanges[i].offset + inlineStyleRanges[i].length
                  )}
                </strong>
              );
            } else {
              finalLine.push(
                <span>
                  {text.substring(
                    inlineStyleRanges[i - 1].offset +
                      inlineStyleRanges[i - 1].length,
                    inlineStyleRanges[i].offset
                  )}
                </span>
              );
              finalLine.push(
                <strong>
                  {text.substring(
                    inlineStyleRanges[i].offset,
                    inlineStyleRanges[i].offset + inlineStyleRanges[i].length
                  )}
                </strong>
              );
            }
          } else if (
            inlineStyleRanges[i] !== undefined &&
            inlineStyleRanges[i].style === "ITALIC"
          ) {
            if (i === 0) {
              finalLine.push(
                <span>{text.substring(0, inlineStyleRanges[i].offset)}</span>
              );
              finalLine.push(
                <i>
                  {text.substring(
                    inlineStyleRanges[i].offset,
                    inlineStyleRanges[i].offset + inlineStyleRanges[i].length
                  )}
                </i>
              );
            } else {
              finalLine.push(
                <span>
                  {text.substring(
                    inlineStyleRanges[i - 1].offset +
                      inlineStyleRanges[i - 1].length,
                    inlineStyleRanges[i].offset
                  )}
                </span>
              );
              finalLine.push(
                <i>
                  {text.substring(
                    inlineStyleRanges[i].offset,
                    inlineStyleRanges[i].offset + inlineStyleRanges[i].length
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
      finalContent.push(<br />);
    }
  }

  return finalContent;
};
