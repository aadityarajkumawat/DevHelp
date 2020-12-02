import React, { Fragment } from "react";
import { v4 as uid } from "uuid";
import {
  BOLD_ITALIC,
  EMPTY_STYLE,
  ITALIC,
  NO_STYLE,
  STRONG,
} from "./constants";

export const parseJsonStringToContent = (contentString) => {
  const contentArray = JSON.parse(contentString);

  let finalContent = [];
  let stringifiedStyles = [];
  let finalStylesArray = [];

  for (let i = 0; i < contentArray.length; i++) {
    const { inlineStyleRanges, text } = contentArray[i];
    if (inlineStyleRanges.length === 0 && text !== "") {
      stringifiedStyles.push({ lineNumber: i, content: NO_STYLE });
    } else if (text === "") {
      stringifiedStyles.push({ lineNumber: i, content: EMPTY_STYLE });
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

  function completeLine(i, j, text, finalLine) {
    if (
      !(finalStylesArray[j + 1] && finalStylesArray[j + 1].lineNumber === i)
    ) {
      finalLine.push(
        <span key={uid()}>
          {text.substring(
            finalStylesArray[j].originalStyles.offset +
              finalStylesArray[j].originalStyles.length,
            text.length
          )}
        </span>
      );
    }
  }

  function addStyleContent(text, j, type) {
    switch (type) {
      case STRONG:
        return (
          <strong key={uid()}>
            {text.substring(
              finalStylesArray[j].originalStyles.offset,
              finalStylesArray[j].originalStyles.offset +
                finalStylesArray[j].originalStyles.length
            )}
          </strong>
        );

      case ITALIC:
        return (
          <i key={uid()}>
            {text.substring(
              finalStylesArray[j].originalStyles.offset,
              finalStylesArray[j].originalStyles.offset +
                finalStylesArray[j].originalStyles.length
            )}
          </i>
        );

      case BOLD_ITALIC:
        return (
          <strong>
            <i>
              {text.substring(
                finalStylesArray[j].originalStyles.offset,
                finalStylesArray[j].originalStyles.offset +
                  finalStylesArray[j].originalStyles.length
              )}
            </i>
          </strong>
        );
    }
  }

  function continueLine(text, finalLine, j, type) {
    finalLine.push(
      <span key={uid()}>
        {text.substring(
          finalStylesArray[j - 1].originalStyles.offset +
            finalStylesArray[j - 1].originalStyles.length,
          finalStylesArray[j].originalStyles.offset
        )}
        {addStyleContent(text, j, type)}
      </span>
    );
  }

  function startLine(text, finalLine, j, type) {
    finalLine.push(
      <span key={uid()}>
        {text.substring(0, finalStylesArray[j].originalStyles.offset)}
        {addStyleContent(text, j, type)}
      </span>
    );
  }

  for (let i = 0; i < contentArray.length; i++) {
    let { text } = contentArray[i];
    if (text.length === 0) {
      finalContent.push(
        <Fragment key={uid()}>
          <br key={uid()} />
          <br key={uid()} />
        </Fragment>
      );
    } else {
      let finalLine = [];
      for (let j = 0; j < finalStylesArray.length; j++) {
        if (finalStylesArray[j].lineNumber === i) {
          if (finalStylesArray[i].content === NO_STYLE) {
            finalLine.push(<span key={uid()}>{text}</span>);
          } else {
            if (finalStylesArray[j].styleI === "BOLD") {
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                continueLine(text, finalLine, j, STRONG);
                completeLine(i, j, text, finalLine);
              } else {
                startLine(text, finalLine, j, STRONG);
                completeLine(i, j, text, finalLine);
              }
            } else if (finalStylesArray[j].styleI === "ITALIC") {
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                continueLine(text, finalLine, j, ITALIC);
                completeLine(i, j, text, finalLine);
              } else {
                startLine(text, finalLine, j, ITALIC);
                completeLine(i, j, text, finalLine);
              }
            } else {
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                continueLine(text, finalLine, j, BOLD_ITALIC);
                completeLine(i, j, text, finalLine);
              } else {
                startLine(text, finalLine, j, BOLD_ITALIC);
                completeLine(i, j, text, finalLine);
              }
            }
          }
        }
      }

      finalContent.push(<span key={uid()}>{finalLine}</span>);
    }
  }

  return finalContent;
};
