import React from "react";

import "./Dropdown.scss";

export const Dropdown = ({ handleDropdown, settings, isActive }) => (
  <select onChange={handleDropdown} disabled={isActive}>
    <option value={JSON.stringify(settings.easyMode)}>Easy Mode</option>
    <option value={JSON.stringify(settings.normalMode)}>Normal Mode</option>
    <option value={JSON.stringify(settings.hardMode)}>Hard Mode</option>
  </select>
);
