import React from 'react'
import ProgressBar from './ProgressBar'
import Question from './Question'
import TimeSubmit from './TimeSubmit'
import PaginationTab from './PaginationTab'

const Quiz: React.FC = () => {
  return (
    <>
      <TimeSubmit />
      <div className="container mx-auto p-4 mb-[6rem] max-w-screen-lg">
        <div className="flex flex-col items-center justify-between p-4 border w-full bg-white">
          <div className="flex justify-between w-full">
            <div className="w-10/12">
              <Question />
            </div>
            <div className="flex justify-end w-2/12">
              <ProgressBar />
            </div>
          </div>
          <div className="flex justify-center pt-20">
            <PaginationTab />
          </div>
        </div>
      </div>
    </>
  )
}

export default Quiz
