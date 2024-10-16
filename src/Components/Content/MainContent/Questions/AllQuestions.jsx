import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';
import QuestionsItem from './QuestionsItem';

const AllQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 10;

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'questions'), (snapshot) => {
            const fetchedQuestions = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setQuestions(fetchedQuestions);
        });

        return () => unsubscribe();
    }, []);

    const indexOfLastQuestions = currentPage * questionsPerPage;
    const indexOfFirstQuestions = indexOfLastQuestions - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestions, indexOfLastQuestions);

    const totalPages = Math.ceil(questions.length / questionsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="flex flex-col items-center my-7 mx-5">
            <div className="flex flex-wrap gap-6 max-w-[953px] overflow-y-auto max-h-[calc(100vh-122px)] scroll-main justify-center">
                {currentQuestions.map(question => (
                    <QuestionsItem key={question.id} question={question} />
                ))}
            </div>

            <div className="flex justify-center mt-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="mx-4">{currentPage} / {totalPages}</span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllQuestions;
