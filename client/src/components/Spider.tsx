import React from 'react';
import './Spider.scss';

const MAX = 10;

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
      return <div className="news">
        {spiders.slice(0, MAX).map((item, index) => {
          return <div className="item">
            <div className="img-conatiner">
              <img src={item.img} alt="icon" width={280} height={180} />
            </div>
            <div className="desc">
              <header>
                {index + 1}: <a className="link" style={{ color: 'white' }} href={item.links} target="_balnk" key={item.title}>{item.title}</a>
              </header>
              <section>
                <p>{item.content}</p>
              </section>
              <footer>
                <a href={item.tagsHref}>{item.tags}</a>
                 |
                <span>{item.time}</span>
              </footer>
            </div>
          </div>
        })}
      </div>
    }

    return null
  }

  return (
    <div className="spider-form">
      <section>
        clickMe
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
      </section>
      <section className="spider-container">
        {$spiders()}
      </section>
    </div>
  )
}

export default Spider
