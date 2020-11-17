"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const mongoose_1 = require("mongoose");
const API = {
    donews: 'https://www.donews.com',
    githubTrending: 'https://github.com/trending',
};
function catchDonews(url) {
    return axios_1.default
        .get(url)
        .then(function (response) {
        let html_string = response.data.toString(); // 获取网页内容
        const $ = cheerio_1.default.load(html_string); // 传入页面内容
        let list_array = [];
        $('.section-news-box .news-item').each(function () {
            var _a, _b;
            let that = this;
            // 像jQuery一样获取对应节点值
            let obj = {};
            obj.title = $(that).find('.title').text().trimStart().trimEnd(); // 获取标题
            obj.links = (_a = $(that).attr('href')) === null || _a === void 0 ? void 0 : _a.trimStart().trimEnd();
            obj.img = (_b = $(that)
                .find('img')
                .attr('src')) === null || _b === void 0 ? void 0 : _b.trimStart().trimEnd();
            obj.content = $(that)
                .find('.desc')
                .text()
                .trimStart()
                .trimEnd();
            obj.tags = $(that).find('.name').text().trimStart().trimEnd();
            obj.tagsHref = $(that).find('.name').attr('href');
            obj.time = $(that)
                .find('.pub-date')
                .find('label')
                .text()
                .trimStart()
                .trimEnd();
            list_array.push(obj);
            // 检测各项数据是否正确
            // console.log(obj);
        });
        return Promise.resolve(list_array);
    })
        .catch(function (error) {
        console.log(error);
    });
}
function githubTrending(url) {
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
function spider(type = 'githubTrending') {
    let url = API[type];
    switch (type) {
        case 'donews':
            return catchDonews(url);
        case 'githubTrending':
            return githubTrending(url);
        default:
            return githubTrending(url);
    }
}
const sipderSchema = new mongoose_1.Schema({
    data: {
        type: Array,
        required: true,
        index: true,
    },
}, { timestamps: true });
const sipderSchemaModel = mongoose_1.model('Sipder', sipderSchema);
exports.default = { spider, sipderSchemaModel };
