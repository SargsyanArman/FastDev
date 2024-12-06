// import React, { useState } from 'react'; 
// import { useSelector } from 'react-redux';
// import LoginRequiredPage from '../LoginRequiredPage';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'; 

// const Reply = ({ answer, handleAddReply, handleDeleteReply }) => {
//     const [replying, setReplying] = useState(false);
//     const [replyText, setReplyText] = useState('');
//     const [showLoginPage, setShowLoginPage] = useState(false);
//     const navigate = useNavigate()
//     const user = useSelector((state) => state.user);

//     const handleReplyClick = () => {
//         const initialReplyText = `@${answer.userName} `;  
//         setReplyText(initialReplyText);  
//         setReplying(true);
//         setShowLoginPage(false);
//     };

//     const handleReplySubmit = () => {
//         if (!user.token) {
//             setShowLoginPage(true);
//             return;
//         }

//         if (replyText.trim()) {
           
//             const replyWithLink = ` ${replyText}`;
//             handleAddReply(answer.userId, replyWithLink);
//             setReplyText(''); 
//             setReplying(false);
//         }
//     };

//     const formatDate = (timestamp) => {
//         if (!timestamp) return 'No date available';
//         if (timestamp.toDate) {
//             const date = timestamp.toDate();
//             const options = { year: 'numeric', month: 'long' };
//             return date.toLocaleDateString(undefined, options);
//         } else if (timestamp instanceof Date) {
//             const options = { year: 'numeric', month: 'long' };
//             return timestamp.toLocaleDateString(undefined, options);
//         } else {
//             return 'Invalid date';
//         }
//     };
    

//     const renderReplyText = (text) => {
      
//         const regex = /(@[a-zA-Z0-9_]+\s?[a-zA-Z0-9_]+)/g; 
//         const parts = text.split(regex);
    
//         return parts.map((part, index) => {
          
//             if (regex.test(part)) {
//                 return (
//                     <Link key={index} to={`/profile/${answer.userId}`} className="text-blue-500 hover:underline">
//                         {part}
//                     </Link>
//                 );
//             }
            
//             return <span key={index}>{part}</span>;
//         });
//     };

//     return (
//         <div className="flex flex-col gap-2 mb-4">
//             <div className="flex items-start gap-2">
//                 <img
//                     src={answer.userPhotoUrl}
//                     alt={answer.userName}
//                     className="w-8 h-8 rounded-full cursor-pointer"
//                     onClick={() => navigate(`/profile/${answer.userId}`)}
//                 />
//                 <div>
//                     <Link
//                         to={`/profile/${answer.userId}`}
//                         className="font-semibold text-blue-500 hover:underline"
//                     >
//                         @{answer.userName}
//                     </Link>
//                     <p className="mt-1">{answer.text}</p>
//                     <p className="mt-1 text-gray-500 text-sm">Answered on: {formatDate(answer.createdAt)}</p>
//                 </div>
//             </div>

//             <button
//                 onClick={handleReplyClick}
//                 className="text-blue-500 text-sm self-start mt-1 ml-10"
//             >
//                 Reply
//             </button>

//             {replying && (
//                 <div className="mt-2">
//                     <div className="flex items-center gap-1 mb-2">
//                         <Link
//                             to={`/profile/${answer.userId}`}
//                             className="text-blue-500 font-medium hover:underline"
//                         >
//                             @{answer.userName}
//                         </Link>
//                         <span className="text-gray-600">:</span>
//                     </div>
//                     <textarea
//                         value={replyText}
//                         onChange={(e) => setReplyText(e.target.value)}
//                         rows={2}
//                         className="w-full border border-gray-300 rounded-md p-2"
//                         placeholder="Write your reply..."
//                     />
//                     <button
//                         onClick={handleReplySubmit}
//                         className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
//                     >
//                         Submit Reply
//                     </button>
//                 </div>
//             )}

//             {showLoginPage && <LoginRequiredPage />}

//             {answer.replies && answer.replies.length > 0 && (
//                 <ul className="pl-8 mt-3">
//                     {answer.replies.map((reply, i) => (
//                         <li key={i} className="flex items-start gap-2 mb-2">
//                             <img
//                                 src={reply.userPhotoUrl}
//                                 alt={reply.userName}
//                                 className="w-6 h-6 rounded-full"
//                             />
//                             <div>
//                                 <p>
//                                     <Link
//                                         to={`/profile/${reply.userId}`}
//                                         className="font-semibold text-blue-500 hover:underline"
//                                     >
//                                         {reply.userName}
//                                     </Link>{' '}
                               
//                                     {renderReplyText(reply.text)}
//                                 </p>
//                                 <p className="text-gray-500 text-sm">{formatDate(reply.createdAt)}</p>
//                                 <button
//                 onClick={() => handleDeleteReply(answer.userId, i)}
//                 className="text-red-500 text-sm mt-1 ml-2"
//             >
//                 <i className="fa-solid fa-trash"></i>,
//             </button>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default Reply;  

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginRequiredPage from '../LoginRequiredPage';

const Reply = ({ answer, handleAddReply, handleDeleteReply }) => {
    const [replying, setReplying] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [showLoginPage, setShowLoginPage] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const handleReplyClick = () => {
        if (!user.token) {
            setShowLoginPage(true);
            return;
        }
        const initialReplyText = `@${answer.userName} `;
        setReplyText(initialReplyText);
        setReplying(true);
    };

    const handleReplySubmit = () => {
        if (replyText.trim()) {
            handleAddReply(answer.text, replyText.trim());
            setReplyText('');
            setReplying(false);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'No date available';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
    };

    const renderReplyText = (text) => {
        const regex = /(@[a-zA-Z0-9_]+)/g;
        const parts = text.split(regex);

        return parts.map((part, index) => {
            if (regex.test(part)) {
                return (
                    <Link
                        key={index}
                        to={`/profile/${answer.userId}`}
                        className="text-blue-500 hover:underline"
                    >
                        {part}
                    </Link>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-start gap-2">
                <img
                    src={answer.userPhotoUrl}
                    alt={answer.userName}
                    className="w-8 h-8 rounded-full cursor-pointer"
                    onClick={() => navigate(`/profile/${answer.userId}`)}
                />
                <div>
                    <Link
                        to={`/profile/${answer.userId}`}
                        className="font-semibold text-blue-500 hover:underline"
                    >
                        @{answer.userName}
                    </Link>
                    <p className="mt-1 whitespace-pre-line">{answer.text}</p>
                    <p className="mt-1 text-gray-500 text-sm">Answered on: {formatDate(answer.createdAt)}</p>
                </div>
            </div>

            <button
                onClick={handleReplyClick}
                className="text-blue-500 text-sm self-start mt-1 ml-10"
            >
                Reply
            </button>

            {replying && (
                <div className="mt-2">
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={2}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Write your reply..."
                    />
                    <button
                        onClick={handleReplySubmit}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Submit Reply
                    </button>
                </div>
            )}

            {showLoginPage && <LoginRequiredPage />}

            {answer.replies && answer.replies.length > 0 && (
                <ul className="pl-8 mt-3">
                    {answer.replies.map((reply, i) => (
                        <li key={i} className="flex items-start gap-2 mb-2">
                            <img
                                src={reply.userPhotoUrl}
                                alt={reply.userName}
                                className="w-6 h-6 rounded-full"
                            />
                            <div>
                                <p>
                                    <Link
                                        to={`/profile/${reply.userId}`}
                                        className="font-semibold text-blue-500 hover:underline"
                                    >
                                        @{reply.userName}
                                    </Link>{' '}
                                    {renderReplyText(reply.text)}
                                </p>
                                <p className="text-gray-500 text-sm">{formatDate(reply.createdAt)}</p>
                                <button
    onClick={() =>
        handleDeleteReply(answer.text, reply.createdAt, reply.userId)
    }
    className="text-red-500 text-sm mt-1"
>
    Delete Reply
</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Reply;

