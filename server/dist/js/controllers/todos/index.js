"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSpider = exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const todo_1 = __importDefault(require("../../models/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.status(200).json({ todos });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const todo = new todo_1.default({
            name: body.name,
            description: body.description,
            status: body.status,
        });
        const newTodo = yield todo.save();
        const allTodos = yield todo_1.default.find();
        res.status(201).json({
            message: 'Todo added',
            todo: newTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateTodo = yield todo_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: 'Todo updated',
            todo: updateTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield todo_1.default.findByIdAndRemove(req.params.id);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: 'Todo deleted',
            todo: deletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodo = deleteTodo;
const testSpider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { time }, body, } = req;
        const data = yield getData(time);
        console.log(JSON.stringify(data));
        res.status(200).json({
            message: 'testSpider success',
            values: data,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.testSpider = testSpider;
function getData(time, language) {
    let url = 'https://github.com/trending' +
        (!!language ? '/' + language : '') +
        '?since=' +
        time; // 拼接请求的页面链接
    return axios_1.default
        .get(url)
        .then(function (response) {
        let html_string = response.data.toString(); // 获取网页内容
        const $ = cheerio_1.default.load(html_string); // 传入页面内容
        let list_array = [];
        $('.Box .Box-row').each(function () {
            // 像jQuery一样获取对应节点值
            let obj = {};
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
            return (parseInt(y.info.replace(/,/, '')) -
                parseInt(x.info.replace(/,/, '')));
        });
        return Promise.resolve(list_array);
    })
        .catch(function (error) {
        console.log(error);
    });
}
