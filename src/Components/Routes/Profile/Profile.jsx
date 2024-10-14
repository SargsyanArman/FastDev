import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import logo from '../../../images/isLogo.png'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Profile = () => {
    const { userProfile } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const storage = getStorage();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const docRef = doc(db, "users", userProfile);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUser(docSnap.data());
                } else {
                    setUser({ fullName: "User not found" });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUser({ fullName: "Error fetching user" });
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userProfile]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const storageRef = ref(storage, `user/${userProfile}/profile-pic.jpg`);
        try {
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            const userDocRef = doc(db, "users", userProfile);
            await updateDoc(userDocRef, { photo: downloadURL });
            setUser(prevUser => ({ ...prevUser, photo: downloadURL }));
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const formatDate = (timestamp) => {
        const date = timestamp.toDate();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col gap-6 w-[953px] my-7 mx-5 overflow-y-auto max-h-[100vh-122px] scroll-main'>
            <div className='flex flex-col-reverse items-start sm:flex-row'>
                <div className='mt-3 flex flex-col items-start gap-4 lg:flex-row'>
                    <div className='relative h-[140px] w-[140px] rounded-full'>
                        <img src={user?.photo || logo} alt="user logo" className='rounded-[100%] h-[8.5rem]' />
                        <label htmlFor="file-upload" className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-white p-1 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
                            <input id="file-upload" className="hidden" accept="image/*" type="file" onChange={handleFileUpload} />
                        </label>
                    </div>
                </div>
                <div className='mt-6 ml-6'>
                    <h1 className=' text-[25px] font-bold text-slate-800'>{user?.fullName}</h1>
                    <p className=' text-zinc-600 '>{user?.email}</p>
                    <div>{user?.createdAt && <p><i className="fa-solid fa-calendar text-zinc-600 "></i> Created {formatDate(user.createdAt)}</p>}</div>
                </div>
            </div>

            <div className='mt-8 flex flex-col items-start justify-start gap-5'>
                <h1 className='text-2xl font-bold text-zinc-700'>Following <span className='text-ef4444'>{user?.followedTags.length}</span> tags</h1>
                <p>Tags yet havent</p>
            </div>

            <div className='mt-10'>
                <h3 className='text-2xl font-bold text-zinc-700'>Stats</h3>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-3 mt-10'>
                    <div className='shadow flex items-center rounded-lg bg-white p-4'>
                        <i className="fa-solid fa-user-group text-xl mr-4 text-zinc-700"></i>
                        <div>
                            <p className='font-bold text-xl text-zinc-700'>Total Following</p>
                            <span className='text-3xl font-semibold text-zinc-700 '>{user?.stats[1].totalFollowing}</span>
                        </div>
                    </div>

                    <div className='shadow flex items-center rounded-lg bg-white p-4'>
                        <i className="fa-solid fa-user-group text-xl mr-4 text-zinc-700"></i>
                        <div>
                            <p className='font-bold text-xl text-zinc-700'>Total Followers</p>
                            <span className='text-3xl font-semibold text-zinc-700 '>{user?.stats[0].totalFollowers}</span>
                        </div>
                    </div>

                    <div className='shadow flex items-center rounded-lg bg-white p-4'>
                        <i className="fa-solid fa-user-group text-xl mr-4 text-zinc-700"></i>
                        <div>
                            <p className='font-bold text-xl text-zinc-700'>Total Posts</p>
                            <span className='text-3xl font-semibold text-zinc-700 '>{user?.stats[2].totalPosts}</span>
                        </div>
                    </div>

                    <div className='shadow flex items-center rounded-lg bg-white p-4'>
                        <i className="fa-solid fa-user-group text-xl mr-4 text-zinc-700"></i>
                        <div>
                            <p className='font-bold text-xl text-zinc-700'>Total Questions</p>
                            <span className='text-3xl font-semibold text-zinc-700 '>{user?.stats[3].totalQuestions}</span>
                        </div>
                    </div>

                    <div className='shadow flex items-center rounded-lg bg-white p-4'>
                        <i className="fa-solid fa-user-group text-xl mr-4 text-zinc-700"></i>
                        <div>
                            <p className='font-bold text-xl text-zinc-700'>Total Answers</p>
                            <span className='text-3xl font-semibold text-zinc-700 '>{user?.stats[4].totalAnswers}</span>
                        </div>
                    </div>

                    <div className='shadow flex items-center rounded-lg bg-white p-4'>
                        <i className="fa-solid fa-user-group text-xl mr-4 text-zinc-700"></i>
                        <div>
                            <p className='font-bold text-xl text-zinc-700'>Total Comments</p>
                            <span className='text-3xl font-semibold text-zinc-700 '>{user?.stats[5].totalComments}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-10 grid grid-cols-2 gap-4 md:grid-cols-3'>
                <div className='shadow flex items-center rounded-lg p-4 bg-yellow-200'>
                    <i className="fa-solid fa-trophy mr-4 text-yellow-500 text-3xl"></i>
                    <div>
                        <h4 className='font-bold capitalize text-yellow-700 text-xl'>Gold Badges</h4>
                        <p className='text-3xl font-semibold'>{user?.badges[0].goldBadge}</p>
                    </div>
                </div>

                <div className='shadow flex items-center rounded-lg p-4 bg-gray-200'>
                    <i className="fa-solid fa-trophy mr-4 text-gray-500 text-3xl"></i>
                    <div>
                        <h4 className='font-bold capitalize text-gray-700 text-xl'>Silver Badges</h4>
                        <p className='text-3xl font-semibold'>{user?.badges[1].silverBadge}</p>
                    </div>
                </div>

                <div className='shadow flex items-center rounded-lg p-4 bg-orange-200'>
                    <i className="fa-solid fa-trophy mr-4 text-orange-500 text-3xl"></i>
                    <div>
                        <h4 className='font-bold capitalize text-orange-700 text-xl'>Bronze Badges</h4>
                        <p className='text-3xl font-semibold'>{user?.badges[2].bronzeBadge}</p>
                    </div>
                </div>
            </div>
        </div>

    );
};
//logic tags
export default Profile;
