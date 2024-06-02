"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from 'react-hot-toast';

export async function postRandomNumbers(randomNumber1, randomNumber2, session) {
  if (randomNumber1 === '' || randomNumber2 === '') {
    toast.error('Please generate numbers!')
    return 'Please generate numbers!';
  }
  try {
    const res = await fetch("https://randomnumbersaver.azurewebsites.net/api/randomNumberSaver", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${session?.user?.token}`,
      },
      body: JSON.stringify({ randomNumber1, randomNumber2 }),
    });
    if (res.status === 201) {
      toast.success('Numbers successfully saved to Database!')
      return 'Numbers successfully saved to Database!';
    } else if (res.status === 400) {
      toast.error('Invalid input!')
      return 'Invalid input!';
    } else if (res.status === 401) {
      toast.error('Authorization token missing !')
      return 'Authorization token missing !';
    }else if(res.status===500){
      toast.error("Error storing numbers")
      return '"Error storing numbers"!';
    }
    toast.error('Unknown error occurred');
    return 'Unknown error occurred';
  } catch (error) {
    toast.error('There is a problem ocurred while saving numbers to database try again.')
    return 'There is a problem ocurred while saving numbers to database try again.';
  }
}

export default function Home() {
  const [randomNumber1, setRandomNumber1] = useState("");
  const [randomNumber2, setRandomNumber2] = useState("");
  const { data: session, status } = useSession();

  const handleGenerateNumber = () => {
    setRandomNumber1(Math.floor(Math.random() * 100));
    setRandomNumber2(Math.floor(Math.random() * 100));
  };

  const handlePostRandomNumbers = async () => {
    const result = await postRandomNumbers(randomNumber1, randomNumber2, session);
  };

  return (
    <div className='justify-center mt-16'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg'>
        <h1 className='text-3xl font-semibold text-center text-purple-700'>Random Number Generator</h1>

        <div>
          <label className='label'>
            <span className='text-base label-text'>Random Number #1</span>
          </label>
          <input
            type='text'
            value={randomNumber1}
            onChange={(e) => setRandomNumber1(e.target.value)}
            placeholder='Random Number #1'
            required
            className='w-full input input-bordered input-primary'
          />
        </div>
        <div>
          <label className='label'>
            <span className='text-base label-text'>Random Number #2</span>
          </label>
          <input
            type='text'
            value={randomNumber2}
            onChange={(e) => setRandomNumber2(e.target.value)}
            placeholder='Random Number #2'
            required
            className='w-full input input-bordered input-primary'
          />
        </div>
        <div className='flex justify-center mt-10'>
          <button
            onClick={handleGenerateNumber}
            type='button'
            className='btn btn-primary'
          >
            Generate
          </button>
          <button
            onClick={handlePostRandomNumbers}
            type='button'
            className='btn btn-primary ml-5'
          >
            Post to Azure
          </button>
        </div>
        <p className='text-red-600 text-[16px] mb-4'></p>
      </div>
    </div>
  );
}