import MUIDataTable from "mui-datatables"
import PropTypes from "prop-types";


const DataTables = ({colum,data,options}) => {
  return (
	<MUIDataTable columns={colum} data={data} options={options} />
  )
}

DataTables.propTypes = {
	colum: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.array).isRequired,
    options: PropTypes.object.isRequired,
}

export default DataTables