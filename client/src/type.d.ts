interface ITodo {
    _id: string;
    name: string;
    description: string;
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
}

interface TodoProps {
    todo: ITodo;
}

type ApiDataType = {
    message: string;
    status: string;
    todos: ITodo[];
    todo?: ITodo;
};

interface IPixivProps {
    size?: 'original' | 'large' | 'medium' | 'squareMedium';
    domain: 'https://i.pixiv.cat' | string;
    webp: 0 | 1;
    detail: 0 | 1;
}

type ApiPixivTypes = {
    params: IPixivProps;
};

type ApiSpiderTypes = {
    values: any[];
};
