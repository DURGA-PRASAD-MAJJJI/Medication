import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'

const SimmularDoc = ({ speciality, docId }) => {

    const { doctors } = useContext(AppContext)
    const [SemDoc, setSemDoc] = useState([])
    useEffect(()=>{
        if(doctors.length>0 && speciality){
            const docData = doctors.filter((doc)=>doc.speciality === speciality)
        }

    },[doctors,speciality,docId])
    return (
        <div>

        </div>
    )
}

export default SimmularDoc
