// @ts-nocheck
import { GetServerSideProps, NextPage } from "next";
import Form from "../../../../components/Form";
import Heading from "../../../../components/layout/Heading";
import Page from "../../../../components/layout/Page";
import { H1 } from "../../../../components/utils/typography/Header";
import { Competition } from "../../../../types/competition";
import { Race } from "../../../../types/race";

import { useFetchCompetitionRaces } from "../../../../hooks/competition/useFetchCompetitionRaces";
import { useFetchCompetitions } from "../../../../hooks/competition/useFetchCompetitions";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../components/utils/Button";

type Props = {
    competition: Competition
    races: Race[]
}

const Positions: NextPage<Props> = ({ competition, races }) => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const [selectedRaceId, setSelectedRaceId] = useState(races[races.length - 1].id)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        contextRef.current = context;
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRaceId(event.target.value)
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
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
    }

    return (
        <Page>
            <section>
                <Heading>
                    <H1>{competition.title}</H1>
                    <Form>
                        <Form.Select value={selectedRaceId} onChange={(e) => handleChange(e)}>
                            {races.map(race => (
                                <option key={race.id} value={race.id}>Race #{race.race_nr}</option>
                            ))}
                        </Form.Select>
                    </Form>
                </Heading>
            </section>
            <section className="mt-4 h-full">

                <canvas
                    className="border-2 border-black rounded-lg w-full h-4/5"
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                />

                <Button.Primary className="mt-4 w-full" size="lg" onClick={clearCanvas}>submit sail number</Button.Primary>

            </section>
        </Page>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // @ts-ignore
    const competition: Competition = await useFetchCompetitions(params?.id)
    // @ts-ignore
    const races: Race[] = await useFetchCompetitionRaces(params?.id)

    return {
        props: {
            competition: competition,
            races: races
        }
    }
}


export default Positions