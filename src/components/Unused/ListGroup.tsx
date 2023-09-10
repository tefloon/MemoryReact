import { MouseEvent, useState } from "react";

interface Props {
  passedOptions?: string[];
  heading?: string;
}

function ListGroup({ passedOptions, heading }: Props) {
  const defaultOptions = [
    "Pierwszy",
    "Drugi",
    "Trzeci",
    "Czwarty",
    "Piąty",
    "Kurwa",
  ];

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const options = passedOptions || defaultOptions;

  const zaznacz = (event: MouseEvent, id: number) => {
    setSelectedIndex(id);
    console.log(event);
  };

  const getClass = (id: number) => {
    const staticPart =
      "block w-full px-4 py-2 border-b border-gray-200 cursor-pointer dark:border-gray-600 ";

    let result = staticPart;

    if (id === 0) {
      result += "rounded-t-lg ";
    }

    if (id === options.length - 1) {
      result += "rounded-b-lg ";
    }

    if (id === selectedIndex) {
      result += "dark:bg-gray-800 font-bold";
    } else {
      result +=
        "hover:bg-gray-100 hover:text-blue-700  dark:hover:bg-gray-600 dark:hover:text-white";
    }

    return result;
  };

  return (
    <>
      <div className="w-48 text-center pb-3">
        <span className="w-48 text-center text-3xl text-teal-200">
          {heading}
        </span>
      </div>
      <div className="w-48 text-sm font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {options.map((item, id) => (
          <a
            key={item + Math.random()}
            onClick={(e) => zaznacz(e, id)}
            href="#"
            aria-current="true"
            className={getClass(id)}
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
}

export default ListGroup;
