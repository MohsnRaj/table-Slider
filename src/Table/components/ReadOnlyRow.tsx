import React, { useContext } from 'react';
import { TableColumnContext } from '../CustomProTable';
import Tippy from '@tippyjs/react';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import style from '../App.module.css';
interface ReadOnlyRowProps {
  data: any[];
  editableRow?: boolean;
}

const ReadOnlyRow: React.FC<ReadOnlyRowProps> = ({ data, editableRow }) => {
  const { visibleColumnIndices, actionColumnIndex } = useContext(TableColumnContext);

  return (
    <tr className="border-b">
      {visibleColumnIndices.map(index => {
        if (actionColumnIndex !== null && index === actionColumnIndex) {
          return (
            <td key={index} className={style.actionco}>
            <Tippy content="ویرایش">
            <button
              type="button"
              className="bg-transparent text-green-500"
              // onClick={(event) => handleEditClick(event, data)}
            >
              <BiEdit className="w-6 h-6 mx-auto" />
            </button>
          </Tippy>
          <Tippy content="حذف">
            <button
              type="button"
              className="bg-transparent text-red-500"
              // onClick={() => handleDeleteClick(data.id)}
            >
              <RiDeleteBin7Line className="w-6 h-6 mx-auto" />
            </button>
          </Tippy>
            </td>
          );
        }
        return (
          <td key={index} className={style.cols}>
            {data[index]}
          </td>
        );
      })}
    </tr>
  );
};

export default ReadOnlyRow;
