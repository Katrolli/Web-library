import { useContext, useEffect, useState } from "react";
import { StateContex } from "../StateProvider/StateProvider";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Header from "../Components/Header";

const ReportPage = () => {
  const [orderDirection, setOrderDirection] = useState(1);

  const { authors, getAuthors } = useContext(StateContex);

  useEffect(() => {
    getAuthors();
  }, []);

  const soretedAuthors = authors.sort(
    (a, b) => (a.books.length - b.books.length) * orderDirection
  );

  const renderedAuthors = soretedAuthors.map((author) => {
    return (
      <tr key={author.id}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-left">
          {author.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
          {author.email}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
          {author.books.length}
        </td>
      </tr>
    );
  });

  return (
    <>
      <Header />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      <span className="group inline-flex">
                        Name
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="group inline-flex">Email</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="group inline-flex">
                        Number of Published Books
                        <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                          <ChevronDownIcon
                            className={`h-5 w-5 ${
                              orderDirection === -1 && "rotate-180"
                            }`}
                            aria-hidden="true"
                            onClick={() =>
                              setOrderDirection(orderDirection * -1)
                            }
                          />
                        </span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {renderedAuthors}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
