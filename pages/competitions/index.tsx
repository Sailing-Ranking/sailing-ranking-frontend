import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import Main from "../../components/layout/Main";
import Page from "../../components/layout/Page";
import Modal from "../../components/Modal";
import Button from "../../components/utils/Button";
import List from "../../components/utils/List";
import { H1 } from "../../components/utils/typography/Header";
import { useFetchCompetitions } from "../../hooks/competition/useFetchCompetitions";
import { useFetchBoats } from "../../hooks/competition/useFetchBoats"
import { Competition } from "../../types/competition";
import Form from "../../components/Form";
import { useCreateCompetition } from "../../hooks/competition/useCreateCompetition";
import Alert from "../../components/utils/Alert";
import { useDeleteCompetition } from "../../hooks/competition/useDeleteCompetition";

type Props = {
    competitions: Competition[]
    boats: string[]
}

const Competitions: NextPage<Props> = ({ competitions, boats }) => {
    const router = useRouter()

    const handleDelete = async (id: string) => {
        useDeleteCompetition(id)
        router.replace(router.asPath)
    }

    return (
        <Page>
            <section className="flex justify-between">
                <H1>Competitions:</H1>
                <Button.Success className="my-auto" data-bs-toggle="modal" data-bs-target="#create_competition_modal">Create</Button.Success>
            </section>
            <hr />
            <Main>
                <div className="flex justify-start">
                    <List className="w-full">
                        {competitions.map(competition => (
                            <List.Item key={competition.id} className="flex justify-between">
                                <Link href={`/competitions/${competition.id}`}>
                                    <a>{competition.title}</a>
                                </Link>
                                <Button.Danger size="sm" onClick={() => handleDelete(competition.id)}>delete</Button.Danger>
                            </List.Item>
                        ))}
                    </List>
                </div>
            </Main>
            <CreateCompetitionModal boats={boats} />
        </Page>
    )
}

type ModalProps = {
    boats: string[]
}

export type FromInputs = {
    title: string
    boat: string
    start_date: string
    end_date: string
}

const CreateCompetitionModal: React.FunctionComponent<ModalProps> = ({ boats }) => {
    const router = useRouter()

    const [status, setStatus] = useState(0)
    const [inputs, setInputs] = useState<FromInputs>({
        title: "", 
        boat: boats[0], 
        start_date: new Date().toISOString().split('T')[0], 
        end_date: new Date().toISOString().split('T')[0]
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
        const status = await useCreateCompetition(inputs)
        setStatus(status)
        router.replace(router.asPath)
    }

    const handleClose = () => {
        setStatus(0)
        setInputs({
            title: "", 
            boat: boats[0], 
            start_date: new Date().toISOString().split('T')[0], 
            end_date: new Date().toISOString().split('T')[0]
        })
    }

    return (
        <Modal id="create_competition_modal" size="lg">
            <Modal.Header>Create Competition</Modal.Header>
            <Modal.Body>
                {status != 0 && status == 201 && <Alert.Success>Successfully created a competition</Alert.Success>}
                {status != 0 && status == 400 && <Alert.Danger>Something went wrong creating a competition</Alert.Danger>}
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Input type="text" placeholder="Title" name="title" value={inputs?.title} onChange={handleChange}></Form.Input>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Boat Type</Form.Label>
                        <Form.Select name="boat" value={inputs?.boat} onChange={handleSelectChange}>
                            {boats.map((boat, index) => <option key={index} value={boat}>{boat}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Group>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Input type="date" name="start_date" value={inputs?.start_date} onChange={handleChange}></Form.Input>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>End Date</Form.Label>
                            <Form.Input type="date" name="end_date" value={inputs?.end_date} onChange={handleChange}></Form.Input>
                        </Form.Group>
                    </div>
                </Form>
            </Modal.Body>

            <Modal.Footer className="justify-between">
                <Button.Success onClick={handleSubmit}>submit</Button.Success>
                <Button.Danger data-bs-dismiss="modal" onClick={handleClose}>close</Button.Danger>
            </Modal.Footer>
        </Modal>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const competitions: Competition[] = await useFetchCompetitions()
    const boats: string[] = await useFetchBoats()

    return {
        props: {
            competitions: competitions,
            boats: boats
        }
    }
}

export default Competitions