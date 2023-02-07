import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from "react-router-dom";
function Admin() {
  const [exams, setExams] = useState([]);

  //Fetching the API
  useEffect(() => {
    fetch('https://czi-covid-lypkrzry4q-uc.a.run.app/api/exams')
      .then(response => response.json())
      .then(data => setExams(data.exams));
      
  }, []);




const[search,setSearch] = useState("");
console.log(search);

const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortBy === key && sortDirection === 'asc') {
      direction = 'desc';
    }
    setSortBy(key);
    setSortDirection(direction);

    setExams([...exams].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      //for converting only the strings that are numbers into number types
      if (!isNaN(aValue) && !isNaN(bValue)) {
        aValue = parseInt(aValue, 10);
        bValue = parseInt(bValue, 10);
      }
  

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    }));
  };


  return (
    <div class="container mx-auto px-4 sm:px-8 mt-[4rem]">
    <div class="py-4">
          
           {/*header */}
               <div>
                  <h2 class="text-3xl font-semibold leading-tight text-left">View Examinations</h2>
               </div>

           {/*search bar */}
      <div class = "p-10  min-w-full ">
      <input onChange ={(e) => setSearch(e.target.value)}
       type="search"
        class="form-control relative flex-auto ml-[-2rem] min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
        placeholder="Search"
         aria-label="Search" 
         aria-describedby="button-addon2"/>
      </div>

      {/*table*/}
      
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div
          class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
        >
          <table class="min-w-full leading-normal text-left ">
            {/*table headers
            contains an onclick function to sort them in ascending or descending order*/}
            <thead>
              <tr>
                {/*table headers*/}
                <th onClick={() => handleSort('patientId')}
                
                  class="px-5 py-3  border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  
                  Patient ID { sortBy === 'patientId' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>

                 {/*table headers*/}
                <th onClick={() => handleSort('examId')}
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Exam ID { sortBy === 'examId' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>

                      {/*table headers*/}
                <th 
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                 Image 
                </th>
                  {/*table headers*/}
                <th onClick={() => handleSort('keyFindings')}
                  class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Key Findings { sortBy === 'keyFindings' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                  {/*table headers*/}
                <th onClick={() => handleSort('brixiaScores')}
                  class="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Brixia Score { sortBy === 'brixiaScores' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                   {/*table headers*/}   

                <th onClick={() => handleSort('age')}
                  class="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Age { sortBy === 'age' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                    {/*table headers*/}
                <th onClick={() => handleSort('sex')}
                  class="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Sex { sortBy === 'sex' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                      {/*table headers*/}
                <th onClick={() => handleSort('bmi')}
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  BMI { sortBy === 'bmi' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
                </th>
                      {/*table headers*/}

                <th onClick={() => handleSort('zipCode')}
                  class="px-1 py-5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                >
                  {/*condition for  */}
                  Zip Code { sortBy === 'zipCode' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
                </th>

                    {/*table headers*/}
                <th 
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                ></th>
              </tr>
            </thead>
            <tbody>
                {/*mapping the api data onto the table */}
              {exams.filter((item)=>{
          /* search function */ 
          return search.toLowerCase() === '' ? item : item.examId.toLowerCase().includes(search.toLowerCase()) || item.patientId.toLowerCase().includes(search.toLowerCase()) || item.sex.toLowerCase().includes(search.toLowerCase()) || item.keyFindings.toLowerCase().includes(search.toLowerCase());
        } ).map(item => (<tr key = {item.id} class= ' border-b border-gray-200 h-[10rem] hover:bg-blue-500'>
                  {/*table data */}
                        <td class=" px-6 py-5 border-gray-200 text-center text-green-600 bg-white font-semibold text-sm"><Link to ={`/patient/${item.patientId}`}>{item.patientId}</Link> </td>       
                        <td class=" px-7 py-5  border-gray-200 text-green-600 bg-white  font-semibold text-sm"><Link to={`/exams/${item._id}`}>{item.examId}</Link></td>
                        <td class=" px-7 py-5  border-gray-200 w-[13rem] bg-white text-sm"><img src = {item.imageURL} alt = 'x-ray photo'/></td>
                        <td class=" px-7 py-5  border-gray-200 bg-white text-sm">{item.keyFindings}</td> 
                        <td class=" px-6 py-5 border-gray-200 bg-white text-sm">{item.brixiaScores}</td> 
                        <td class=" px-7 py-5 border-gray-200 bg-white text-sm">{item.age}</td> 
                        <td class=" px-7 py-5 border-gray-200 bg-white text-sm">{item.sex}</td> 
                        <td class=" px-6 py-5 border-gray-200 bg-white text-sm">{item.bmi}</td> 
                        <td class=" px-7 py-5 border-gray-200 bg-white text-sm"> {item.zipCode}</td> 


                        
               
              </tr>))}
              
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Admin