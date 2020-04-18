import {IHobbyModel} from "../types/hobby";
import {IUser, IUserInfo, IUserModel} from "../types/user";
import {IProviderModel} from "../types/provider";
import {ICommentModel} from "../types/comment";
import bcrypt from 'bcrypt'
import config from 'config'
import {uploadFileToS3} from "../utils/aws";

export default class UserService {
    Hobby: IHobbyModel;
    User: IUserModel;
    Provider: IProviderModel;
    Comment: ICommentModel;

    constructor(Hobby: IHobbyModel, User: IUserModel, Provider: IProviderModel, Comment: ICommentModel) {
        this.Hobby = Hobby;
        this.Provider = Provider;
        this.User = User;
        this.Comment = Comment;
    }

    async LoginUser(email: string, password: string) {
        const user = await this.User.findOne({email});
        if (!user) {
            throw {status: 400, message: 'Неверный логин'}
        }
        const isTruePassword = await user.checkPasswords(password);
        if (!isTruePassword) {
            throw {status: 400, message: 'Неверный пароль'}
        }
        return user
    }

    async CreateUser(profile: Partial<IUser>, file?: Express.Multer.File) {
        if (!profile.email) {
            throw {status: 400, message: 'Email обязателен для регистрации'}
        }
        const user = await this.User.findOne({email: profile.email});
        if (user) {
            throw {status: 400, message: 'Такой пользователь уже существует'}
        }
        if (file) {
            profile.avatar = await uploadFileToS3('users', file);
        }
        const newUser = new this.User({...profile});
        return newUser.save()
    }

    async EditUser(userId: string, nextData: Partial<IUser>, file?: Express.Multer.File) {
        if (file) {
            nextData.avatar = await uploadFileToS3('users', file);
        }
        if ('password' in nextData) {
            const salt = await bcrypt.genSalt(Number(config.get('saltWorkFactor')));
            nextData.password = await bcrypt.hash(nextData.password, salt);
        }
        return this.User.findByIdAndUpdate(userId, nextData, {new: true})
    }

    async UserInfo(userId: string): Promise<IUserInfo> {
        const user = await this.User.findById(userId);
        if (!user) {
            throw {status: 404, message: 'Не найден такой пользователь'}
        }
        return user.repr();
    }

    async HobbySubscribe(user: IUser, hobbyId?: string) {
        if (!hobbyId) {
            throw {status: 400, message: 'Необходимо указать id хобби для подписки'}
        }
        const hobby = await this.Hobby.findById(hobbyId);
        if (!hobby) {
            throw {status: 404, message: 'Такого хобби не найдено'}
        }
        const nextHobbies = [...new Set(user.hobbies.concat(hobbyId))];
        const nextSubscribers = [...new Set(hobby.subscribers.concat(user._id))];

        await this.Hobby.findByIdAndUpdate(hobbyId, {subscribers: nextSubscribers});
        return this.User.findByIdAndUpdate(user._id, {hobbies: nextHobbies}, {new: true});
    }

    async GetHobbies(user: IUser) {
        const {hobbies: hobbyIds} = user;
        return this.Hobby.find({_id: {$in: hobbyIds}});
    }

    async AvatarUpload(user: IUser, file?: Express.Multer.File) {
        if (!file) {
            throw {status: 400, message: 'Нет файла'}
        }
        if (!file.mimetype.match(/images/)) {
            throw {status: 400, message: 'Неверный формат изображения'}
        }
        const url = await uploadFileToS3('users', file);
        return this.User.findByIdAndUpdate(user._id, {avatar: url}, {new: true});
    }
}
