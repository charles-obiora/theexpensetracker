import React from "react";
import { Link } from "react-router-dom";
import { EditIcon, Trash2Icon } from "lucide-react";
import useExpenseStore from "../store/useExpenseStore";
//import { useParams } from "react-router-dom";

const Expense = ({ expenseid, expensename, date, cost, description }) => {
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);
  //const { id } = useParams();
  return (
    <div className="flex justify-between h-8 items-center">
      <p>{expensename}</p>
      <p>{`$${cost}`}</p>
      <p className="truncate w-40">{description}</p>
      <p>{date}</p>
      <div className="flex gap-2 items-center">
        <Link
          to={`/expenses/${expenseid}`}
          className="btn btn-sm btn-info btn-outline"
        >
          <EditIcon className="size-4" />
        </Link>
        <button className="btn btn-sm btn-error btn-outline">
          <Trash2Icon
            className="size-4"
            onClick={() => deleteExpense(expenseid)}
          />
        </button>
      </div>
    </div>
  );
};

export default Expense;
