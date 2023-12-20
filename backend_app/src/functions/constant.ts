export const alumnoDescription = (nameAlumno: string) => {
  return `¡Estimado ${nameAlumno}!

    Nos complace informarte que se ha programado una cita con un alumno. Tu dedicación y apoyo son fundamentales para el éxito de nuestros estudiantes, y estamos emocionados de contar contigo en este proceso.
    
    La cita está programada para [Fecha y Hora], y creemos que tu experiencia y orientación serán invaluables para el alumno.
    
    Si necesitas más detalles o tienes alguna pregunta, no dudes en ponerte en contacto. Agradecemos tu compromiso y estamos seguros de que esta reunión será enriquecedora para ambas partes.
    
    ¡Gracias por ser parte fundamental de nuestro equipo!
    
    Atentamente,
    MentorSphere`;
};

export const descriptionMentors = (nameMentor: string) => {
  return `¡Estimado ${nameMentor}!

    Nos complace informarte que se ha programado una cita con un alumno. Tu dedicación y apoyo son fundamentales para el éxito de nuestros estudiantes, y estamos emocionados de contar contigo en este proceso.
    
    La cita está programada para [Fecha y Hora], y creemos que tu experiencia y orientación serán invaluables para el alumno.
    
    Si necesitas más detalles o tienes alguna pregunta, no dudes en ponerte en contacto. Agradecemos tu compromiso y estamos seguros de que esta reunión será enriquecedora para ambas partes.
    
    ¡Gracias por ser parte fundamental de nuestro equipo!
    
    Atentamente,
    MentorSphere`;
};

export const url = (id: string) => {
  const url = `https://mentorsphere.vercel.app/score/${id}`;
  return url;
};
