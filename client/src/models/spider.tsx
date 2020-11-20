import React, { useState, useEffect } from 'react'
import Spider from './../components/Spider'
import { spider, getSpider } from './../API'

const TodoList: React.FC = () => {
    const [spiders, setSpiders] = useState<any[]>([]);
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        featchSipders('donews')
    }, [])

    const featchSipders = (type: string = 'donews'): void => {
        setLoading(true);
        getSpider(type)
            .then(({ data: { values } }) => {
                setLoading(false);

                setSpiders((values as any)[0].data)
            })
            .catch((err: Error) => console.log(err))
    }


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
