import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const questionRouter = Router();

questionRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("questions");
    const questionData = { ...req.body };
    const newQuestionData = await collection.insertOne(questionData);
    return res.json({
      message: `New question Id ${newQuestionData.insertedId} has been created successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

questionRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("questions");
    const allQuestions = await collection.find({}).limit(10).toArray();
    return res.json({ data: allQuestions });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

questionRouter.get("/:questionId", async (req, res) => {
  try {
    const collection = db.collection("questions");
    const questionId = new ObjectId(req.params.questionId);

    const questionById = await collection.findOne({ _id: questionId });

    return res.json({ data: questionById });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

questionRouter.put("/:questionId", async (req, res) => {
  try {
    const collection = db.collection("questions");

    const newQuestionData = { ...req.body };

    const questionId = new ObjectId(req.params.questionId);

    await collection.updateOne(
      {
        _id: questionId,
      },
      {
        $set: newQuestionData,
      }
    );
    return res.json({
      message: `Question Id ${questionId} has been updated successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

questionRouter.delete("/:questionId", async (req, res) => {
  try {
    const collection = db.collection("questions");
    const questionId = new ObjectId(req.params.questionId);

    await collection.deleteOne({ _id: questionId });

    return res.json({
      message: `Question Id ${questionId} has been deleted successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

export default questionRouter;
