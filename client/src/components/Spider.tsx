import React from 'react'

type Props =  {
    testSpider: (time?: string, language?: string) => void
}

const Spider: React.FC<Props> = ({ testSpider }) => {
  return (
    <div>
      <div>
        testSpider
      </div>
      <div className='Card--button'>
        <button
          onClick={() => testSpider()}
          className='Card--button__delete'
        >
          testSpider
        </button>
      </div>
    </div>
  )
}

export default Spider
