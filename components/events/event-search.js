import { useRef } from "react";
import Button from "../ui/button";

function EventSearch(props) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    props.onSearch(selectedYear, selectedMonth);
  }

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-2xl mx-5 sm:mx-10 md:mx-auto mb-10 bg-white p-2 rounded-xl shadow-md hover:shadow-lg transition-all ease-out duration-300"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3 w-full">
          <label
            htmlFor="year"
            className="text-sm text-right text-zinc-800 font-semibold basis-1/4"
          >
            Year
          </label>
          <select
            ref={yearInputRef}
            id="year"
            className="bg-zinc-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
          >
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>

        <div className="flex items-center gap-3 w-full">
          <label
            htmlFor="month"
            className="text-sm text-right text-zinc-800 font-semibold basis-1/4"
          >
            Month
          </label>
          <select
            ref={monthInputRef}
            id="month"
            className="bg-zinc-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div>
          <Button>Search</Button>
        </div>
      </div>
    </form>
  );
}

export default EventSearch;
