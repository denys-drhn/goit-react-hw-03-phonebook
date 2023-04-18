import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <form className={styles.contactFilter}>
    <label className={styles.label} htmlFor="filter">
      Find Contacts by name
    </label>
    <input
      className={styles.input}
      type="text"
      id="filter"
      value={value}
      onChange={onChange}
    />
  </form>
);
export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
