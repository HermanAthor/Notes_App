import { mongodbConnect } from "@/app/libs/mongodbConnect";
import newNotes from "@/app/models/newNoteModel";
import recipes from "@/app/models/recipes";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { recipeId } = params;
  try {
    const { editNoteTitle, editNote, newCategory, like, italic } =
      await request.json();
    await mongodbConnect();
    await recipes.findByIdAndUpdate(
      recipeId,
      {
        newNoteTitle: editNoteTitle,
        newNote: editNote,
        category: newCategory,
        isItalic: italic,
        isLiked: like,
      },
      { new: true }
    );
    return NextResponse.json({ message: "Recipe updated" }, { status: 200 });
  } catch (error) {
    console.log("Error updating the recipe", error);
  }
}

export async function GET(request, { params }) {
  const { recipeId } = params;
  console.log(recipeId);
  try {
    await mongodbConnect();
    const recipe = await recipes.find({ _id: recipeId });
    return NextResponse.json({ results: recipe, status: 200 });
  } catch (error) {
    console.log("Error fetching a recipe", error);
  }
}
