// @ts-nocheck
import { NextPage } from "next"
import { useRef, useState, useEffect, useLayoutEffect } from "react"
import Heading from "../../../../../components/layout/Heading"
import Page from "../../../../../components/layout/Page"
import Button from "../../../../../components/utils/Button"
import { H1 } from "../../../../../components/utils/typography/Header"
import { Competition } from "../../../../../types/competition"
import { Race } from "../../../../../types/race"
import { useFetchCompetitions } from "../../../../../hooks/competition/useFetchCompetitions"
import Paragraph from "../../../../../components/utils/typography/Paragraph"
import { useCreatePosition } from "../../../../../hooks/position/useCreatePosition"
import { useFetchRaces } from "../../../../../hooks/race/useFetchRaces"


type Props = {
    competition: Competition
    race: Race
}

const Position: NextPage<Props> = ({ competition, race }) => {

    const canvasRef = useRef<HTMLCanvasElement>()
    const contextRef = useRef(null)

    const [isDrawing, setIsDrawing] = useState(false)
    
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext("2d")
        contextRef.current = context;

        clearCanvas()
    }, [])

    const clearCanvas = () => {
        const context = canvas.getContext("2d")
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
    }

    const elementWidthScale = () => {
        const canvas = canvasRef.current
        return canvas.offsetWidth === 0 ? 0 : (canvas.width / canvas.offsetWidth);
    }

    const elementHeightScale = () => {
        const canvas = canvasRef.current
        return canvas.offsetWidth === 0 ? 0 : (canvas.height / canvas.offsetHeight);
    }

    const startDrawing = ({ nativeEvent }) => {
        let scaleX = elementWidthScale();
        let scaleY = elementHeightScale();

        const { offsetX, offsetY } = nativeEvent

        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX * scaleX, offsetY * scaleY)

        setIsDrawing(true)
    }

    const finishDrawing = () => {
        const canvas = canvasRef.current;
        contextRef.current.closePath()

        setIsDrawing(false)
    }

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return

        let scaleX = elementWidthScale();
        let scaleY = elementHeightScale();

        const { offsetX, offsetY } = nativeEvent

        contextRef.current.lineTo(offsetX * scaleX, offsetY * scaleY)
        contextRef.current.stroke()
        const canvas = canvasRef
    }

    const handleSubmit = async () => {
        const canvas = canvasRef.current;
        const base64 = canvas?.toDataURL("image/jpeg", 1.0)

        var blobBin = window.atob(base64.split(',')[1]);
        var array = [];
        for(var i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }
        // var file=new Blob([new Uint8Array(array)], {type: 'image/png'});
        var file = new File([new Uint8Array(array)], "number.jpeg", {type: 'image/jpeg'})
        
        const formData = new FormData()
        formData.append("file", file, file.name)
        
        clearCanvas()
        
        // last step is to send data to server
        useCreatePosition(race.id, formData)
    }

    return (
        <Page>
            <section>
                <Heading>
                    <H1>{competition.title}</H1>
                    <Paragraph.Lead className="mx-auto w-fit">Race #{race.race_nr}</Paragraph.Lead>
                </Heading>
            </section>
            <section className="mt-4 h-full">
                {/* <Form>
                    <Form.Input type="file" onChange={handleFileChange} />
                </Form>
                <button onClick={handleSubmit}>Submit</button> */}
                <canvas
                    id="canvas"
                    className="border-2 border-black rounded-lg w-full"
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                />

                <Button.Primary className="mt-4 w-full" size="lg" onClick={handleSubmit}>submit sail number</Button.Primary>

            </section>
        </Page>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const competition: Competition = await useFetchCompetitions(params?.id)
    const race: Race = await useFetchRaces(params?.race_id)

    return {
        props: {
            competition: competition,
            race: race
        }
    }
}


export default Position