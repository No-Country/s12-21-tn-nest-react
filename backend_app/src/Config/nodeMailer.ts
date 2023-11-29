import * as nodemailer from 'nodemailer';
require('dotenv').config();
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS,
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
    from: 'legalhub284@gmail.com',
    to: email,
    subject: 'LegalHub',
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
          <h1 class="title">Excelente, ahora formas parte de la comunidad de LegalHub</h1>
          <p class="text">Hola Podrás acceder a todos los profesionales que tenemos en nuestra plataforma y además recibir información de asesoría legal.
          <br />
          <br />
          Haz click en el siguiente enlace para activar tu cuenta</p>
          <div class="button_wrapper">
            <a href="https://abogado-back.onrender.com/api/v1/users/account/activate?email=${email}" target= "_blank" class="button">Confirmar mi cuenta</a>
          </div>
        </div>
      </div>`,
  });
};
// no usar por el momento hasta que tengamos
//el correo del proyecto funciona  va a llegar salir un mensaje con esa dirreccion de correo si no
export const sendappointment = async (
  email: string,
  description: string,
  link: string,
) => {
  await transporter.sendMail({
    from: 'legalhub284@gmail.com',
    to: email,
    subject: 'LegalHub',
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
          <br />
          <br />
          <div class="button_wrapper">
            <a href=${link} target= "_blank" class="button">Ingresar a la reunion</a>
          </div>
        </div>
      </div>`,
  });
};
