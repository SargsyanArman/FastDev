import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase'
import { collection, getDocs } from 'firebase/firestore';
import TopQuestionsItem from './TopQuestionsItem';

const TopQuestions = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const questionsCollection = collection(db, 'questions');
            const questionSnapshot = await getDocs(questionsCollection);
            const questionList = questionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setQuestions(questionList);
        };

        fetchQuestions();
    }, []);

    return (
        <div className='mt-14'>
            <h3 className='text-zinc-900 font-bold text-[20px]'>Top Questions</h3>
            <div className='mt-5 flex w-full flex-col gap-[30px]'>
                {questions.slice(0, 4).map(question => (
                    <TopQuestionsItem key={question.id} question={question} />
                ))}
            </div>
        </div>
    );
};

export default TopQuestions;
