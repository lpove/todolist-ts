import React from 'react'

type Props = {
  spider: (time?: string, language?: string) => void,
  spiders: any[],
  loading: Boolean
}

const Spider: React.FC<Props> = ({ loading, spiders, spider }) => {
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

    return null
  }

  return (
    <div>
      <div>
        clickMe
      </div>
      <div className='Card--button'>
        <button
          onClick={() => spider('donews')}
          className='Card--button__delete'
        >
          testDonews
        </button>
        <button
          onClick={() => spider('githubTrending')}
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
