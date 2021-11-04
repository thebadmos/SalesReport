import React, {useEffect, useState} from 'react'
import "bootswatch/dist/lux/bootstrap.css";
import { formatNumber } from '../helpers/formatNumber';
import Api from '../api/Api'
import MiddleLoader from './MiddleLoader';

function Sales() {
    //middleloader
    const [loading, setLoading] =useState(true);
    //sales report
    const [salesData, setsalesData] = useState([]);
    //pagination
    const [itemsPerPage] = useState(20);
    const [currentPage, setcurrentPage] = useState(1);
    const [pageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //iTEM FILTER
    const currentItem = salesData.slice(indexOfFirstItem, indexOfLastItem);
    //  const filterItem = salesData.slice(0,300)

     const pages = [];
  for (let i = 1; i <= Math.ceil(salesData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
    useEffect(() =>{
        let cancel = false;
      Api()
          .then((data) =>{
              if(cancel)
              return;
              setsalesData(data);
              setLoading(false);
          })
    }, [])
    
    console.log(salesData)

    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
          setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
      };
      const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit === 0) {
          setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
      };
    
      let pageIncrementBtn = null;
      if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip;</li>;
      }
    
      let pageDecrementBtn = null;
      if (pages.length > maxPageNumberLimit && currentPage > pages[0]) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip;</li>;
      }
    

    return (
        <div>
            {loading ? (
                <MiddleLoader />
            ) : (
            <div className="pt-5 ">
          <table className=" container table table-hover">
            <thead>
              <tr className="table-dark">
                <th scope="col">Category</th>
                <th scope="col">Product Name</th>
                <th scope="col">Segment</th>
                <th scope="col">Price</th>
                <th scope="col">Discount</th>
                <th scope="col">Profit</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            {currentItem.map((data, i) => {
              return (
                <tbody key={i * 3}>
                   <tr className="table-dark">
                   <td>{data.Category}</td>
                    <td>{data["Product Name"]}</td>
                    <td>{data.Segment}</td>
                    <td>{formatNumber(data.Sales)}</td>
                    <td>{formatNumber(data.Discount)}</td>
                    <td>{formatNumber(data.Profit)}</td>
                    <td>{data.Quantity}</td>
                  </tr>
                </tbody>
              );
            })}
            </table>
            <ul className="pageNumbers">
            <li>
              <button
                onClick={handlePrevbtn}
                disabled={currentPage === pages[0] ? true : false}
              >
                Prev
              </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
              <button
                onClick={handleNextbtn}
                disabled={
                  currentPage === pages[pages.length - 1] ? true : false
                }
              >
                Next
              </button>
            </li>
          </ul>
            </div>
            )}
        </div>
    )
}

export default Sales
