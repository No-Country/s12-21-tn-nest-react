import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { urlApi } from "../../config/axios";

const CalendarWrapper = ({ children }) => (
  <div style={{ borderRadius: "8px", overflow: "hidden" }}>{children}</div>
);

const ContactMentor = () => {
  const { userId, studentId } = useAuth();
  const location = useLocation();
  const mentorId = location.state?.id || "";
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const navigate = useNavigate();
  console.log("mentorId:", mentorId);

  const handleDateChange = (date) => {
    if (date >= new Date()) {
      setSelectedDate(date);
      const isoFormattedDate = date.toISOString().split("T")[0];
      setFormattedDate(isoFormattedDate);
      console.log(formattedDate);
      console.log("mentorId", mentorId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      alumnId: String(studentId),
      mentorId: String(mentorId),
      appointmentDate: formattedDate,
    };
    console.log(requestData);
    try {
      let url = "quotes/create";
      await urlApi.post(url, requestData);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Validation Error:", error.response.data.message);
      } else {
        console.error("Error:", error);
      }
    }
    navigate("/myMentorships");
  };

  return (
    <div
      style={{
        color: "#FFF",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        border: "2px solid #00FF00",
      }}
    >
      <h2 style={{ color: "#FFA500" }}>Selecciona la fecha para tu cita</h2>

      <div style={{ margin: "10px auto 20px", maxWidth: "300px" }}>
        <CalendarWrapper>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date()}
          />
        </CalendarWrapper>
      </div>

      <div style={{ fontWeight: "bold" }}>
        <p style={{ color: "#00FF00" }}>Fecha seleccionada: {formattedDate}</p>
      </div>

      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Enviar solicitud
      </button>
    </div>
  );
};

export default ContactMentor;
