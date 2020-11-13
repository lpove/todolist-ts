import React from 'react'

type Props =  {
    testSpider: (time?: string, language?: string) => void,
    spiders: any[]
}

const Spider: React.FC<Props> = ({ spiders, testSpider }) => {
  return (
    <div>
      <div>
        clickMe
      </div>
      <div className='Card--button'>
        <button
          onClick={() => testSpider()}
          className='Card--button__delete'
        >
          testSpider
        </button>
      </div>
      <div>
        {spiders && spiders.length ? spiders.slice(0,10).map(item=>{
         return <p>
         <a style={{color: 'white'}} href={item.links} target="_balnk" key={item.title}>{item.title}</a>
         </p> 
        }): null}
      </div>
    </div>
  )
}

export default Spider
