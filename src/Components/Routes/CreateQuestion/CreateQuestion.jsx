import React, { useState } from 'react';
import { db, storage } from '../../../firebase';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useSelector } from 'react-redux';

const CreateQuestion = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const user = useSelector((state) => state.user);

    const handleImageUpload = (file) => {
        if (!file) return;

        const storageRef = ref(storage, `questions/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            error => {
                console.error('Upload failed:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    handleQuestionCreation(downloadURL);
                });
            }
        );
    };

    const handleQuestionCreation = async (imageUrl) => {
        try {
            const newQuestion = {
                title,
                description,
                imageUrl,
                createdAt: new Date(),
                author: user.fullName,
                answers: [],
                authorId: user.id
            };
            await addDoc(collection(db, 'questions'), newQuestion);
            const userRef = doc(db, "users", user.id);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {
                console.log('User not found');
                return;
            }

            const currUser = docSnap.data();

            await updateDoc(userRef, {
                'stats.3.totalQuestions': (currUser.stats[3]?.totalQuestions || 0) + 1
            });

            alert('Question created successfully!');
            setTitle('');
            setDescription('');
            setImage(null);
        } catch (error) {
            console.error('Error adding question:', error);
        } finally {
            setIsUploading(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsUploading(true);

        if (image) {
            handleImageUpload(image);
        } else {
            handleQuestionCreation('');
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 my-7 mx-5 overflow-y-auto w-[953px] max-h-[100vh-122px] scroll-main">
            <form onSubmit={handleSubmit} className="editor w-full max-w-2xl flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg bg-white rounded-lg">
                <input
                    className="title bg-gray-100 border border-gray-300 p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    spellCheck="false"
                    placeholder="Question Title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="description bg-gray-100 sec p-3 h-40 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    spellCheck="false"
                    placeholder="Describe your question here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input type="file" onChange={(e) => setImage(e.target.files[0])} />

                <div className="buttons flex justify-end gap-2 mt-4">
                    <button type="submit" disabled={isUploading} className="btn bg-indigo-500 text-white p-2 font-semibold rounded-lg hover:bg-indigo-600 transition">
                        {isUploading ? 'Uploading...' : 'Create Question'}
                    </button>
                </div>
            </form>

            <p className="text-red-600 text-sm mt-4">
                Note: Only an admin can edit or delete questions after they have been added.
            </p>
        </div>
    );
};

export default CreateQuestion;
