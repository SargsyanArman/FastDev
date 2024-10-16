import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';
import QuestionsItem from './QuestionsItem'
import { useNavigate } from 'react-router-dom';

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate()

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

    const limitedQuestions = questions.slice(0, 4);
    console.log(limitedQuestions);

    return (
        <div className='mt-20 flex w-full flex-col gap-6'>
            <button onClick={() => navigate('all-questions')} className='flex justify-end gap-3 text-sm font-bold text-red-500 hover:text-red-400'>
                VIEW ALL QUESTIONS
                <span> <i className="fa-solid fa-arrow-right-long sidebar-right-btnRight"> </i></span>
            </button>
            <div className='mt-6 flex flex-col gap-6'>
                {limitedQuestions.map(question => (
                    <QuestionsItem key={question.id} question={question} />
                ))}
            </div>
        </div>
    )
}

export default Questions