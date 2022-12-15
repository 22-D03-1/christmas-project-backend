import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("data/db.json"));

export const getAllMessages = async (req, res) => {
    await db.read();
    res.json(db.data.message);
};
export const getMessage = async (req, res) => {
    await db.read();
    const value = db.data.message.find((a) => a.id === +req.params.id);

    if (!value) return res.status(404).send("Not found!");
    res.json(value);
};
export const editMessage = async (req, res) => {
    await db.read();
    const index = db.data.message.findIndex((a) => a.id === +req.params.id);
    if (index < 0) return res.status(404).send("Not found");

    db.data.message[index] = { ...db.data.message[index], ...req.body };

    await db.write();

    res.send(`${req.params.id} updated`);
};

export const deleteMessage = async (req, res) => {
    await db.read();
    const index = db.data.message.findIndex((a) => a.id === +req.params.id);
    if (index < 0) return res.status(404).send("Not found");

    db.data.message.splice(index, 1);

    db.write();

    res.json(202).send(`${req.params.id} deleted`);
};
export const createMessage = async (req, res) => {
    await db.read();
    const nextId = Math.max(...db.data.message.map((a) => a.id)) + 1;
    db.data.messsage.push({id: nextId, ...req.body})
    db.write()
    res.send(`${nextId}`)
};
