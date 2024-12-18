import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    const [isLoading, setIsLoading] = useState(true); 
    const user = useSelector((state) => state.user);

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
            setQuestion(foundQuestion || null);
            setIsLoading(false); 
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
        const userName = currentUserData?.fullName || 'Anonymous';
        const userPhotoUrl = currentUserData?.photo || author;

        const updatedAnswers = [
            ...(question?.answers || []),
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

        setQuestion({ ...question, answers: updatedAnswers });
        setNewAnswer('');
    };

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (!question) {
        return <div>Question not found</div>;
    }

    const deleteAnswerFromFirestore = async (questionId, answerText, createdAt) => {
        try {
            const questionRef = doc(db, 'questions', questionId);
            const questionSnapshot = await getDoc(questionRef);
    
            if (questionSnapshot.exists()) {
                const questionData = questionSnapshot.data();
                const updatedAnswers = questionData.answers.filter((answer) => {
              
                    const answerCreatedAt = answer.createdAt.toMillis
                        ? answer.createdAt.toMillis()
                        : new Date(answer.createdAt).getTime(); 
                    return (
                        answer.text !== answerText ||
                        answerCreatedAt !== createdAt.toMillis()
                    );
                });
    
                await updateDoc(questionRef, { answers: updatedAnswers });
            }
        } catch (error) {
            console.error('Error deleting answer from Firestore:', error);
            throw error;
        }
    };
    
    

    const handleDeleteAnswer = async (answerText, createdAt, answerUserId) => {
        try {
            if (answerUserId !== user.id) {
                alert("You are not authorized to delete this answer.");
                return;
            }
    
            const createdAtMillis =
                createdAt && createdAt.toMillis ? createdAt.toMillis() : new Date(createdAt).getTime();
    
            setQuestion((prevQuestion) => {
                const updatedAnswers = prevQuestion.answers.filter(
                    (answer) =>
                        answer.text !== answerText ||
                        (answer.createdAt && answer.createdAt.toMillis
                            ? answer.createdAt.toMillis()
                            : new Date(answer.createdAt).getTime()) !== createdAtMillis
                );
                return { ...prevQuestion, answers: updatedAnswers };
            });
    
            await deleteAnswerFromFirestore(questionId, answerText, createdAt);
    
        } catch (error) {
            console.error("Failed to delete answer:", error);
        }
    };
    
    
    

    const handleAddReply = async (answerText, replyText) => {
        if (replyText.trim() === '') return;
    
        const userId = user.id;
        const userName = currentUserData?.fullName || 'Anonymous';
        const userPhotoUrl = currentUserData?.photo || author;
    
        const updatedAnswers = question.answers.map((answer) => {
            if (answer.text === answerText) {
                return {
                    ...answer,
                    replies: [
                        ...(answer.replies || []),
                        {
                            text: replyText,
                            userId,
                            userName,
                            userPhotoUrl,
                            createdAt: new Date().toISOString(),
                        },
                    ],
                };
            }
            return answer;
        });
    
        const questionRef = doc(db, 'questions', questionId);
        await updateDoc(questionRef, { answers: updatedAnswers });
        setQuestion((prev) => ({ ...prev, answers: updatedAnswers }));
    };
    
    const handleDeleteReply = async (answerText, replyCreatedAt, replyUserId) => {
        
    
        const updatedAnswers = question.answers.map((answer) => {
            if (answer.text === answerText) {
                const updatedReplies = answer.replies.filter(
                    (reply) => reply.createdAt !== replyCreatedAt
                );
                return { ...answer, replies: updatedReplies };
            }
            return answer;
        });
    
        const questionRef = doc(db, 'questions', questionId);
        await updateDoc(questionRef, { answers: updatedAnswers });
        setQuestion((prev) => ({ ...prev, answers: updatedAnswers }));
    };
    
    
    return (
        <div className="flex flex-col gap-6 w-[953px] my-7 mx-5 overflow-y-auto max-h-[100vh-122px] scroll-main">
            <h1 className="text-3xl font-bold">{question?.title || 'Untitled'}</h1>
            {question?.imageUrl && (
                <img
                    src={question.imageUrl}
                    alt={question.title || 'Question Image'}
                    className="w-full h-[300px] lg:h-[500px] rounded-2xl mt-5"
                />
            )}
            <p className="mt-5 whitespace-pre-line">{question?.description || 'No description available.'}</p>
            {question?.createdAt && (
                <p className="mt-3 text-gray-500">Asked on: {formatDate(question.createdAt)}</p>
            )}

          

<div className="mt-5">
    <h2 className="text-xl font-semibold">Answers:</h2>
    <ul className="list-disc pl-5">
        {question?.answers?.length > 0 ? (
            question.answers.map((answer, index) => (
                <div key={index} className="mb-4 flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <p className="font-medium">{answer.text}</p>
                        {answer.userId === user?.id && (
                            <button
                                onClick={() => handleDeleteAnswer(answer.text, answer.createdAt, answer.userId)}
                                className="text-red-500 text-sm"
                            >
                              < i className="fa-solid fa-trash" />
                            </button>
                        )}
                    </div>
                    <Reply
                        answer={answer}
                        handleAddReply={handleAddReply}
                        handleDeleteReply={handleDeleteReply}
                    />
                </div>
            ))
        ) : (
            <p>No answers yet. Be the first to answer!</p>
        )}
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
