import * as nodemailer from 'nodemailer';
require('dotenv').config();
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_NODEMAILER,
    pass: process.env.PASS_NODEMAILER,
  },
});

transporter
  .verify()
  .then(() => {
    console.log('Server is ready to take messages');
  })
  .catch((err) => console.log(err));

export const send = async (email: string) => {
  await transporter.sendMail({
    from: 'mentorspheresphere@gmail.com',
    to: email,
    subject: 'MentorSphere',
    html: `<head>
    <style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .container {
      font-family: Poppins;
      display: flex;
      justify-content: center;
      background-color: black;
      width: 100%;
      height: 30vh;
    }

    .wrapper {
      max-width: 535px;
      width: 90%;
      margin: 4rem auto;
    }

    .title {
      font-size: 20px;
      font-weight: 700;
      text-align: center;
      color: white;
    }

    .text {
      margin-top: 1rem;
      font-size: 16px;
      font-weight: 500;
      color: white;
      text-align: center;
    }

    .button_wrapper {
      display: flex;
      justify-content: center;
      margin-top: 50px;
      border: #25d366;
    }

    .button {
      all: unset;
      width: 90%;
      max-width: 350px;
      text-align: center;
      padding: 17px 0;
      color: #fff;
      background: #25d366;
      margin: 0 auto;
      border-radius: 10px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 700;
      transition: 0.4s;
      &:hover {
        background-color: #219c4e;
      }
    }
  </style>
      </head>
      <div class="container">
        <div class="wrapper">
          <h1 class="title">Excelente, ahora formas parte de la comunidad de MentorSphere</h1>
          <p class="text">Hola Podrás acceder a todos los profesionales que tenemos en nuestra plataforma y además recibir información de asesoría legal.
          <br />
          <br />
          Haz click en el siguiente enlace para activar tu cuenta</p>
          <div class="button_wrapper">
            <a href="https://mentorsphere-api.onrender.com/api/mentors/profile/activate/${email}" target= "_blank" class="button">Confirmar mi cuenta</a>
          </div>
        </div>
      </div>`,
  });
};
export const qualify = async (
  email: string,
  description: string,
  link: string,
) => {
  await transporter.sendMail({
    from: 'mentorspheresphere@gmail.com',
    to: email,
    subject: 'MentorSphere',
    html: `<head>
    <style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .container {
      font-family: Poppins;
      display: flex;
      justify-content: center;
      background-color: black;
    }

    .wrapper {
      max-width: 535px;
      width: 90%;
      margin: 4rem auto;
    }

    .title {
      font-size: 20px;
      font-weight: 700;
      text-align: center;
      color: white;
    }

    .text {
      font-size: 16px;
      font-weight: 500;
      color: white;
      text-align: center;
      margin-top: 1rem;
    }

    .button_wrapper {
      display: flex;
      justify-content: center;
      margin-top: 50px;
    }

    .button {
      all: unset;
      width: 90%;
      max-width: 350px;
      text-align: center;
      padding: 17px 0;
      color: #fff;
      background: #25d366;
      margin: 0 auto;
      border-radius: 10px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 700;
      transition: 0.6s;
      &:hover {
        background-color: #219c4e;
      }
    }
  </style>
      </head>
      <div class="container">
        <div class="wrapper">
          <h1 class="title"> reunion confirmada</h1>
          <p class="text">${description}</p>
          <br />
          <br />
          <div class="button_wrapper">
            <a href=${link} target= "_blank" class="button">Calificar</a>
          </div>
        </div>
      </div>`,
  });
};

export const qualifyMentor = async (email: string, description: string) => {
  await transporter.sendMail({
    from: 'mentorspheresphere@gmail.com',
    to: email,
    subject: 'MentorSphere',
    html: `<head>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap');
  
    .container {
      font-family: Poppins;
      display: flex;
      justify-content: center;
    }
  
    .wrapper {
      max-width: 535px;
      width: 90%;
      margin: 0 auto;
    }
  
    .title {
      font-size: 20px;
      font-weight: 500;
      text-align: center;
    }
  
    .text {
      font-size: 18px;
      font-weight: 500;
      color: #3e3c3d;
      text-align: center;
    }
  
    .button_wrapper {
      display: flex;
      justify-content: center;
      margin-top: 50px;
    }
  
    .button {
      all: unset;
      width: 90%;
      max-width: 350px;
      text-align: center;
      padding: 17px 0;
      color: #fff;
      background: #3e3c3d;
      margin: 0 auto;
      border-radius: 10px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 700;
    }
      </style>
      </head>
      <div class="container">
        <div class="wrapper">
          <h1 class="title"> reunion confirmada</h1>
          <p class="text">${description}</p>
        </div>
      </div>`,
  });
};
