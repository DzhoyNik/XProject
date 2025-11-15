import { React } from "react"
import { observer } from "mobx-react-lite"
import BaseStructure from "../../components/BaseStructure"

const News = observer(() => {
    return(
        <BaseStructure>
            <h1>Новости</h1>
        </BaseStructure>
    )
})

export default News