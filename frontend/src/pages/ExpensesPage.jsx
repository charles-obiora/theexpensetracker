import { useEffect } from "react";
import useExpenseStore from "../store/useExpenseStore";
import { PlusCircleIcon, RefreshCwIcon, PackageIcon } from "lucide-react";
import Expense from "../components/Expense";

const ExpensesPage = () => {
  const { expenses, loading, error, getExpenses } = useExpenseStore();
  useEffect(() => {
    getExpenses();
  }, [getExpenses]);
  //console.log(expenses);
  return (
    <main className="max-w-6l mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <button className="btn btn-primary">
            <PlusCircleIcon className="size-5 mr-2" />
            Add Expense
          </button>
          <button className="btn btn-primary">
            <PlusCircleIcon className="size-5 mr-2" />
            Add Category
          </button>
        </div>
        <button className="btn btn-ghost btn-circle" onClick={getExpenses}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>
      {error && <div className="alert alert-error mb-8">{error}</div>}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {typeof expenses === "object" && expenses.length > 0 ? (
            expenses.map((expense) => (
              <Expense
                key={expense.expenseid}
                expenseid={expense.expenseid}
                cost={expense.cost}
                description={expense.description}
                expensename={expense.expensename}
                date={new Date(expense.created_at).toLocaleDateString("en-GB")}
              />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center h-96 space-y-4">
              <div className="bg-base-100 rounded-full p-6">
                <PackageIcon className="size-12" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold">No expenses found</h3>
                <p className="text-gray-500 max-w-sm">
                  Get started by adding your first expense
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default ExpensesPage;
