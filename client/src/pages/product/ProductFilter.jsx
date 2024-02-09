import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { IoFilterCircleOutline } from "react-icons/io5";

function ProductFilter({ categories, onSelectCategory }) {
  return (
    <div>
      <DropdownButton id="filter" title={<IoFilterCircleOutline/>}>

        {/* Here we set the state value for onSelectCategory back to Null, to display all products again */}
        <Dropdown.Item onClick={() => onSelectCategory(null)}>All</Dropdown.Item>

        {/* Mapping through the Categories that are present within the Database */}
        {/* ONLY shows current categories within the Database */}
        {categories.map((category) => (
          <Dropdown.Item key={category} onClick={() => onSelectCategory(category)}>
            {category}
          </Dropdown.Item>

        ))}
      </DropdownButton>
    </div>
  );
}

export default ProductFilter;