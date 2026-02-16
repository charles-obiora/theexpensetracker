import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ExpensePage = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/expenses/${id}`,
        );

        if (response.data.data) {
          setExpense(response.data.data);
        } else {
          setExpense(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
        setExpense(error.response.data.message);
      }
    };
    fetchExpense();
    //console.log(expense);
  }, [id, setExpense]);

  if (!expense) return <p>loading</p>;
  return typeof expense === "object" ? (
    <div className="flex flex-col">
      <Link to={"/expenses"}>
        <ArrowLeft className="size-4" />
      </Link>

      <p>{expense.expensename}</p>
      <p>{expense.cost}</p>
      <p>{new Date(expense.created_at).toLocaleDateString("en-GB")}</p>
      <p>{expense.description}</p>
    </div>
  ) : (
    <p>{expense}</p>
  );
};

export default ExpensePage;
