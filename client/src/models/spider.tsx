import React, { useState } from 'react'
import Spider from './../components/Spider'
import { spider } from './../API'

const TodoList: React.FC = () => {
    const [spiders, setSpiders] = useState<any[]>([]);
    const [loading, setLoading] = useState<Boolean>(false)

    const hanldeSpider = (type?: string): void => {
        setLoading(true);
        spider(type)
            .then(({ status, data }) => {
                console.log(data);

                if (status !== 200) {
                    throw new Error('Error! spider is bad')
                }
                setLoading(false);
                setSpiders((data as any).values);
            })
            .catch((err) => console.log(err))
    }

    return (
        <main className='sipder'>
            <Spider spider={hanldeSpider} spiders={spiders} loading={loading} />
        </main>
    )
}

export default TodoList
