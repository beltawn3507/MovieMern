import React, { useState, useEffect } from "react";
import { useCreateGenreMutation, useUpdateGenreMutation, useDeleteGenreMutation, useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";

function ListGenre() {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [updatename, setUpdatename] = useState("");
  const [selectedgenre, setSelectedgenre] = useState(null);
  const [modalvisible, setModalvisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();
    if (!name) return toast.warning("Please enter a genre name");

    try {
      await createGenre({ name }).unwrap();
      toast.success("Genre created successfully!");
      setName("");
      refetch();
    } catch (error) {
      const errMsg = error?.data?.message || error?.data?.error || "Creating genre failed, please try again.";
      toast.error(errMsg);
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const id = selectedgenre._id;
      await deleteGenre(id).unwrap();
      toast.success("Genre deleted successfully");
      setModalvisible(false);
setSelectedgenre(null); 
setUpdatename("");
      refetch();
    } catch (error) {
      const errMsg =  "Deleting genre failed, please try again.";
      toast.error(errMsg);
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();
    if (!updatename) return toast.warning("Please enter a genre name");

    try {
      await updateGenre({ id: selectedgenre._id, updateGenre: { name: updatename } }).unwrap();
      toast.success("Genre updated successfully");
      setUpdatename("");
      setModalvisible(false);
      refetch();
    } catch (error) {
      const errmsg = error?.data?.message || error?.data?.error || "Updating genre failed, try again";
      toast.error(errmsg);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-6 lg:p-10 flex flex-col items-center">
    {/* Centered Header */}
    <div className="w-full max-w-7xl mx-auto text-center">
    <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-teal-600">🎵 Manage Genres</h1>
    </div>
    
    {/* Centered Create Genre Form */}
    <div className="w-full max-w-2xl mx-auto">
    <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 mb-6 md:mb-10">
    <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-teal-600 text-center">Add a New Genre</h2>
    <GenreForm value={name} setValue={setName} handleSubmit={handleCreateGenre} />
    </div>
    </div>
    
    {/* Centered Genre List */}
    <div className="w-full max-w-7xl mx-auto">
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-4">
    {genres?.map((genre) => (
    <button
    key={genre._id}
    className="bg-white border border-teal-500 text-teal-600 py-2 px-3 sm:py-3 sm:px-4 md:py-3 md:px-5 rounded-lg md:rounded-xl shadow-md hover:bg-teal-500 hover:text-white transition-all duration-200 text-sm sm:text-base"
    onClick={() => {
    setModalvisible(true);
    setSelectedgenre(genre);
    setUpdatename(genre.name);
    }}
    >
    {genre.name}
    </button>
    ))}
    </div>
    </div>
    
    {/* Centered Modal */}
    <Modal isOpen={modalvisible} onClose={() => setModalvisible(false)}>
    <div className="w-full max-w-md mx-auto">
    <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-center text-teal-600">Update Genre</h2>
    <GenreForm
    value={updatename}
    setValue={setUpdatename}
    handleSubmit={handleUpdateGenre}
    buttonText="Update"
    handleDelete={handleDeleteGenre}
    />
    </div>
    </Modal>
    </div>
    );
}

export default ListGenre;
