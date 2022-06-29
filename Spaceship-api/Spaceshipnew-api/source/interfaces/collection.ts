import { Document } from 'mongoose';

export default interface collection extends Document {
    id: string,
    serial: string,
    uri: string,
    name: string,
    price: string,
    owner: string,
    description: string,
    type: string,
    hasSelled: boolean
}
