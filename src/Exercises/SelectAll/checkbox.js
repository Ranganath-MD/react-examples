import React from "react";
import SaveIcon from '@material-ui/icons/Save';
import { green } from '@material-ui/core/colors';

const Checkbox = ({ label, isSelected, onCheckboxChange, save }) => (
  <div className="form-check">
    <label className="label">
      <input
        className="input-checkbox"
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
      />
      {label}
      {isSelected && save ? <SaveIcon style={{ color: green[500], marginLeft: 20 }}/>: null}
    </label>
  </div>
);

export default Checkbox;