import React from "react";
import NavigationButtons from "./NavigationButtons";
import "./styles/BookContent.css";

const BookContent = ({
  loading,
  book,
  chapter,
  fontSize,
  currentSentenceIndex,
  isReadingSource,
  textVide,
  readingOrder,
  onPrevious,
  onNext,
  onPlay,
  isPlaying,
  disabled,
}) => (
  <div className="book-content">
    {loading ? (
      <div className="book-content__loader">Loading...</div>
    ) : !book || !chapter ? (
      <p>Book or chapter not found</p>
    ) : (
      <div className="book-content__container">
        {chapter && currentSentenceIndex === 0 && (
          <h1>{chapter.title || "Untitled Chapter"}</h1>
        )}
        {chapter && currentSentenceIndex === chapter.content.length - 1 && (
          <h1>{"End of " + chapter.title || "End of Chapter"}</h1>
        )}
        <div
          className="book-content__text"
          style={{ fontSize: `${fontSize}px` }}
        >
          {chapter &&
          chapter.content?.length > 0 &&
          currentSentenceIndex < chapter.content.length ? (
            <div>
              <p
                className={
                  isReadingSource ? "book-content__text--highlight" : ""
                }
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: textVide(
                      readingOrder === "source-target"
                        ? chapter.content[currentSentenceIndex]?.source
                        : chapter.content[currentSentenceIndex]?.translation ||
                            ""
                    ),
                  }}
                />
              </p>
              <p
                className={
                  !isReadingSource ? "book-content__text--highlight" : ""
                }
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: textVide(
                      readingOrder === "source-target"
                        ? chapter.content[currentSentenceIndex]?.translation
                        : chapter.content[currentSentenceIndex]?.source || ""
                    ),
                  }}
                />
              </p>
            </div>
          ) : (
            <p>No sentences available</p>
          )}
        </div>
        <NavigationButtons
          onPrevious={onPrevious}
          onNext={onNext}
          onPlay={onPlay}
          isPlaying={isPlaying}
          disabled={disabled}
        />
      </div>
    )}
  </div>
);

export default BookContent;
