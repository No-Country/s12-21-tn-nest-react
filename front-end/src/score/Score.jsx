import React from "react";
import { useState, useEffect } from "react";
import { Typography, Rating, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

import "./Score.css";
const Score = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const labels = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };

  const changeScore = (event, newValue) => {
    setValue(newValue);
  };

  const changeMsg = (event) => {
    setMessage(event.target.value);
  };

  const changeError = () => {
    setError(!error);
  };

  const submitScore = (e) => {
    e.preventDefault();
    if (value != null) {
      console.log(value, message);
      navigate("/");
    } else {
      changeError();
    }
  };

  const noSubmitAnyScore = (e) => {
    e.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    setHover(labels[value]);
  }, [value]);

  return (
    <>
      {error ? (
        <div className="container-score__reject">
          <p className="">
            Quieres continuar sin agregar ningun puntaje a tu mentor?
          </p>
          <button className="score-reject__button1" onClick={changeError}>
            Volver
          </button>
          <button className="score-reject__button2" onClick={noSubmitAnyScore}>
            No calificar
          </button>
        </div>
      ) : (
        <>
          <h1 className="score__title">Agradecemos tus comentarios</h1>
          <form className="score-form" action="">
            <h2 className="score-form__title">Califica a tu mentor</h2>
            <p className="score-form__paragraph">
              En un puntaje de 1 a 5 - ¿Cúal es el puntaje que le darías a tu
              mentoria?
            </p>
            <Box
              sx={{
                textAlign: "center",
                margin: "auto",
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend">SCORE</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={changeScore}
              />
              <Typography component="legend">{hover}</Typography>
            </Box>
            <textarea
              className="score-form__msg"
              name=""
              id=""
              cols="30"
              rows="40"
              onChange={changeMsg}
            ></textarea>
            <button
              onClick={submitScore}
              className="score-form__button"
              data-text="Awesome"
            >
              <span className="actual-text">&nbsp;Enviar&nbsp;</span>
              <span aria-hidden="true" className="hover-text">
                &nbsp;Enviar&nbsp;
              </span>
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Score;
