import {connection as db} from 'mongoose';
import bcrypt from 'bcrypt';
import logger from '../utils/logger';
import config from 'config';
import {IProvider, IProviderModel} from "../types/provider";
import ProviderSchema from "../schemas/provider";


ProviderSchema.pre<IProvider>('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    try {
        const salt = await bcrypt.genSalt(Number(config.get('saltWorkFactor')));
        this.password = await bcrypt.hash(this.password, salt);
    } catch(err) {
        logger.error(err);
    }
});

ProviderSchema.methods.checkPasswords = async function(candidatePassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (e) {
        logger.error(e);
        return false;
    }
};

const Provider = db.model<IProviderModel>('Provider', ProviderSchema);
export default Provider;
