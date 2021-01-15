import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.scss";

const Filter = ({ value, onChangeFilter }) => {
  return (
    <div className={styles["filter"]}>
      <label className={styles.filterLable}>
        Find contacts by name
        <input
          type="text"
          value={value}
          onChange={(e) => onChangeFilter(e.target.value)}
          className={styles.filterInput}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
