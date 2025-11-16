import React from "react";
import FillButton from "./FillButton";
import styles from "./ButtonBack.module.css"
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ButtonBack = ({ route }) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(route)
    }

    return (
        <div className={styles.btnBack}>
            <FillButton btn={"fill-back"} onClick={handleBack}><IoChevronBack /></FillButton>
        </div>
    )
}

export default ButtonBack