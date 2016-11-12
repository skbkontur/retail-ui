(function renderToggle(isChecked = true) {
  ReactDOM.render(<Toggle checked={isChecked} onChange={renderToggle} />, mountNode);
})();
