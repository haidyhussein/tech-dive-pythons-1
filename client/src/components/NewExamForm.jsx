
import React from 'react'
import { useState } from 'react';
  
function NewExamForm () {
  const [patientId, setPatientId] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [zip, setZip] = useState('');
  const [bmi, setBmi] = useState('');
  const [weight, setWeight] = useState('');
  const [pngFileName, setPngFileName] = useState('');
  const [examId, setExamId] = useState('');
  const [icu, setIcu] = useState('');
  const [numIcuAdmits, setNumIcuAdmits] = useState('');
  const [mortality, setMortality] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newExam = {
      patientId,
      age,
      sex,
      zip,
      bmi,
      weight,
      pngFileName,
      examId,
      icu,
      numIcuAdmits,
      mortality,
    };

    const response = await fetch('/api/exams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExam),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      return;
    }

    setPatientId('');
    setAge('');
    setSex('');
    setZip('');
    setBmi('');
    setWeight('');
    setPngFileName('');
    setExamId('');
    setIcu('');
    setNumIcuAdmits('');
    setMortality('');

    console.log('New exam created');
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-row '>
    <form className = 'flex flex-col' onSubmit={handleSubmit}>
      <label>
        Patient ID:
        <input type="text" value={patientId} onChange={(event) => setPatientId(event.target.value)} required />
      </label>
      <label>
        Age:
        <input type="text" value={age} onChange={(event) => setAge(event.target.value)} required />
      </label>
      <label>
        Sex:
        <input type="text" value={sex} onChange={(event) => setSex(event.target.value)} required />
      </label>
      <label>
        Zip:
        <input type="text" value={zip} onChange={(event) => setZip(event.target.value)} required />
      </label>
      <label>
        BMI:
        <input type="text" value={bmi} onChange={(event) => setBmi(event.target.value)} required />
      </label>
      <label>
        Weight:
        <input type="text" value={weight} onChange={(event) => setWeight(event.target.value)} required />
      </label>
      <label>
        PNG File Name:
        <input type="text" value={pngFileName} onChange={(event) => setPngFileName(event.target.value)} required />
      </label>
      <label>
        Exam ID:
        <input type="text" value={examId} onChange={(event) => setExamId(event.target.value)} required />
      </label>
      <label>
        ICU:
        <input type="text" value={icu} onChange={(event) => setIcu(event.target.value)} required />
      </label>
      <label>
        Number of ICU Admissions:
      <input type="text" value={numIcuAdmits} onChange={(event) => setNumIcuAdmits(event.target.value)} required />
      </label>

      <label>
        Mortality:
        <input type="text" value={mortality} onChange={(event) => setMortality(event.target.value)} required />
      </label>

      <button type="submit">Submit</button>
      
      </form>
      </div>
      </div>
  )
}

export default NewExamForm