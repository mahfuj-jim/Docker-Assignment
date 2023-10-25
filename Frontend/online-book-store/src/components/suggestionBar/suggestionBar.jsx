import "./suggestionBar.style.scss";

const SuggestionBar = () => {
  return (
    <div className={`suggestion-bar-container`}>
      <div className="suggestion-bar">
        <div className="suggestion-item">
          <div className="suggestion-text">
            <p>First suggestion text</p>
            <p>Second suggestion text</p>
            <p>Third suggestion text</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionBar;
