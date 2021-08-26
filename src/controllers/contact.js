import { contactSchema } from "../schemas/contactSchema";
import Contact from "../entities/contact";

/**
 * A simple CRUD controller for contacts
 * Create the necessary controller methods
 */
// validateToken

export const all = async (req, res) => {
  try {
    const createdBy = req.params.user_id;
    const contacts = await Contact.find({ createdBy });
    if (!contacts) {
      throw new Error(`No contacts found.kindly add new contacts`);
    }
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const get = async (req, res) => {
  try {
    const _id = req.params.contact_id;
    const createdBy = req.params.user_id;

    const contact = await Contact.findOne({ _id, createdBy });
    if (!contact) {
      throw new Error(`Contact not found`);
    }
    res.status(200).json({ contact });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const validContact = contactSchema(req.body);
    if (validContact.error) {
      throw new Error(validContact.error);
    }
    const { email, phone, gender, firstname, lastname } = validContact.value;
    const createdBy = req.params.user_id;
    const oldContact = await Contact.findOne({
      email,
      firstname,
      lastname,
      phone,
      createdBy,
    });
    if (oldContact) {
      return res.status(409).json({ err: "Contact Already Exist" });
    }
    const newContact = await new Contact({
      email,
      phone,
      gender,
      firstname,
      lastname,
      createdBy,
    }).save();

    res.status(200).json({ newContact });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const createdBy = req.params.user_id;
    const _id = req.params.contact_id;

    const foundContact = await Contact.findOneAndUpdate(
      { createdBy, _id },
      req.body
    );

    if (!foundContact) {
      res.status(400).json(foundContact);
    }

    res.status(200).json({ foundContact });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const createdBy = req.params.user_id;
    const _id = req.params.contact_id;
    const contact = await Contact.findOneAndDelete({ _id, createdBy });
    if (!contact) {
      throw new Error(`Contact not found`);
    }
    res.status(200).json({ details: "contact successfully deleted" });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export default {
  // get all contacts for a user
  all,
  // get a single contact
  get,
  // create a single contact
  create,
  // update a single contact
  update,
  // remove a single contact
  remove,
};
