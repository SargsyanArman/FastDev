// import { collection, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { db } from '../../../firebase';
// import { useSelector } from 'react-redux';
// import author from '../../../images/author.png'

// const Question = () => {
//     const { questionId } = useParams();
//     const [questions, setQuestions] = useState([]);
//     const [question, setQuestion] = useState(null);
//     const [newAnswer, setNewAnswer] = useState('');
//     const user = useSelector((state) => state.user);
//     const [currentUserData, setCurrentUserData] = useState(null);
//     const navigate = useNavigate()

//     useEffect(() => {
//         const unsubscribe = onSnapshot(collection(db, 'questions'), (snapshot) => {
//             const fetchedQuestions = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//             setQuestions(fetchedQuestions);
//         });

//         return () => unsubscribe();
//     }, []);

//     useEffect(() => {
//         if (questions.length > 0) {
//             const foundQuestion = questions.find((q) => q.id === questionId);
//             setQuestion(foundQuestion);
//         }
//     }, [questions, questionId]);

//     const fetchUser = async (userId) => {
//         const userDoc = await getDoc(doc(db, 'users', userId));
//         if (userDoc.exists()) {
//             return userDoc.data();
//         } else {
//             return null;
//         }
//     };

//     useEffect(() => {
//         const fetchCurrentUser = async () => {
//             if (user.id) {
//                 const userData = await fetchUser(user.id);
//                 setCurrentUserData(userData);
//             }
//         };

//         fetchCurrentUser();
//     }, [user.id]);

//     useEffect(() => {
//         const fetchUsersData = async () => {
//             const usersData = {};
//             for (const answer of (question?.answers || [])) {
//                 if (!usersData[answer.userId]) {
//                     const userData = await fetchUser(answer.userId);
//                     if (userData) {
//                         usersData[answer.userId] = userData;
//                     }
//                 }
//             }
//         };

//         if (question) {
//             fetchUsersData();
//         }
//     }, [question]);

//     const formatDate = (timestamp) => {
//         const date = timestamp.toDate();
//         const options = { year: 'numeric', month: 'long' };
//         return date.toLocaleDateString(undefined, options);
//     };

//     const handleAddAnswer = async () => {
//         if (newAnswer.trim() === '') return;

//         const userId = user.id;
//         const userName = currentUserData?.fullName;
//         const userPhotoUrl = currentUserData?.photo || author;

//         const updatedAnswers = [
//             ...(question.answers || []),
//             {
//                 text: newAnswer,
//                 userId,
//                 userName,
//                 userPhotoUrl,
//                 createdAt: new Date(),
//             },
//         ];

//         const questionRef = doc(db, 'questions', questionId);
//         await updateDoc(questionRef, { answers: updatedAnswers });

//         setNewAnswer('');
//     };

//     if (!question) {
//         return <div>Question not found</div>;
//     }

//     return (
//         <div className='flex flex-col gap-6 w-[953px] my-7 mx-5 overflow-y-auto max-h-[100vh-122px] scroll-main'>
//             <h1 className='text-3xl font-bold'>{question.title}</h1>
//             <img
//                 src={question.imageUrl}
//                 alt={question.title}
//                 className='w-full h-[300px] lg:h-[500px] rounded-2xl mt-5'
//             />
//             <p className='mt-5'>{question.description}</p>
//             <p className='mt-3 text-gray-500'>Asked on: {formatDate(question.createdAt)}</p>

//             <div className='mt-5'>
//                 <h2 className='text-xl font-semibold'>Answers:</h2>
//                 <ul className='list-disc pl-5'>
//                     {question.answers && question.answers.map((answer, index) => (
//                         <li key={index} className='flex items-start gap-2 mb-4'>
//                             <img
//                                 src={answer.userPhotoUrl}
//                                 alt={answer.userName}
//                                 className='w-8 h-8 rounded-full cursor-pointer'
//                                 onClick={() => navigate(`/profile/${answer.userId}`)}
//                             />
//                             <div>
//                                 <Link to={`/profile/${answer.userId}`} className='font-semibold text-blue-600'>
//                                     {answer.userName}
//                                 </Link>
//                                 <p className='mt-1'>{answer.text}</p>
//                                 <p className='mt-1 text-gray-500 text-sm'>Answered on: {formatDate(answer.createdAt)}</p>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             <div className='mt-5'>
//                 <h2 className='text-lg font-semibold'>Add your answer:</h2>
//                 <textarea
//                     value={newAnswer}
//                     onChange={(e) => setNewAnswer(e.target.value)}
//                     rows={4}
//                     className='w-full border border-gray-300 rounded-md p-2'
//                     placeholder='Type your answer here...'
//                 />
//                 <button
//                     onClick={handleAddAnswer}
//                     className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-md'
//                 >
//                     Submit Answer
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Question;

// import { collection, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore'; 
// import React, { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { db } from '../../../firebase';
// import { useSelector } from 'react-redux';
// import author from '../../../images/author.png'
// import LoginRequiredPage from '../LoginRequiredPage'; 

// const Question = () => {
//     const { questionId } = useParams();
//     const [questions, setQuestions] = useState([]);
//     const [question, setQuestion] = useState(null);
//     const [newAnswer, setNewAnswer] = useState('');
//     const user = useSelector((state) => state.user);
//     const [currentUserData, setCurrentUserData] = useState(null);
//     const [replyingAnswerId, setReplyingAnswerId] = useState(null);
//     const [replyText, setReplyText] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const unsubscribe = onSnapshot(collection(db, 'questions'), (snapshot) => {
//             const fetchedQuestions = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//             setQuestions(fetchedQuestions);
//         });

//         return () => unsubscribe();
//     }, []);

//     useEffect(() => {
//         if (questions.length > 0) {
//             const foundQuestion = questions.find((q) => q.id === questionId);
//             setQuestion(foundQuestion);
//         }
//     }, [questions, questionId]);

//     const fetchUser = async (userId) => {
//         const userDoc = await getDoc(doc(db, 'users', userId));
//         if (userDoc.exists()) {
//             return userDoc.data();
//         } else {
//             return null;
//         }
//     };

//     useEffect(() => {
//         const fetchCurrentUser = async () => {
//             if (user.id) {
//                 const userData = await fetchUser(user.id);
//                 setCurrentUserData(userData);
//             }
//         };

//         fetchCurrentUser();
//     }, [user.id]);

//     const formatDate = (timestamp) => {
//         const date = timestamp.toDate();
//         const options = { year: 'numeric', month: 'long' };
//         return date.toLocaleDateString(undefined, options);
//     };

//     const handleAddAnswer = async () => {
//         if (newAnswer.trim() === '') return;

//         const userId = user.id;
//         const userName = currentUserData?.fullName;
//         const userPhotoUrl = currentUserData?.photo || author;

//         const updatedAnswers = [
//             ...(question.answers || []),
//             {
//                 text: newAnswer,
//                 userId,
//                 userName,
//                 userPhotoUrl,
//                 createdAt: new Date(),
//                 replies: [],
//             },
//         ];

//         const questionRef = doc(db, 'questions', questionId);
//         await updateDoc(questionRef, { answers: updatedAnswers });

//         setNewAnswer('');
//     };

//     const handleAddReply = async (answerId) => {
//         if (replyText.trim() === '') return;

//         const userId = user.id;
//         const userName = currentUserData?.fullName;
//         const userPhotoUrl = currentUserData?.photo || author;

//         const updatedAnswers = question.answers.map((answer) => {
//             if (answer.userId === answerId) {
//                 return {
//                     ...answer,
//                     replies: [
//                         ...(answer.replies || []),
//                         {
//                             text: replyText,
//                             userId,
//                             userName,
//                             userPhotoUrl,
//                             createdAt: new Date(),
//                         },
//                     ],
//                 };
//             }
//             return answer;
//         });

//         const questionRef = doc(db, 'questions', questionId);
//         await updateDoc(questionRef, { answers: updatedAnswers });

//         setReplyingAnswerId(null);
//         setReplyText('');
//     };
//     const handleReply = (answer) => {
//         const initialReplyText = `${answer.userName} `;
//         setReplyingAnswerId(answer.userId); 
//         setReplyText(initialReplyText); 
//     };

//     if (!question) {
//         return <div>Question not found</div>;
//     }

//     return (
//         <div className='flex flex-col gap-6 w-[953px] my-7 mx-5 overflow-y-auto max-h-[100vh-122px] scroll-main'>
//             <h1 className='text-3xl font-bold'>{question.title}</h1>
//             <img
//                 src={question.imageUrl}
//                 alt={question.title}
//                 className='w-full h-[300px] lg:h-[500px] rounded-2xl mt-5'
//             />
//             <p className='mt-5'>{question.description}</p>
//             <p className='mt-3 text-gray-500'>Asked on: {formatDate(question.createdAt)}</p>

//             <div className='mt-5'>
//                 <h2 className='text-xl font-semibold'>Answers:</h2>
//                 <ul className='list-disc pl-5'>
//                     {question.answers && question.answers.map((answer, index) => (
//                         <li key={index} className='flex flex-col gap-2 mb-4'>
//                             <div className='flex items-start gap-2'>
//                                 <img
//                                     src={answer.userPhotoUrl}
//                                     alt={answer.userName}
//                                     className='w-8 h-8 rounded-full cursor-pointer'
//                                     onClick={() => navigate(`/profile/${answer.userId}`)}
//                                 />
//                                 <div>
//                                     <Link to={`/profile/${answer.userId}`} className='font-semibold text-blue-600'>
//                                         {answer.userName}
//                                     </Link>
//                                     <p className='mt-1'>{answer.text}</p>
//                                     <p className='mt-1 text-gray-500 text-sm'>Answered on: {formatDate(answer.createdAt)}</p>
//                                 </div>
//                             </div>
                            
//                             <button
//                                 onClick={() => handleReply(answer)}
//                                 className="text-blue-500 text-sm self-start mt-1 ml-10"
//                             >
//                                 Reply
//                             </button>
                            
//                             {replyingAnswerId === answer.userId && (
//                                 <div className='mt-2'>
//                                     <textarea
//                                         value={replyText}
//                                         onChange={(e) => setReplyText(e.target.value)}
//                                         rows={2}
//                                         className='w-full border border-gray-300 rounded-md p-2'
//                                         placeholder='Write your reply...'
//                                     />
//                                     <button
//                                         onClick={() => handleAddReply(answer.userId)}
//                                         className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-md'
//                                     >
//                                         Submit Reply
//                                     </button>
//                                 </div>
//                             )}

//                             {answer.replies && answer.replies.length > 0 && (
//                                 <ul className='pl-8 mt-3'>
//                                     {answer.replies.map((reply, i) => (
//                                         <li key={i} className='flex items-start gap-2 mb-2'>
//                                             <img
//                                                 src={reply.userPhotoUrl}
//                                                 alt={reply.userName}
//                                                 className='w-6 h-6 rounded-full'
//                                             />
//                                             <div>
//                                                 <span className='font-semibold'>{reply.userName}</span>
//                                                 <p>{reply.text}</p>
//                                                 <p className='text-gray-500 text-sm'>{formatDate(reply.createdAt)}</p>
//                                             </div>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             <div className='mt-5'>
//                 <h2 className='text-lg font-semibold'>Add your answer:</h2>
//                 <textarea
//                     value={newAnswer}
//                     onChange={(e) => setNewAnswer(e.target.value)}
//                     rows={4}
//                     className='w-full border border-gray-300 rounded-md p-2'
//                     placeholder='Type your answer here...'
//                 />
//                 <button
//                     onClick={handleAddAnswer}
//                     className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-md'
//                 >
//                     Submit Answer
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Question;

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
