import mongoose, { Schema } from 'mongoose';

export const ContactSchema = new Schema(
    {
        //  define the necessary fields for your contact list
    },
    { collection: 'contacts' }
)

export default mongoose.model('Contact', ContactSchema);
