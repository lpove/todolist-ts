import React from 'react'

type Props = {
  testSpider: (time?: string, language?: string) => void,
  spiders: any[],
  loading: Boolean
}

const Spider: React.FC<Props> = ({ loading, spiders, testSpider }) => {
  const $spiders = () => {
    if (loading) {
      return 'loading...'
    }

    if (spiders && spiders.length) {
      return <div>
        {spiders.slice(0, 10).map(item => {
          return <p>
            <a style={{ color: 'white' }} href={item.links} target="_balnk" key={item.title}>{item.title}</a>
          </p>
        })}
      </div>
    }

    return '暂无内容'
  }

  return (
    <div>
      <div>
        clickMe
      </div>
      <div className='Card--button'>
        <button
          onClick={() => testSpider('donews')}
          className='Card--button__delete'
        >
          testDonews
        </button>
        <button
          onClick={() => testSpider('githubTrending')}
          className='Card--button__delete'
        >
          testGithubTrending
        </button>
      </div>
      {$spiders()}
    </div>
  )
}

export default Spider
