import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { collection, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import author from '../../../images/author.png';
import Reply from './Reply';

const Question = () => {
    const { questionId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState(null);
    const [newAnswer, setNewAnswer] = useState('');
    const [currentUserData, setCurrentUserData] = useState(null);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

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

    useEffect(() => {
        if (questions.length > 0) {
            const foundQuestion = questions.find((q) => q.id === questionId);
            setQuestion(foundQuestion);
        }
    }, [questions, questionId]);

    const fetchUser = async (userId) => {
        const userDoc = await getDoc(doc(db, 'users', userId));
        return userDoc.exists() ? userDoc.data() : null;
    };

    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (user.id) {
                const userData = await fetchUser(user.id);
                setCurrentUserData(userData);
            }
        };

        fetchCurrentUser();
    }, [user.id]);

    const formatDate = (timestamp) => {
        const date = timestamp.toDate();
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString(undefined, options);
    };

    const handleAddAnswer = async () => {
        if (newAnswer.trim() === '') return;

        const userId = user.id;
        const userName = currentUserData?.fullName;
        const userPhotoUrl = currentUserData?.photo || author;

        const updatedAnswers = [
            ...(question.answers || []),
            {
                text: newAnswer,
                userId,
                userName,
                userPhotoUrl,
                createdAt: new Date(),
                replies: [],
            },
        ];

        const questionRef = doc(db, 'questions', questionId);
        await updateDoc(questionRef, { answers: updatedAnswers });

        setNewAnswer('');
    };

    const handleAddReply = async (answerId, replyText) => {
        if (replyText.trim() === '') return;

        const userId = user.id;
        const userName = currentUserData?.fullName;
        const userPhotoUrl = currentUserData?.photo || author;

        const updatedAnswers = question.answers.map((answer) => {
            if (answer.userId === answerId) {
                return {
                    ...answer,
                    replies: [
                        ...(answer.replies || []),
                        {
                            text: replyText,
                            userId,
                            userName,
                            userPhotoUrl,
                            createdAt: new Date(),
                        },
                    ],
                };
            }
            return answer;
        });

        const questionRef = doc(db, 'questions', questionId);
        await updateDoc(questionRef, { answers: updatedAnswers });

        const updatedQuestion = { ...question, answers: updatedAnswers };
        setQuestion(updatedQuestion);
    };

    if (!question) {
        return <div>Question not found</div>;
    }

    return (
        <div className="flex flex-col gap-6 w-[953px] my-7 mx-5 overflow-y-auto max-h-[100vh-122px] scroll-main">
            <h1 className="text-3xl font-bold">{question.title}</h1>
            <img
                src={question.imageUrl}
                alt={question.title}
                className="w-full h-[300px] lg:h-[500px] rounded-2xl mt-5"
            />
            <p className="mt-5">{question.description}</p>
            <p className="mt-3 text-gray-500">Asked on: {formatDate(question.createdAt)}</p>

            <div className="mt-5">
                <h2 className="text-xl font-semibold">Answers:</h2>
                <ul className="list-disc pl-5">
                    {question.answers &&
                        question.answers.map((answer, index) => (
                            <Reply
                                key={index}
                                answer={answer}
                                handleAddReply={handleAddReply}
                                currentUserData={currentUserData}
                                userId={user.id}
                            />
                        ))}
                </ul>
            </div>

            <div className="mt-5">
                <h2 className="text-lg font-semibold">Add your answer:</h2>
                <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Type your answer here..."
                />
                <button
                    onClick={handleAddAnswer}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Submit Answer
                </button>
            </div>
        </div>
    );
};

export default Question;
