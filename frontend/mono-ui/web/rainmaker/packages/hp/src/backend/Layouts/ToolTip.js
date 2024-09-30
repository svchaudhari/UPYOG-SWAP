const ToolTip = ({ toolTipText }) => {
  return (
    <div className="custom-tooltip">
      <i
        className="fa fa-question-circle help-box"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        // title= {toolTipText}
      ></i>
      <span className="tooltiptext">{toolTipText}</span>
    </div>
  );
};
export default ToolTip;
