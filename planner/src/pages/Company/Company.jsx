import { React } from "react"
import { observer } from "mobx-react-lite"
import BaseStructure from "../../components/BaseStructure"

const Company = observer(() => {
    return(
        <BaseStructure>
            <h1>Компания</h1>
        </BaseStructure>
    )
})

export default Company