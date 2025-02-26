# CustomProTable

**CustomProTable** is a highly customizable React table component built with TypeScript and styled using Tailwind CSS. It features responsive column sliding, multi-state column sorting, and an always-visible action column with edit and delete icons. This component is designed to give developers flexibility in rendering rows and configuring table behavior.

## Features

- **Responsive Sliding Columns**  
  The table displays a different number of columns based on the screen size:
  - Small screens: 2 columns
  - Medium screens: 3 to 6 columns (configurable via breakpoints)
  - Larger screens: 8 columns (or based on your configuration)  
  Navigate through columns with "Previous" and "Next" buttons.

- **Column Sorting**  
  Click on any header (except the action column) to toggle between three states:
  - **Unsorted** (default order)
  - **Ascending**
  - **Descending**

- **Action Column**  
  The last column is dedicated to actions and is always visible. It displays:
  - A trash bin icon for deleting a row.
  - A settings/edit icon for modifying a row.

- **Custom Row Rendering**  
  The table uses a render prop for row rendering, allowing you to provide your custom row component (e.g., `ReadOnlyRow`) for complete control over the row layout.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/custom-pro-table.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd custom-pro-table
   ```

3. **Install Dependencies:**

   Using npm:
   ```bash
   npm install
   ```
   or using yarn:
   ```bash
   yarn install
   ```

## Usage

Import the `CustomProTable` component along with your custom row component (such as `ReadOnlyRow`) and use them in your application. For example:

```tsx
import React, { Fragment } from 'react';
import CustomProTable from './CustomProTable';
import ReadOnlyRow from './ReadOnlyRow';

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
      <CustomProTable headcol={headcol} colType={colType} editableRow={true} data={data}>
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
```

### Component Props

- **headcol:** `string[]`  
  Array of header titles for each column.

- **colType:** `string[]`  
  Array indicating the type of each column. Use `"action"` for the action column.

- **data:** `any[]`  
  The table data, where each item is an array representing a row (ordered to match the headers).

- **editableRow (optional):** `boolean`  
  Flag to enable row editing features.

- **children:** `(dataItem: any, index: number) => React.ReactNode`  
  A render prop function to render each row. This allows you to customize the row layout.

## Customization

- **Responsive Configuration:**  
  The number of visible columns is determined by the `getVisibleCount` function. You can adjust the breakpoints and values in this function to meet your design requirements.

- **Sorting Behavior:**  
  Click on a header (except for the action column) to cycle through three sorting states: unsorted, ascending, and descending. The sorting state is visually indicated by an icon.

- **Action Column Icons:**  
  The action column renders two icons for deleting and editing. You can modify these icons in the `ReadOnlyRow` component to suit your design needs.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests if you find any bugs or have suggestions for improvements.

## License

This project is licensed under the [MIT License](LICENSE).
