import { Response, Request } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import { ITodo } from './../../types/todo';
import Todo from '../../models/todo';

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find();
        res.status(200).json({ todos });
    } catch (error) {
        throw error;
    }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>;

        const todo: ITodo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status,
        });

        const newTodo: ITodo = await todo.save();
        const allTodos: ITodo[] = await Todo.find();

        res.status(201).json({
            message: 'Todo added',
            todo: newTodo,
            todos: allTodos,
        });
    } catch (error) {
        throw error;
    }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req;
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            body
        );
        const allTodos: ITodo[] = await Todo.find();
        res.status(200).json({
            message: 'Todo updated',
            todo: updateTodo,
            todos: allTodos,
        });
    } catch (error) {
        throw error;
    }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        );
        const allTodos: ITodo[] = await Todo.find();
        res.status(200).json({
            message: 'Todo deleted',
            todo: deletedTodo,
            todos: allTodos,
        });
    } catch (error) {
        throw error;
    }
};

const testSpider = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { time },
            body,
        } = req;

        const data = await getData(time);

        console.log(JSON.stringify(data));

        res.status(200).json({
            message: 'testSpider success',
            values: data,
        });
    } catch (error) {
        throw error;
    }
};

function getData(time?, language?) {
    let url =
        'https://github.com/trending' +
        (!!language ? '/' + language : '') +
        '?since=' +
        time; // 拼接请求的页面链接
    return axios
        .get(url)
        .then(function (response) {
            let html_string = response.data.toString(); // 获取网页内容
            const $ = cheerio.load(html_string); // 传入页面内容
            let list_array: any[] = [];
            $('.Box .Box-row').each(function () {
                // 像jQuery一样获取对应节点值
                let obj: any = {};
                obj.title = $(this).find('h1').text().trimStart().trimEnd(); // 获取标题
                obj.links =
                    'https://github.com/' + obj.title.replace(/\s/g, ''); // 拼接链接
                obj.description = $(this)
                    .find('p')
                    .text()
                    .trimStart()
                    .trimEnd(); // 获取获取描述
                obj.language = $(this)
                    .find('>.f6 .repo-language-color')
                    .siblings()
                    .text()
                    .trimStart()
                    .trimEnd(); // 获取语言
                obj.stars = $(this)
                    .find('>.f6 a')
                    .eq(0)
                    .text()
                    .trimStart()
                    .trimEnd(); // 获取 start 数
                obj.forks = $(this)
                    .find('>.f6 a')
                    .eq(1)
                    .text()
                    .trimStart()
                    .trimEnd(); // 获取分支数
                obj.info = $(this)
                    .find('>.f6 .float-sm-right')
                    .text()
                    .trimStart()
                    .trimEnd(); // 获取对应时期 star 信息
                obj.avatar = $(this).find('>.f6 img').eq(0).attr('src'); // 获取首位作者头像
                list_array.push(obj);

                // 检测各项数据是否正确
                // console.log(obj);
            });

            // 回归按新增 star 数量排名
            list_array = list_array.sort((x, y) => {
                return (
                    parseInt(y.info.replace(/,/, '')) -
                    parseInt(x.info.replace(/,/, ''))
                );
            });

            return Promise.resolve(list_array);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { getTodos, addTodo, updateTodo, deleteTodo, testSpider };
