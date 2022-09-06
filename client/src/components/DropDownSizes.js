import { useState, useContext, useEffect } from 'react'
import { Context } from '../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_PRINT_SIZES } from '../utils/queries';

export default function DropDown() {
  const [selectedSizeState, setSelectedSizeState] = useContext(Context)['selectedSize'];

  const [printSizes, setPrintSizes] = useState([])
  const { data } = useQuery(QUERY_PRINT_SIZES);

  useEffect(() => {
    if (data !== undefined) {
      setPrintSizes(data.printSizes)
    }
  })

  const getSelectedPrice = (e) => {
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll('option')[idx];
    const dataPrice = option.getAttribute('data-price');
    return dataPrice;
  };

  return (
    <>
      <div>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            setSelectedSizeState(
              {
                printSize: e.currentTarget.value,
                unitPrice: getSelectedPrice(e)
              })
            }}
        >
          <option defaultValue>Choose a size</option>
          {
            data ?
              (
                printSizes.map(printSize => (
                  <option key={printSize._id} value={printSize.size} data-price={printSize.price}>{printSize.size}</option>
                ))
              )
              :
              (console.log('data is not available, or is loading... '))
          }
        </select>
      </div>
    </>
  )
}
