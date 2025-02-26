import { Fragment } from 'react';
import CustomProTable from './Table/CustomProTable';
import ReadOnlyRow from './Table/components/ReadOnlyRow';

const headcol = [
  'Name',
  'Age',
  'Email',
  'Address',
  'Phone',
  'Role',
  'Status',
  'Department',
  'Action'
];

const colType = [
  'text',
  'number',
  'text',
  'text',
  'text',
  'text',
  'text',
  'text',
  'action'
];

const data = [
  ['John Doe', 28, 'john@example.com', 'Address 1', '1234567890', 'Admin', 'Active', 'IT', ''],
  ['Jane Smith', 32, 'jane@example.com', 'Address 2', '0987654321', 'User', 'Inactive', 'HR', '']
];

const App = () => {
  return (
    <div className="p-6 bg-white shadow-xl rounded-xl m-4 w-10/12 grid justify-center mx-auto">
      <CustomProTable headcol={headcol} colType={colType} data={data}>
        {(dataItem, index) => (
          <Fragment key={index}>
            <ReadOnlyRow editableRow={true} data={dataItem} />
          </Fragment>
        )}
      </CustomProTable>
    </div>
  );
};

export default App;
