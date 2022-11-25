import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Form from "../../../components/Form";
import Heading from "../../../components/layout/Heading";
import Main from "../../../components/layout/Main";
import Page from "../../../components/layout/Page";
import Modal from "../../../components/Modal";
import Alert from "../../../components/utils/Alert";
import Button from "../../../components/utils/Button";
import List from "../../../components/utils/List";
import { H1, H2, H3, H4 } from "../../../components/utils/typography/Header";
import { useFetchClubs } from "../../../hooks/club/useFetchClubs";
import { useFetchCompetitionRaces } from "../../../hooks/competition/useFetchCompetitionRaces";
import { useFetchCompetitions } from "../../../hooks/competition/useFetchCompetitions";
import { useCreateCompetitor } from "../../../hooks/competitor/useCreateCompetitor";
import { useFetchCountries } from "../../../hooks/country/useFetchCountries";
import { useCreateRace } from "../../../hooks/race/useCreateRace";

import { Competition } from "../../../types/competition"
import { Race } from "../../../types/race";

type Props = {
    competition: Competition
    races: Race[]
    countries: string[]
    clubs: string[]
}

const Competition: NextPage<Props> = ({ competition, races, countries, clubs }) => {

    const router = useRouter()

    const handleSubmitRace = async () => {
        useCreateRace(competition.id)
        router.replace(router.asPath)
    }

    return (
        <Page>
            <Heading className="bg-gray-100 rounded-xl grid grid-flow-row gap-4">
                <H1>{competition.title}</H1>
                <Button.Primary className="m-auto" outlined={true} size="lg" data-bs-toggle="modal" data-bs-target="#signup_competition_modal">compete</Button.Primary>
                <Link href={`/competitions/${competition.id}/competitors`}><a><Button.Link size="lg">attendees</Button.Link></a></Link>
            </Heading>

            <Main>
                <section className="flex justify-between">
                    <H2>Races:</H2>
                    <Button.Success className="my-auto" onClick={handleSubmitRace}>create</Button.Success>
                </section>
                <hr/>
                <section className="flex justify-center">
                    <List className="w-full">
                        {races.map(race => (
                            <List.Item key={race.id} className="flex justify-between">
                                <Link href={`/races/${race.id}`}>
                                    <a><Button.Link>Race #{race.race_nr}</Button.Link></a>
                                </Link>
                                <Link href={`/competitions/${competition.id}/races/${race.id}/positions`}>
                                    <a><Button.Link>take finishes</Button.Link></a>
                                </Link>
                            </List.Item>
                        ))}
                    </List>
                </section>
            </Main>
            <SignupCompetitionModal title={competition.title} competition_id={competition.id} countries={countries} clubs={clubs}/>
        </Page>
    )
}

type ModalProps = {
    title: string
    competition_id: string
    countries: string[]
    clubs: string[]
}

export type FromInputs = {
    first_name: string
    last_name: string
    country: string
    sail_nr: number
    club: string
    competition_id: string
}

const SignupCompetitionModal: React.FunctionComponent<ModalProps> = ({title, competition_id, countries, clubs}) => {
    const router = useRouter()

    const [status, setStatus] = useState(0)
    const [inputs, setInputs] = useState<FromInputs>({
        first_name: "",
        last_name: "",
        country: countries[0],
        sail_nr: 0,
        club: clubs[0],
        competition_id: competition_id
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target
        const { value } = event.target

        setInputs(values => ({...values, [name]: value}))
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name } = event.target
        const { value } = event.target

        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async () => {
        const status = await useCreateCompetitor(inputs)
        setStatus(status)
    }

    const handleClose = () => {
        setStatus(0)
        setInputs({
            first_name: "",
            last_name: "",
            country: countries[0],
            sail_nr: 0,
            club: clubs[0],
            competition_id: competition_id
        })
    }

    return (
        <Modal id="signup_competition_modal" size="lg">
            <Modal.Header>
                <H4>Join: {title}</H4>
            </Modal.Header>

            <Modal.Body>
            {status != 0 && status == 201 && <Alert.Success>Successfully joined {title}</Alert.Success>}
                {status != 0 && status >= 400 && <Alert.Danger>Something went wrong joining {title}</Alert.Danger>}
                <Form>
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Input type="text" placeholder="First Name" name="first_name" value={inputs.first_name} onChange={handleChange}></Form.Input>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Input type="text" placeholder="Last Name" name="last_name" value={inputs.last_name} onChange={handleChange}></Form.Input>
                        </Form.Group>
                    </div>
                    <Form.Group>
                        <Form.Label>Sail nr.</Form.Label>
                        <Form.Input type="number" placeholder="Sail nr." name="sail_nr" value={inputs.sail_nr} onChange={handleChange}></Form.Input>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Select name="country" value={inputs.country} onChange={handleSelectChange}>
                            {countries.map((coutnry, index) => <option key={index} value={coutnry}>{coutnry}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Club</Form.Label>
                        <Form.Select name="club" value={inputs.club} onChange={handleSelectChange}>
                            {clubs.map((club, index) => <option key={index} value={club}>{club}</option>)}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer className="justify-between">
                <Button.Success onClick={handleSubmit}>submit</Button.Success>
                <Button.Danger data-bs-dismiss="modal" outlined={true} onClick={handleClose}>close</Button.Danger>
            </Modal.Footer>
        </Modal>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // @ts-ignore
    const competition: Competition = await useFetchCompetitions(params?.id)
    // @ts-ignore
    const races: Race[] = await useFetchCompetitionRaces(params?.id)
    const countries: string[] = await useFetchCountries()
    const clubs: string[] = await useFetchClubs()

    return {
        props: {
            competition,
            races,
            countries,
            clubs
        }
    }
}


export default Competition