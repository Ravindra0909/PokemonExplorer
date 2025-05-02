
import './index.css'

const SortOptions = ({onSortOrderChange, onSortChange } ) => {
    return(
        <div className='sorting-filtering-options'>

        <img
            className="website-logo"
            src="./pokemon.png"
            alt="Logo"
          />
    <hr className="hr" />
    
    <p className='para-id'>Sort By Id</p>
    <li className='id-input'>
      <div>
        <input
          type="radio"
          id="highToLow"
          name="id"
          className="id-radio"
          value="desc"
          onChange={onSortOrderChange}
        />
        <label htmlFor="highToLow">High To Low</label>
      </div>
      <div>
        <input
          type="radio"
          id="lowToHigh"
          name="id"
          className="id-radio"
          value="asc"
          onChange={onSortOrderChange}
        />
        <label htmlFor="lowToHigh">Low To High</label>
      </div>
    </li>

    <hr className="hr" />

    <p className='para-id'>Sort By Name</p>
    <li className='id-input'>
      <div>
        <input
          type="radio"
          id="A-Z"
          name="name"
          className="id-radio"  
          value="name-asc"
          onChange={onSortChange}
        />
        <label htmlFor="A-Z">A → Z (Ascending)</label>
      </div>
      <div>
        <input
          type="radio"
          id="Z-A"
          name="name"
          className="id-radio"
          value="name-desc"
          onChange={onSortChange} 
        />
        <label htmlFor="Z-A">Z → A (Descending)</label>
      </div>
    </li>
    <hr className="hr" />
    
  </div>

    )
}

export default SortOptions
