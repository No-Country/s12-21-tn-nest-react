// MentorInfo.js
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const MentorId = () => {
  const { userId, mentorId, setMentorId } = useAuth();

  useEffect(() => {
    const fetchMentorId = async () => {
      if (userId) {
        try {
          const url = `auth/filter/${userId}`;
          const response = await urlApi.get(url);
          const mentorIdFromResponse = response.data?.mentor?.[0]?.id;

          if (mentorIdFromResponse) {
            setMentorId(mentorIdFromResponse);
          } else {
            console.error('Mentor ID not found in the response:', response.data);
          }
        } catch (error) {
          console.error('Error fetching mentor ID:', error);
        }
      }
    };

    fetchMentorId();
  }, [userId]);

  return (
    <div>
      <p>Mentor ID: {mentorId}</p>
    </div>
  );
};

export default MentorId;
