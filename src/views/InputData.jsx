import React from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";

const INITIAL_FORM_STATE = {
  nama_ka: "",
  stasiun_asal: "",
  waktu_datang: "",
  waktu_berangkat: "",
  stasiun_tujuan: "",
  keterangan: "",
};

const FORM_RULES = yup.object().shape({
  nama_ka: yup.string().required("This field is required"),
  stasiun_asal: yup.string().required("This field is required"),
  waktu_datang: yup.date().required("This field is required"),
  waktu_berangkat: yup.date().required("This field is required"),
  stasiun_tujuan: yup.string().required("This field is required"),
});

const InputData = () => {
  return <div>InputData</div>;
};

export default InputData;
