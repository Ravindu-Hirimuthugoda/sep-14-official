import { Box } from "@mui/system";

import Equipment from "./equipment";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { colors } from "@mui/material";
import { useDispatch } from 'react-redux';
import { getBorrowData } from "../../store/actions/technical_officer";

const Equipments = ({ fromDate, toDate }) => {
    const equipments = useSelector(state => state.equipments);
    const [selectequipment, setselectequipment] = useState();
    const dispatch = useDispatch();

    useEffect(() => {

    }, [equipments])
    useEffect(() => {
        dispatch(getBorrowData(selectequipment, fromDate, toDate));
    }, [fromDate, toDate])

    const setequipment = (e) => {
        setselectequipment(e);
    }



    return (

        !equipments.length ? <Box /> : (
            <Box sx={{
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                // width: '35%',
                bgcolor: colors.green[100],
            }}>
                {equipments.map((equipment) => (

                    <Box data-testid="equipment" key={equipment.id} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: { xs: 'center', md: 'start' },
                        m: 3,

                    }}>
                        <Equipment equipment={equipment} setequipment={setequipment} selectequipment={selectequipment} fromDate={fromDate} toDate={toDate} />
                    </Box>
                ))}
            </Box>)
    )
};
export default Equipments;