import counterStore from "../store/counterStore";

const Counter = () => {
  const { count, increment, decrement } = counterStore();
  return (
    <div className="flex gap-2">
      <p>{count}</p>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
};

export default Counter;
