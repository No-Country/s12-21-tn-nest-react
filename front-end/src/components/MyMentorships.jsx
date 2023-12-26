import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../context/AuthContext";
import { urlApi } from "../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import { PagosDonativos } from "./PagosDonativos";

export const CalendarWrapper = ({ appointmentDate }) => {
  const formattedDate = new Date(appointmentDate);
  return (
    <div
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "80px",
        height: "250px",
        maxHeight: "90%",
      }}
    >
      <Calendar
        value={formattedDate}
        calendarType="US"
        showNavigation={false}
        tileContent={({ date }) =>
          date.toISOString().split("T")[0] ===
            formattedDate.toISOString().split("T")[0] ? (
            <div
              style={{
                backgroundColor: "green",
                borderRadius: "50%",
                height: "10px",
                width: "10px",
              }}
            ></div>
          ) : null
        }
      />
    </div>
  );
};

const MyMentorships = () => {
  const [mentorshipData, setMentorshipData] = useState([]);
  const [hour, setHour] = useState("");
  const [refused, setRefused] = useState("");
  const { studentId, mentorId } = useAuth();
  const currentUser = studentId ? studentId : mentorId;
  const [openInputs, setOpenInputs] = useState({});
  const [acceptButtonClicked, setAcceptButtonClicked] = useState(false);

  //Logica para pagos:
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null); //Traer el ID de cada cita
  const [showDonativos, setShowDonativos] = useState(false);
  const handlePaymentClick = (mentorshipId) => {
    setSelectedAppointmentId(mentorshipId)
  }

  const handleButtonClick = (mentorshipId, type) => {
    setOpenInputs((prevState) => ({
      ...prevState,
      [mentorshipId]: {
        accept: type === "accept" ? !prevState[mentorshipId]?.accept : false,
        reject: type === "reject" ? !prevState[mentorshipId]?.reject : false,
      },
    }));
  };

  const getColorByState = (stateName) => {
    switch (stateName) {
      case "pendiente":
        return { bgColor: "yellow", borderColor: "yellow", textColor: "black" };
      case "aceptado":
        return { bgColor: "green", borderColor: "green", textColor: "white" };
      case "rechazado":
        return { bgColor: "red", borderColor: "red", textColor: "white" };
      default:
        return { bgColor: "white", borderColor: "white", textColor: "black" };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let URLData = `/quotes/filter/all/${currentUser}`;
        const response = await urlApi.get(URLData);
        const data = await response.data;
        setMentorshipData(data);
        setAcceptButtonClicked(false)
        // Inicializa el objeto de estados de visualización
        const initialOpenInputsState = data.reduce((acc, mentorship) => {
          acc[mentorship.id] = {
            accept: false,
            reject: false,
          };
          return acc;
        }, {});
        setOpenInputs(initialOpenInputsState);
      } catch (error) {
        console.error("Error fetching mentorship data", error);
      }
    };
    fetchData()
    }, [currentUser,acceptButtonClicked]);

  const handleAcceptClick = async (mentorshipId) => {
    try {
      console.log("cita", mentorshipId);
      let url = `quotes/update/${mentorshipId}`;
      console.log("Hour:", hour);
      await urlApi.patch(url, { hour: String(hour) });
      setOpenInputs((prevState) => ({
        ...prevState,
        [mentorshipId]: {
          ...prevState[mentorshipId],
          accept: false,
        },
      }));
      setHour("");
      setAcceptButtonClicked(true);
      fetchData(); 
      } catch (error) {
      console.error("Error updating mentorship hour: ", error);
    }
  };

  const handleRejectClick = async (mentorshipId) => {
    try {
      let url = `quotes/refused/${mentorshipId}`;
      console.log("refused:", refused);
      await urlApi.patch(url, { refused: String(refused) });
      // Actualiza el estado para ocultar el input de rechazar
      setOpenInputs((prevState) => ({
        ...prevState,
        [mentorshipId]: {
          ...prevState[mentorshipId],
          reject: false,
        },
      }));
      setRefused("");
      setAcceptButtonClicked(true);
      fetchData(); 
    } catch (error) {
      console.error("Error updating mentorship refused: ", error);
    }
  };

  return (
    <Grid container spacing={4}>
      {mentorshipData.map((mentorship) => (
        <Grid item key={mentorship.id} xs={12} sm={6} md={4}>
          <Card
            style={{
              backgroundColor: "black",
              color: "white",
              border: `1px solid ${getColorByState(mentorship.state.name).borderColor
                }`,
              margin: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "700px",
              justifyContent: "space-between",
            }}
          >
            <Box
              style={{
                backgroundColor: getColorByState(mentorship.state.name).bgColor,
                padding: "8px",
                borderRadius: "4px 4px 0 0",
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: 'center'
              }}
            >
              <Chip
                label={mentorship.state.name.charAt(0).toUpperCase() + mentorship.state.name.slice(1)}
                style={{
                  backgroundColor: getColorByState(mentorship.state.name)
                    .bgColor,
                  color: getColorByState(mentorship.state.name).textColor,
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              />
            </Box>
            <CardContent
              style={{
                textAlign: "center",
                width: "100%",
                boxSizing: "border-box",
                marginBottom: "16px",
                height: "140px",
              }}
            >
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Avatar
                    src={
                      currentUser === studentId
                        ? mentorship.mentor.image
                        : mentorship.alumn.profileImg
                    }
                    alt={
                      currentUser === studentId
                        ? `${mentorship.mentor.userId.firstName} ${mentorship.mentor.userId.lastName}`
                        : `${mentorship.alumn.user.firstName} ${mentorship.alumn.user.lastName}`
                    }
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    style={{ color: "white", marginBottom: "8px" }}
                  >
                    {currentUser === studentId ? "Mentor" : "Alumno"}:{" "}
                    {currentUser === studentId
                      ? `${mentorship.mentor.userId.firstName} ${mentorship.mentor.userId.lastName}`
                      : `${mentorship.alumn.user.firstName} ${mentorship.alumn.user.lastName}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "white", marginBottom: "8px" }}
                  >
                    Email:{" "}
                    {currentUser === studentId
                      ? mentorship.mentor.userId.email
                      : mentorship.alumn.user.email}
                  </Typography>
                </Grid>
              </Grid>
              {mentorship.textTime && (
                <Typography
                  variant="body2"
                  style={{ color: "white", marginBottom: "8px" }}
                >
                  Hora: {mentorship.textTime}
                </Typography>
              )}
              {mentorship.textRejection && (
                <Typography
                  variant="body2"
                  style={{ color: "white", marginBottom: "8px" }}
                >
                  Razón de rechazo: {mentorship.textRejection}
                </Typography>
              )}
              <Typography variant="h6">
                {new Date(mentorship.appointmentDate).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CalendarWrapper appointmentDate={mentorship.appointmentDate} />
            <div
              style={{
                margin: "8px",
                marginTop: "0px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "90px",
              }}
            >
              {mentorship.state.name !== "rechazado" && studentId === null && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  {/* Botón de aceptar */}
                  {mentorship.state.name === "pendiente" && (
                    <button
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleButtonClick(mentorship.id, "accept")}
                    >
                      Aceptar
                    </button>
                  )}

                  {/* Botón de rechazar */}
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleButtonClick(mentorship.id, "reject")}
                  >
                    Rechazar
                  </button>
                </div>
              )}
            </div>
            {openInputs[mentorship.id]?.accept && (
              <div style={{ width: "100%" }}>
                <label>Hora:</label>
                <input
                  type="text"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  style={{
                    borderRadius: "8px",
                    padding: "8px",
                    margin: "8px 0",
                    width: "100%",
                  }}
                />
                <button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginTop: "8px",
                    width: "100%",
                  }}
                  onClick={() => handleAcceptClick(mentorship.id)}
                >
                  Enviar
                </button>
              </div>
            )}
            {openInputs[mentorship.id]?.reject && (
              <div style={{ width: "100%" }}>
                <label>Razón de rechazo:</label>
                <input
                  type="text"
                  value={refused}
                  onChange={(e) => setRefused(e.target.value)}
                  style={{
                    borderRadius: "8px",
                    padding: "8px",
                    margin: "8px 0",
                    width: "100%",
                  }}
                />
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginTop: "8px",
                    width: "100%",
                  }}
                  onClick={() => handleRejectClick(mentorship.id)}
                >
                  Enviar
                </button>
              </div>
            )}
            {/* Nuevo bloque para el botón de pagar */}

            {mentorship.state.name === "aceptado" && studentId !== null && (
              <div>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handlePaymentClick(mentorship.id)}
                  sx={{ marginBottom: '2rem' }}
                >
                  Pagar
                </Button>
                {selectedAppointmentId === mentorship.id && (
                  <PagosDonativos
                    open={selectedAppointmentId === mentorship.id}
                    onClose={() => setSelectedAppointmentId(null)}
                    alumnHireID={mentorship.alumnoHireMentor.id}
                    emailAlumn={mentorship.alumn.user.email}
                    nameMentor={`${mentorship.mentor.userId.firstName} ${mentorship.mentor.userId.lastName}`}
                    priceMentor={mentorship.mentor.price}
                  />
                )}
              </div>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyMentorships;
