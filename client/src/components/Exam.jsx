import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import { useExamsContext } from '../hooks/useExamsContext';
function Exam() {
  const { exam, dispatch} = useExamsContext();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const { _id } = useParams();

  useEffect(() => {
    const fetchExams = async () => {
      const response = await fetch(`https://pythons-covid-database-backend.onrender.com/api/exams/${_id}`);
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: 'GET_EXAM', payload: data });
      }
    };
    fetchExams();
    setTimeout(() => setLoading(false), 700)
  }, []);



  return (

       <>
    {loading === false ? (
    <div className="container mx-auto px-4 sm:px-6 mt-20">
      {modal && (
            <div className="fixed inset-0 z-10 bg-black bg-opacity-80 flex justify-center items-center h-full w-full max-w-full max-h-full" onClick={() => setModal(false)}>
            <div className="h-[70rem] w-[70rem] max-w-full max-h-full flex items-center justify-center overflow-auto">
              <img src={exam.pngFileName} className="rounded-md" alt="x-ray" />
            </div>
          </div>
            )}
      <div className=''>
       <h2 className="text-3xl font-semibold leading-tight text-center mb-1 sm:w-full md:w-[50rem] mx-auto ">Exam Details</h2>
       </div>
       <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-10 h-auto bg-white drop-shadow-lg rounded-md border-2 md:px-10 md:py-10 mt-10">
            <img onClick={() => setModal(true)} className="w-full md:w-1/2 rounded-lg max-h-[36rem]" src={exam.pngFileName} alt="x-ray" />
            
            <div className="flex flex-col w-2/3 sm:w-2/3 md:w-1/2 md:px-2 md:py-5 md:grid md:grid-cols-2 md:gap-5">
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Patient ID:</p>
                <Link to ={`/patient/${exam.patientId}`} ><p className="px-4 font-semibold py-2 text-green-500">{exam.patientId}</p></Link>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Exam ID:</p>
                <p className="px-4 py-2">{exam.examId}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Age:</p>
                <p className="px-4 py-2">{exam.age}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Sex:</p>
                <p className="px-4 py-2">{exam.sex}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Zip code:</p>
                <p className="px-4 py-2">{exam.zip}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Weight:</p>
                <p className="px-4 py-2">{exam.weight} lbs</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">BMI:</p>
                <p className="px-4 py-2">{exam.bmi}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Mortality:</p>
                <p className="px-4 py-2">{exam.mortality}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Admitted to ICU:</p>
                <p className="px-4 py-2">{exam.icu}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Number of ICU admits:</p>
                <p className="px-4 py-2">{exam.numIcuAdmits}</p>
              </div>
            </div>
          </div>
        </div>
  </div>) : (
        <LoadingScreen/>
      )} </>
     
  )
}

export default Exam