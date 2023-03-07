import React from "react";

interface IProps {
  ReloadData: Function;
  activeTab: string;
}
const RefreshButton = ({ ReloadData, activeTab }: IProps) => {
  return (
    <div className="reload-button" onClick={() => ReloadData()}>
      <span className="reload" title="Reload Data">
        &#x21bb;
      </span>
      <p>Reload {activeTab}</p>
    </div>
  );
};

export default RefreshButton;
