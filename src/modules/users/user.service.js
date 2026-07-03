import { ObjectId } from "mongodb";
import { getDB } from "../../config/database.js";

export const getAllUsers = async () => {
  const db = getDB();

  return await db
    .collection("users")
    .find({})
    .project({
      password: 0,
    })
    .toArray();
};

export const getSingleUser = async (id) => {
  const db = getDB();

  return await db.collection("users").findOne(
    {
      _id: new ObjectId(id),
    },
    {
      projection: {
        password: 0,
      },
    }
  );
};

export const updateUser = async (id, data) => {
  const db = getDB();

  await db.collection("users").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: data,
    }
  );

  return await getSingleUser(id);
};

export const deleteUser = async (id) => {
  const db = getDB();

  return await db.collection("users").deleteOne({
    _id: new ObjectId(id),
  });
};