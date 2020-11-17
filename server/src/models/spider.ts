import axios from 'axios';
import cheerio from 'cheerio';
import { IAPITypes } from './../types/spider';

const API = {
    donews: 'https://www.donews.com/digital/index',
    githubTrending: 'https://github.com/trending',
};

function catchDonews(url: string) {
    return axios
        .get(url)
        .then(function (response) {
            let html_string = response.data.toString(); // 获取网页内容
            const $ = cheerio.load(html_string); // 传入页面内容
            let list_array: any[] = [];

            $('.w1200 .w840').each(function () {
                // 像jQuery一样获取对应节点值
                let obj: any = {};
                obj.title = $(this).find('3').text().trimStart().trimEnd(); // 获取标题
                console.log(obj);
                list_array.push(obj);

                // 检测各项数据是否正确
                // console.log(obj);
            });

            // 回归按新增 star 数量排名lop
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

function githubTrending(url: string) {
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

function spider(type: IAPITypes = 'githubTrending') {
    let url = API[type];

    switch (type) {
        case API.donews:
            return catchDonews(url);

        case API.githubTrending:
            return githubTrending(url);

        default:
            return githubTrending(url);
    }
}

export default { spider };
