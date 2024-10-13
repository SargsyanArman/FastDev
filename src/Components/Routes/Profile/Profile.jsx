import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
    const { userProfile } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const docRef = doc(db, "users", userProfile); // Убедитесь, что userProfile соответствует ID документа в Firestore
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{user.fullName}</h1>
            <p>Email: {user.email}</p>
            {/* Добавьте любые другие поля, которые хотите отобразить */}
        </div>
    );
};

export default Profile;
