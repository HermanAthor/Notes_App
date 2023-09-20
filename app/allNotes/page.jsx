"use client";
import DialogComp from "@/components/DialogComp";
import AppLayout from "@/components/Layouts/AppLayout";
import DetailModal from "@/components/Modals/DetailModal";
import NavHeader from "@/components/NavHeader";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getNoteData } from "../libs/getData";
import Search from "@/components/Search";
import { UserButton, useUser } from "@clerk/nextjs";

function AllNotes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useUser(); //getting user object

  //handling the modal state ...
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  console.log("Selected Note: ", selectedNote);

  const handleEdit = () => {
    // a function that determines if i can show the edit functionallity or not*
    setEdit(!edit);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedNote(null);
  };

  const ModalOpen = (note) => {
    setIsOpen(true);
    setSelectedNote(note);
    console.log("Note", note);
  };

  useEffect(async () => {
    const data = await getNoteData();
    if (data) {
      setNotes(data.results);
    }
  }, []);

  const filteredNotes = notes.filter((filteredNote) => {
    if (search === "") {
      return filteredNote;
    } else if (
      filteredNote.newNoteTitle.toLowerCase().includes(search.toLowerCase()) ||
      filteredNote.newNote.toLowerCase().includes(search.toLowerCase()) ||
      filteredNote.category.toLowerCase().includes(search.toLowerCase())
    ) {
      return filteredNote;
    }
  });

  return (
    <AppLayout>
      <NavHeader setSearch={setSearch} />

      <div className="px-10 flex flex-row justify-between items-center w-full">
        <div className="my-4 flex flex-row justify-between w-auto items-center gap-10">
          <Typography variant="h6" className="text-lg ">
            {" "}
            You have {filteredNotes.length} Notes
          </Typography>
          <div className="hidden md:flex w-96">
            <Search setSearch={setSearch} search={search} />
          </div>
          <div className="inline md:hidden">Select component</div>
        </div>
        <div className="hidden md:flex flex-row justify-center items-center gap-3">
          <p className="text-lg">{user?.firstName}</p>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="overflow-y-auto p-2 no-scrollbar">
        <div className=" overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
            {notes &&
              filteredNotes.map((note) => {
                const { category, newNoteTitle, newNote, _id } = note;
                let bgColor = "";
                if (category) {
                  if (category === "work") {
                    bgColor = "bg-yellow-500";
                  } else if (category === "todos") {
                    bgColor = "bg-red-500";
                  } else if (category === "reminders") {
                    bgColor = "bg-blue-500";
                  } else if (category === "work") {
                    bgColor = "bg-yellow-500";
                  } else if (category === "money") {
                    bgColor = "bg-green-500";
                  }
                }

                const getBgColor = () => {
                  let bgColor1 = "";
                  if (category) {
                    if (category === "work") {
                      return (bgColor1 = "#f2fa84");
                    } else if (category === "todos") {
                      return (bgColor1 = "#fa7066");
                    } else if (category === "reminders") {
                      return (bgColor1 = "#84ecfa");
                    } else if (category === "money") {
                      return (bgColor1 = "#84fa88");
                    }
                  }
                };
                return (
                  <>
                    <Card
                      key={_id}
                      className={`${bgColor} dark:bg-[#515354]`}
                      onClick={() => ModalOpen(note)}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: { getBgColor } }}
                            aria-label="category"
                          >
                            {category[0].toUpperCase()}
                          </Avatar>
                        }
                        title={newNoteTitle}
                        subheader={category}
                      />
                      <CardContent>
                        <Typography variant="body2">{newNote}</Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton>
                          <MoreHorizOutlinedIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </>
                );
              })}
          </div>
          {isOpen && (
            <DetailModal
              note={selectedNote}
              isOpen={isOpen}
              handleClose={handleClose}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default AllNotes;
