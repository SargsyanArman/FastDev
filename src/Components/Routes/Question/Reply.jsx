import React, { useState } from 'react';

const Reply = ({ answer, handleAddReply, currentUserData, userId }) => {
    const [replying, setReplying] = useState(false);
    const [replyText, setReplyText] = useState('');

    
    const formatDate = (timestamp) => {
        if (!timestamp) return 'No date available';
    
        if (timestamp.toDate) {
          
            const date = timestamp.toDate();
            const options = { year: 'numeric', month: 'long' };
            return date.toLocaleDateString(undefined, options);
        } else if (timestamp instanceof Date) {
           
            const options = { year: 'numeric', month: 'long' };
            return timestamp.toLocaleDateString(undefined, options);
        } else {
            return 'Invalid date';
        }
    };

    const handleReplySubmit = () => {
        if (replyText.trim()) {
            handleAddReply(answer.userId, replyText);
            setReplyText('');
            setReplying(false);
        }
    };

    return (
        <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-start gap-2">
                <img
                    src={answer.userPhotoUrl}
                    alt={answer.userName}
                    className="w-8 h-8 rounded-full cursor-pointer"
                />
                <div>
                    <span className="font-semibold">{answer.userName}</span>
                    <p className="mt-1">{answer.text}</p>
                    <p className="mt-1 text-gray-500 text-sm">Answered on: {formatDate(answer.createdAt)}</p>
                </div>
            </div>

            <button
                onClick={() => setReplying(!replying)}
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
                                <span className="font-semibold">{reply.userName}</span>
                                <p>{reply.text}</p>
                                <p className="text-gray-500 text-sm">{formatDate(reply.createdAt)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Reply;
