import BaseFetchClass from './BaseFetchClass';

interface IHobby {
    label: string,     // название
    phone?: string,    // номер телефона
    email?: string,    // контактный email
    address?: string,   // точный адрес
    metroStation?: string,  // название станции метро ближайшей
    metroId?: string,   // id-шник станции метро
    description: string,  // полное описание хобби
    shortDescription: string,   // краткое описание
    owner?: string,         // id-шник партнера, кто создал хобби
    avatar: string | File, // при отправке это файл пользователя e.target.file, при получении - url на картнку в облаках
}

const BASE_URL = '/hobby';

/**
 * API для работы с хобби: поиск, добавление, редактирование
 */
class Hobby extends BaseFetchClass{
    public constructor() {
        super(BASE_URL);
    }

    /**
     * Добавляет хобби
     * @param{IHobby} hobbyState
     * @return {Promise<IHobby>}
     */
    public async add(hobbyState: IHobby): Promise<Response> {
        const formData = new FormData();
        for (const key in hobbyState) {
            formData.append(key, hobbyState[key]);
        }
        const response = await this.post('/add', formData, {isFormData: true});
        if (!response.ok) {
            console.error(response);
        }
        return response;
    }

    /**
     * Поиск хобби по имени и метро, а также по id станции метро, которые можно получить из Geo API
     * @param label
     * @param metroId
     * В случае ошибки выводит в консоль ошибку
     */
    public async find(label: string, metroId?: string | number): Promise<Response> {
        if (!label) {
            throw new Error(`Label is empty: label=${label}`);
        }
            const response = await this.get('/find', {label, metroId});
        if (!response.ok) {
            console.error(response);
        }
        return response;
    }

    /**
     * Получает список всех хобби
     */
    public async getAll(): Promise<Response> {
        const response = await this.get('/all');
        if (!response.ok) {
            console.error(await response.json());
        }
        return response;
    }

    /**
     * Получает ифнормацию по конкретному хобби
     * @param id - хобби
     */
    public async getInfo(id: string): Promise<Response> {
        const response = await this.get('/info', {id});
        if (!response.ok) {
            console.error(response);
        }
        return response;
    }

    /**
     * Редактирование пользователя
     * @param id - пользователя
     * @param updatedProperties - параметры обновления
     */
    public async edit(id: string, updatedProperties: Partial<IHobby>): Promise<Response> {
        // @ts-ignore
        const response = await this.post('/edit', updatedProperties);
        if (!response.ok) {
            console.error(response);
        }
        return response;
    }
}

export default Hobby;
