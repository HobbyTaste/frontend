import BaseFetchClass from './BaseFetchClass';

const BASE_URL = '/restapi/comment';

interface IComment {
    text: string,
    datetime: string,
    evaluation: number
}

/**
 * Апи для работы с комментариями
 */
class Comment extends BaseFetchClass {
    public constructor() {
        super(BASE_URL);
    }

    /**
     * Добавление комментария к хобби
     * @param comment комментарий
     * @param hobbyId id хобби, к которому добавляем комментарий
     */
    public async stupidAddComment(comment: IComment, hobbyId: string): Promise<Response> {
        return this.post(`/create?hobbyId=${hobbyId}`, comment);
    }
}

export default Comment;