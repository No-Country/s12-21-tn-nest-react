import React from 'react';
import axios from "axios";

const URL = "localhost:8080/api/Auth/register/mentor";

const Submit = (user, mentor, mentorship) => {
    const [post, setPost] = React.useState(null);
    React.useEffect(() => {
        axios.get(`${URL}`).then((response) => {
        setPost(response.data);
        });
        createUser();
    }, []);

    function createUser() {
        axios
        .post(URL, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            password: user.password,
            role: user.role,

            mentorImage: mentor.mentorImage,
            mentorDescription: mentor.mentorDescription,
            aboutMe: mentor.mentorAboutMe,
            birthdate: mentor.mentorDate,
            price: mentor.mentorPrice,

            categories: mentorship.mentorCategory,
            speciality: mentorship.mentorSpeciality,
        })
        .then((response) => {
            setPost(response.data);
        });
        console.log("funciono");
    } 
    return null

}

export default Submit